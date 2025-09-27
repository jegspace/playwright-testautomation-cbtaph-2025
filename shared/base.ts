import { test as base, expect } from '@playwright/test';
import { attachScreenshot } from './helpers';

// Extend Playwright test with hooks
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);
    // Take screenshot after every test
    await attachScreenshot(page, testInfo, 'final-state');
  },
});

export { expect };
