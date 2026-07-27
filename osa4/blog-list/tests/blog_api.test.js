const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { connectDB } = require('../utils/config')

const api = supertest(app)

const initialBlogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 },
]

let token

beforeAll(async () => {
  await connectDB()
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(initialBlogs)

  const passwordHash = await bcrypt.hash('testpass', 10)
  const user = new User({ username: 'testuser', name: 'Test', passwordHash })
  await user.save()

  const loginResponse = await api.post('/api/login').send({ username: 'testuser', password: 'testpass' })
  token = loginResponse.body.token
}, 15000)

describe('GET /api/blogs', () => {
  test('returns correct number of blogs in JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(2)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = { title: 'Test blog', author: 'Tester', url: 'http://test.com/', likes: 0 }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
    const titles = response.body.map(b => b.title)
    expect(titles).toContain('Test blog')
  })

  test('defaults likes to 0 if missing', async () => {
    const newBlog = { title: 'No likes', author: 'Tester', url: 'http://test.com/' }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })

  test('returns 400 if title missing', async () => {
    const newBlog = { author: 'Tester', url: 'http://test.com/' }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('returns 400 if url missing', async () => {
    const newBlog = { title: 'No URL', author: 'Tester' }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('returns 401 if token missing', async () => {
    const newBlog = { title: 'Test', author: 'Tester', url: 'http://test.com/' }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('succeeds with status 204', async () => {
    const newBlog = { title: 'To delete', author: 'Tester', url: 'http://test.com/' }
    const created = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    await api
      .delete(`/api/blogs/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('updates likes', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    const updated = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 99 })
      .expect(200)

    expect(updated.body.likes).toBe(99)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
