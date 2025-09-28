import { Page, Locator, expect } from "@playwright/test";

export class PracticeNowPage {
  readonly page: Page;
  readonly practiceNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.practiceNowButton = page.getByRole("button", { name: "Practice Now" });
  }

  async goto() {
    await this.page.goto("https://testautomationph.netlify.app/");
  }

  async clickPracticeNow() {
    return this.practiceNowButton.click();
  }

  async assertButtonVisible() {
    await expect(this.practiceNowButton).toBeVisible();
  }
}
