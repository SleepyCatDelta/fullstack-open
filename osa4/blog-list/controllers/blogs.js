const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body
    if (!request.user) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: request.user._id,
    })

    const saved = await blog.save()
    request.user.blogs = request.user.blogs.concat(saved._id)
    await request.user.save()

    response.status(201).json(saved)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }
    if (blog.user.toString() !== request.user._id.toString()) {
      return response.status(403).json({ error: 'only the creator can delete' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body
    const updated = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { returnDocument: 'after', runValidators: true, context: 'query' }
    )
    if (updated) {
      response.json(updated)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
