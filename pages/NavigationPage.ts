import { Page, Locator, expect } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly navigation: Locator;
  readonly servicesButton: Locator;
  readonly servicesMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByRole("navigation");
    this.servicesButton = page.getByRole("button", { name: "Services ▼" });
    this.servicesMenu = page.locator("#servicesMenu");
  }

  async goto() {
    await this.page.goto("https://testautomationph.netlify.app/");
  }

  async clickNavLink(name: string) {
    await this.navigation.getByRole("link", { name }).click();
  }

  async expandServicesMenu() {
    await this.servicesButton.click();
  }

  async clickLogo() {
    await this.page.locator('a[href="/"]').click();
  }

  async clickServicesSubmenu(submenuName: string) {
    await this.servicesMenu.getByRole("link", { name: submenuName }).click();
  }

  async assertNavLinkVisible(name: string) {
    await expect(this.navigation.getByRole("link", { name })).toBeVisible();
  }

  async assertServicesContains(text: string) {
    await expect(this.servicesMenu).toContainText(text);
  }
}
