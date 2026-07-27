const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const favorite = blogs.reduce((best, blog) => (blog.likes > best.likes ? blog : best))
  return { title: favorite.title, author: favorite.author, likes: favorite.likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const counts = {}
  blogs.forEach(blog => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })
  const author = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
  return { author, blogs: counts[author] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const counts = {}
  blogs.forEach(blog => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes
  })
  const author = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
  return { author, likes: counts[author] }
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }