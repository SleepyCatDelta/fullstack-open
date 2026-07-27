const loginWith = async (page, username, password) => {
  await page.locator('#username').fill(username)
  await page.locator('#password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByPlaceholderText('title').fill(title)
  await page.getByPlaceholderText('author').fill(author)
  await page.getByPlaceholderText('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }