import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

test('renders title and author, but not url or likes by default', () => {
  const blog = { title: 'Test Blog', author: 'Tester', url: 'http://test.com', likes: 5 }

  render(<Blog blog={blog} likeBlog={() => {}} deleteBlog={() => {}} />)

  expect(screen.getByText('Test Blog Tester')).toBeDefined()
  expect(screen.queryByText('http://test.com')).toBeNull()
})

test('shows url and likes when view button is clicked', async () => {
  const blog = { title: 'Test Blog', author: 'Tester', url: 'http://test.com', likes: 5 }

  render(<Blog blog={blog} likeBlog={() => {}} deleteBlog={() => {}} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('http://test.com')).toBeDefined()
  expect(screen.getByText(/likes 5/)).toBeDefined()
})

test('like button click handler is called twice when pressed twice', async () => {
  const blog = { title: 'Test Blog', author: 'Tester', url: 'http://test.com', likes: 5 }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} likeBlog={mockHandler} deleteBlog={() => {}} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
