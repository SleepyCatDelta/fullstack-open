import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'

test('form calls the event handler with the right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  await user.type(screen.getByPlaceholderText('title'), 'Test Title')
  await user.type(screen.getByPlaceholderText('author'), 'Test Author')
  await user.type(screen.getByPlaceholderText('url'), 'http://test.com')

  await user.click(screen.getByText('create'))

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com',
  })
})
