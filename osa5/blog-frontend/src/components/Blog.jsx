import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, canDelete }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={likeBlog}>like</button></p>
          <p>{blog.user?.name}</p>
          {canDelete && <button onClick={deleteBlog}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
