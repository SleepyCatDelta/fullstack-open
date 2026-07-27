import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e-tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  webServer: [
    {
      command: 'npm run start:test',
      port: 3003,
      cwd: '../blog-list',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
})
