import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: false,
  timeout: 30000,
  reporter: [
    ['html', {open: 'never'}],
    ['list'],
  ],
  use: {
    baseURL: 'https://dummyjson.com'
  },
});