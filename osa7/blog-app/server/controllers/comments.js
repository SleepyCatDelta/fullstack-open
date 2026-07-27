const commentsRouter = require('express').Router()
const Blog = require('../models/blog')

commentsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const { comment } = request.body
    if (!comment || comment.trim() === '') {
      return response.status(400).json({ error: 'comment is required' })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }
    blog.comments = blog.comments.concat(comment.trim())
    const saved = await blog.save()
    response.status(201).json(saved)
  } catch (error) {
    next(error)
  }
})

module.exports = commentsRouter
