import { useParams } from 'react-router-dom'
import useBlogStore from '../stores/blogStore'
import useUserStore from '../stores/userStore'
import useField from '../hooks/useField'

const BlogDetail = () => {
  const { id } = useParams()
  const blog = useBlogStore((state) => state.blogs.find((b) => b.id === id))
  const likeBlog = useBlogStore((state) => state.likeBlog)
  const deleteBlog = useBlogStore((state) => state.deleteBlog)
  const addComment = useBlogStore((state) => state.addComment)
  const user = useUserStore((state) => state.user)
  const commentField = useField('text')

  const handleComment = (e) => {
    e.preventDefault()
    if (!commentField.value.trim()) return
    addComment(id, commentField.value)
    commentField.reset()
  }

  if (!blog) return null

  const canDelete = user && blog.user && user.username === blog.user.username

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button></p>
      <p>added by {blog.user?.name}</p>
      {canDelete && <button onClick={() => deleteBlog(blog)}>remove</button>}

      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input {...commentField} />
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
