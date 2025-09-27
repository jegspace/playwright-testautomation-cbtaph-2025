import { Page, Locator, expect } from "@playwright/test";

export class LabsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly sidebarBasicInteractions: Locator;
  readonly loginFormLink: Locator;
  readonly registrationFormLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Test Automation PH Labs" });
    this.sidebarBasicInteractions = page.getByTestId("sidebar-group-header-basic-interactions");
    this.loginFormLink = page.getByTestId("sidebar-item-login-form");
    this.registrationFormLink = page.getByTestId("sidebar-item-registration-form");
  }

  async assertOnLabsURL() {
    await expect(this.page).toHaveURL(/https:\/\/labs\.testautomationph\.com/);
  }

  async assertHeadingVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.page.locator("h1")).toContainText("Test Automation PH Labs");
  }

  async navigateToLoginForm() {
    await this.sidebarBasicInteractions.click();
    await this.loginFormLink.click();
    await expect(this.page.getByRole("heading", { name: "Login Form" })).toBeVisible();
  }

  async navigateToRegistrationForm() {
    await this.sidebarBasicInteractions.click();
    await this.registrationFormLink.click();
    await expect(this.page.locator("h1")).toContainText("Registration Form");
  }
}
