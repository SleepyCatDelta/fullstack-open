import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogDetail from './components/BlogDetail'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const parsed = JSON.parse(loggedUser)
      setUser(parsed)
      blogService.setToken(parsed.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      notify('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returned = await blogService.create(blogObject)
      setBlogs(blogs.concat(returned))
      notify(`a new blog ${returned.title} by ${returned.author} added`)
    } catch {
      notify('Failed to add blog', 'error')
    }
  }

  const likeBlog = async (blog) => {
    const updated = { ...blog, likes: blog.likes + 1, user: blog.user?.id }
    const returned = await blogService.update(blog.id, updated)
    setBlogs(blogs.map(b => b.id === blog.id ? returned : b))
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch {
        notify('Failed to delete blog', 'error')
      }
    }
  }

  const notify = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 5000)
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (!user) {
    return <LoginForm handleLogin={handleLogin} message={message} />
  }

  return (
    <div>
      <NavBar user={user} handleLogout={handleLogout} />
      <Notification message={message} />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={
            <div>
              <h2>blogs</h2>
              <Togglable buttonLabel="new blog">
                <BlogForm createBlog={addBlog} />
              </Togglable>
              {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={() => likeBlog(blog)} deleteBlog={() => deleteBlog(blog)} canDelete={user && blog.user && user.username === blog.user.username} />
              )}
            </div>
          } />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/blogs/:id" element={<BlogDetail blogs={blogs} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App