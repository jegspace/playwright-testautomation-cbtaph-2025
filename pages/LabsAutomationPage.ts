import { Page, Locator, expect } from "@playwright/test";

export class LabsAutomationPage {
  readonly page: Page;
  readonly logoLink: Locator;
  readonly sidebarTitle: Locator;
  readonly heading: Locator;
  readonly description: Locator;
  readonly subDescription: Locator;
  readonly cypressCard: Locator;
  readonly playwrightCard: Locator;
  readonly seleniumCard: Locator;
  readonly themeLabel: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoLink = page.getByTestId("sidebar-logo-link");
    this.sidebarTitle = page.getByTestId("sidebar-title");
    this.heading = page.getByRole("heading", { name: "Test Automation PH Labs" });
    this.description = page.getByText("A Web App Playground to");
    this.subDescription = page.getByText("You can practice your Cypress");
    this.cypressCard = page.getByRole("heading", { name: "Cypress" });
    this.playwrightCard = page.getByRole("heading", { name: "Playwright" });
    this.seleniumCard = page.getByRole("heading", { name: "Selenium" });
    this.themeLabel = page.getByTestId("sidebar-theme-label");
    this.themeToggle = page.getByTestId("sidebar-theme-toggle");
  }

  async goto() {
    await this.page.goto("https://labs.testautomationph.com/");
  }

  async assertSidebarUI() {
    await expect(this.logoLink).toBeVisible();
    await expect(this.sidebarTitle).toBeVisible();
    await expect(this.sidebarTitle.locator("span")).toContainText("Labs MariTest");
  }

  async assertMainHeroUI() {
    await expect(this.heading).toBeVisible();
    await expect(this.page.locator("h1")).toContainText("Test Automation PH Labs");
    await expect(this.description).toBeVisible();
    await expect(this.page.getByRole("main")).toContainText(
      "A Web App Playground to practice your test automation skills 💻🚀"
    );
    await expect(this.subDescription).toBeVisible();
    await expect(this.page.getByRole("main")).toContainText(
      "You can practice your Cypress, Playwright and Selenium skills here."
    );
  }

  async assertCardsUI() {
    await expect(this.cypressCard).toBeVisible();
    await expect(this.page.getByRole("main")).toContainText("Modern web testing for the modern web");

    await expect(this.playwrightCard).toBeVisible();
    await expect(this.page.getByRole("main")).toContainText("Reliable end-to-end testing for modern web apps");

    await expect(this.seleniumCard).toBeVisible();
    await expect(this.page.getByRole("main")).toContainText("Web testing with the power of WebDriver");
  }

  async toggleTheme() {
    await expect(this.themeLabel).toBeVisible();
    await this.themeToggle.click();
  }
}
