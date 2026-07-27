import { test, describe, expect, beforeEach } from '@playwright/test'
import { loginWith, createBlog } from './helper.js'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: { username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen' }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Blog', 'Tester', 'http://test.com')
      await expect(page.getByText('Test Blog Tester')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Likeable Blog', 'Tester', 'http://test.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('creator can delete a blog', async ({ page }) => {
      await createBlog(page, 'Deletable Blog', 'Tester', 'http://test.com')
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Deletable Blog Tester')).not.toBeVisible()
    })

    test('only the creator sees the delete button', async ({ page, request }) => {
      await createBlog(page, 'My Blog', 'Tester', 'http://test.com')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()
      await request.post('http://localhost:3003/api/users', {
        data: { username: 'other', name: 'Other', password: 'password' }
      })
      await loginWith(page, 'other', 'password')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await createBlog(page, 'Low Likes', 'Tester', 'http://test.com')
      await createBlog(page, 'High Likes', 'Tester', 'http://test.com')
      await createBlog(page, 'Medium Likes', 'Tester', 'http://test.com')

      const blogDivs = page.locator('.blog')
      const viewButtons = await blogDivs.locator('button:has-text("view")').all()

      await viewButtons[1].click()
      await page.locator('.blog').nth(1).getByRole('button', { name: 'like' }).click()
      await page.waitForTimeout(500)
      await page.locator('.blog').nth(1).getByRole('button', { name: 'like' }).click()
      await page.waitForTimeout(500)
      await page.locator('.blog').nth(1).getByRole('button', { name: 'like' }).click()
      await page.waitForTimeout(500)

      await viewButtons[2].click()
      await page.locator('.blog').nth(2).getByRole('button', { name: 'like' }).click()
      await page.waitForTimeout(500)
      await page.locator('.blog').nth(2).getByRole('button', { name: 'like' }).click()
      await page.waitForTimeout(500)

      const sortedBlogs = await page.locator('.blog').all()
      const firstLikes = await sortedBlogs[0].locator('p').filter({ hasText: /likes/ }).textContent()
      const secondLikes = await sortedBlogs[1].locator('p').filter({ hasText: /likes/ }).textContent()
      const thirdLikes = await sortedBlogs[2].locator('p').filter({ hasText: /likes/ }).textContent()

      expect(Number(firstLikes.match(/\d+/)[0])).toBeGreaterThanOrEqual(Number(secondLikes.match(/\d+/)[0]))
      expect(Number(secondLikes.match(/\d+/)[0])).toBeGreaterThanOrEqual(Number(thirdLikes.match(/\d+/)[0]))
    })
  })
})