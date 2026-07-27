import { useEffect, useRef } from 'react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import Notification from '../components/Notification'
import useBlogStore from '../stores/blogStore'

const Home = () => {
  const blogs = useBlogStore((state) => state.blogs)
  const initializeBlogs = useBlogStore((state) => state.initializeBlogs)
  const blogFormRef = useRef()

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Home
