import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly navigation: Locator;
  readonly servicesButton: Locator;
  readonly servicesMenu: Locator;
  readonly startAutomatingButton: Locator;
  readonly practiceNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByRole("navigation");
    this.servicesButton = page.getByRole("button", { name: "Services ▼" });
    this.servicesMenu = page.locator("#servicesMenu");
    this.startAutomatingButton = page.getByRole("button", { name: "Start Automating" });
    this.practiceNowButton = page.getByRole("button", { name: "Practice Now" });
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

  async clickService(name: string) {
    await this.page.getByRole("link", { name }).click();
  }

  async clickStartAutomating() {
    return this.startAutomatingButton.click();
  }

  async clickPracticeNow() {
    return this.practiceNowButton.click();
  }

  async assertNavContains(text: string) {
    await expect(this.navigation).toContainText(text);
  }

  async assertServicesContains(text: string) {
    await expect(this.servicesMenu).toContainText(text);
  }
}
