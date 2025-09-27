import { Page, TestInfo } from '@playwright/test';
import { takeScreenshot, readLatestScreenshot } from './utils';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';

const SCREENSHOT_DIR = 'test-screenshots';

/**
 * Attaches a screenshot to the Playwright test report.
 */
export async function attachScreenshot(
  page: Page,
  testInfo: TestInfo,
  screenshotName: string
): Promise<void> {
  const testCaseName = testInfo.title;
  await takeScreenshot(page, testCaseName, SCREENSHOT_DIR);
  const screenshotBuffer = readLatestScreenshot(SCREENSHOT_DIR, testCaseName);
  await testInfo.attach(screenshotName, {
    body: screenshotBuffer,
    contentType: 'image/png',
  });
}

/**
 * Ensures the directory and file exist securely.
 */
export function ensureFileExists(directoryPath: string, fileName: string): string {
  const baseDirectory = path.resolve(directoryPath);
  const sanitizedFileName = fileName.replace(/(\.\.[\/\\])/g, '');
  const filePath = path.join(baseDirectory, sanitizedFileName);

  if (!filePath.startsWith(baseDirectory)) {
    throw new Error('Path traversal detected');
  }
  if (!existsSync(baseDirectory)) {
    mkdirSync(baseDirectory, { recursive: true });
    console.log(`Directory created: ${baseDirectory}`);
  }
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return filePath;
}

/**
 * Checks visibility of all inputs/textarea inside a form.
 * - Adds BUG annotation if invisible text found.
 * - Auto attaches screenshot.
 * - Can fail test if failOnBug = true.
 */
export async function assertFormInputsVisibility(
  page: Page,
  formSelector: string,
  testInfo: TestInfo,
  failOnBug: boolean = false
): Promise<void> {
  const inputs = await page.$$(formSelector + ' input, ' + formSelector + ' textarea');

  if (inputs.length === 0) {
    console.warn(`⚠️ No input/textarea found in form: ${formSelector}`);
    return;
  }

  for (const input of inputs) {
    const name = (await input.getAttribute('name')) || 'unnamed';

    const color = await input.evaluate(el => window.getComputedStyle(el).color);
    const background = await input.evaluate(el => window.getComputedStyle(el).backgroundColor);

    const isInvisible = color === 'rgb(255, 255, 255)' || color === background;

    if (isInvisible) {
      const message = `Form input [name="${name}"] has invisible text: color=${color}, background=${background}`;

      // 📝 Annotation
      testInfo.annotations.push({ type: 'BUG', description: message });

      // 📸 Screenshot
      await attachScreenshot(page, testInfo, `Invisible Input - ${name}`);

      if (failOnBug) {
        throw new Error(message);
      }
    }
  }
}
