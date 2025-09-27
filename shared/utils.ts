import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Takes a screenshot with a dynamic name based on the test case name and current date.
 */
export async function takeScreenshot(
  page: Page,
  testCaseName: string,
  screenshotDir: string = 'test-screenshots'
): Promise<string> {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[:.]/g, '-')   // safe for filenames
    .replace('T', '_')
    .replace('Z', '');

  const sanitizedName = testCaseName.replace(/[^a-zA-Z0-9]/g, '_');
  const screenshotName = `${sanitizedName}_${timestamp}.png`;

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const screenshotPath = path.join(screenshotDir, screenshotName);

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  return screenshotPath; // Return path instead of Buffer
}

/**
 * Reads the latest screenshot file into a Buffer.
 */
export function readLatestScreenshot(
  screenshotDir: string,
  testCaseName: string
): Buffer {
  const sanitizedName = testCaseName.replace(/[^a-zA-Z0-9]/g, '_');

  const files = fs
    .readdirSync(screenshotDir)
    .filter((f) => f.startsWith(sanitizedName))
    .sort(
      (a, b) =>
        fs.statSync(path.join(screenshotDir, b)).mtimeMs -
        fs.statSync(path.join(screenshotDir, a)).mtimeMs
    );

  if (files.length === 0) {
    console.warn(`⚠️ No screenshots found for test: ${testCaseName}`);
    return Buffer.alloc(0);
  }

  const latestFile = path.join(screenshotDir, files[0]);
  return fs.readFileSync(latestFile);
}
