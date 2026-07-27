import { create } from 'zustand'
import blogService from '../services/blogs'
import useNotificationStore from './notificationStore'

const useBlogStore = create((set) => ({
  blogs: [],

  setBlogs: (blogs) => set({ blogs }),

  initializeBlogs: async () => {
    const blogs = await blogService.getAll()
    set({ blogs })
  },

  createBlog: async (blogObject) => {
    try {
      const returned = await blogService.create(blogObject)
      set((state) => ({ blogs: state.blogs.concat(returned) }))
      useNotificationStore.getState().notify(`a new blog ${returned.title} by ${returned.author} added`)
    } catch {
      useNotificationStore.getState().notify('Failed to add blog', 'error')
    }
  },

  likeBlog: async (blog) => {
    try {
      const updated = { ...blog, likes: blog.likes + 1, user: blog.user?.id }
      const returned = await blogService.update(blog.id, updated)
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === blog.id ? returned : b)),
      }))
    } catch {
      useNotificationStore.getState().notify('Failed to like blog', 'error')
    }
  },

  deleteBlog: async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return
    try {
      await blogService.remove(blog.id)
      set((state) => ({
        blogs: state.blogs.filter((b) => b.id !== blog.id),
      }))
    } catch {
      useNotificationStore.getState().notify('Failed to delete blog', 'error')
    }
  },

  addComment: async (blogId, comment) => {
    try {
      const updated = await blogService.createComment(blogId, comment)
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === blogId ? updated : b)),
      }))
      useNotificationStore.getState().notify('comment added')
    } catch {
      useNotificationStore.getState().notify('Failed to add comment', 'error')
    }
  },
}))

export default useBlogStore
