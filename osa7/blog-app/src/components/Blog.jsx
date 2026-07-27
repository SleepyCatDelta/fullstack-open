import { useState } from 'react'
import { Link } from 'react-router-dom'
import useBlogStore from '../stores/blogStore'
import useUserStore from '../stores/userStore'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const likeBlog = useBlogStore((state) => state.likeBlog)
  const deleteBlog = useBlogStore((state) => state.deleteBlog)
  const user = useUserStore((state) => state.user)

  const canDelete = user && blog.user && user.username === blog.user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></p>
          <p>{blog.user?.name}</p>
          {canDelete && <button onClick={() => deleteBlog(blog)}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
