import useField from '../hooks/useField'
import useBlogStore from '../stores/blogStore'

const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const createBlog = useBlogStore((state) => state.createBlog)

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title: title.value, author: author.value, url: url.value })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input {...title} placeholder="title" id="title" />
      </div>
      <div>
        author:
        <input {...author} placeholder="author" id="author" />
      </div>
      <div>
        url:
        <input {...url} placeholder="url" id="url" />
      </div>
      <button type="submit" id="create">create</button>
    </form>
  )
}

export default BlogForm
