import { useParams } from 'react-router-dom'
import { useState } from 'react'
import blogService from '../services/blogs'

const BlogDetail = ({ blogs, likeBlog, deleteBlog, user }) => {
  const { id } = useParams()
  const [comment, setComment] = useState('')
  const blog = blogs.find((b) => b.id === id)

  if (!blog) return null

  const canDelete = user && blog.user && user.username === blog.user.username

  const handleComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    await blogService.createComment(id, comment)
    setComment('')
    window.location.reload()
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button></p>
      <p>added by {blog.user?.name}</p>
      {canDelete && <button onClick={() => deleteBlog(blog)}>remove</button>}

      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input value={comment} onChange={({ target }) => setComment(target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments && blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetail