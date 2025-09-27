import { Page, Locator, expect } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Updated placeholders from DOM snapshot
    this.fullNameInput = page.getByPlaceholder("Your Name");
    this.emailInput = page.getByPlaceholder("Your Email");
    this.subjectInput = page.getByPlaceholder("Subject");

    // Support both input and textarea for message field
    this.messageInput = page.locator('input[name="message"]');
    this.messageTextarea = page.getByPlaceholder("Your Message");

    this.submitButton = page.getByRole("button", { name: /send message/i });
    this.successMessage = page.getByText(/thank you|successfully|message sent/i);
  }

  async goto() {
    await this.page.goto("/contact");
  }

  async fillContactForm(data: { fullName: string; email: string; subject: string; message: string }) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);

    if (await this.messageTextarea.count()) {
      await this.messageTextarea.fill(data.message);
    } else if (await this.messageInput.count()) {
      await this.messageInput.fill(data.message);
    } else {
      throw new Error("No message input or textarea found on Contact form");
    }
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async assertFormVisible() {
    await expect(this.fullNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.subjectInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async assertSubmissionBlocked() {
    // Allow both /contact and /contact# cases
    await expect(this.page).toHaveURL(/\/contact/);

    // Stronger check: form fields should still be visible (blocked submission)
    await expect(this.fullNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.subjectInput).toBeVisible();
  }
}
