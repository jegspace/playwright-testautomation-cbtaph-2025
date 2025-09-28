import { Page, Locator, expect } from "@playwright/test";

export class FooterPage {
  readonly page: Page;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.getByRole("contentinfo");
  }

  async goto() {
    await this.page.goto("https://testautomationph.netlify.app/");
  }

  async clickQuickLink(name: string) {
    await this.footer.getByRole("link", { name }).click();
  }

  async assertQuickLinkVisible(name: string) {
    await expect(this.footer.getByRole("link", { name })).toBeVisible();
  }

  async assertFooterContains(text: string) {
    await expect(this.footer).toContainText(text);
  }
}
