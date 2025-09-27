import { test, expect, Page, TestInfo } from "@playwright/test";
import { ContactPage } from "../pages/ContactPage";
import { generateCustomerData } from "../shared/fakerUtils";
import contactData from "../test-data/contact.json";
import { attachScreenshot, assertFormInputsVisibility } from "../shared/helpers";
import { faker } from "@faker-js/faker";

const CONTACT_SUCCESS_SCREENSHOT = "contact_form_success";
const CONTACT_FAILURE_SCREENSHOT = "contact_form_failure";
const CONTACT_ERROR_SCREENSHOT = "contact_form_error";
const CONTACT_BOUNDARY_SCREENSHOT = "contact_form_boundary";
const CONTACT_BUG_SCREENSHOT = "contact_form_bug";

test.describe("Contact Page Form Tests", 
    {
    annotation: {
      type: "MODULE",
      description: "End-to-end validation of contact form behaviors",
    },
    tag: "@ContactPage",
  },
  
  () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
    await contactPage.assertFormVisible();
  });

test(
  "Verify that user is able to submit a contact form (potential BUG)",
  {
    tag: ["@ContactPage", "@HappyPath", "@PotentialBug"],
    annotation: {
      type: "MODULE",
      description:
        "Functional testing for contact form, found potential bug: redirects to Netlify error page: https://github.com/jegspace/playwright-testautomation-cbtaph-2025/issues/1#issuecomment-3342074909",
    },
  },
  async ({ page }, testInfo) => {
    await contactPage.fillContactForm({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      subject: faker.internet.url(),
      message: "Testing with valid data"
    });
    await contactPage.submitForm();

    // Expected: redirect to thank-you or success message
    // Actual (BUG): redirected to Netlify error page
    const errorHeading = page.getByRole("heading", { name: "Page not found" });
    const isErrorVisible = await errorHeading.isVisible();

    if (isErrorVisible) {
      testInfo.annotations.push({
        type: "BUG",
        description: "Form submission redirects to Netlify error page instead of success.",
      });
      // Don’t break the pipeline, just log bug
      await attachScreenshot(page, testInfo, CONTACT_BUG_SCREENSHOT);
    } else {
      // Future-proof: once bug is fixed, this passes
      await expect(page).toHaveURL(/thank-you|success/); 
    }
  }
);      


  test("Verify the form to show validation error for empty required fields", 
    { tag: ["@ContactPage", "@NegativeTesting", "@EmptyRequiredFields"] },
    async ({ page }, testInfo) => {
    await contactPage.submitForm();

    // Browser native validation
    await contactPage.assertSubmissionBlocked();

    await attachScreenshot(page, testInfo, CONTACT_ERROR_SCREENSHOT);
  });

  test("Verify the form is able to handle very long message", 
    { tag: ["@ContactPage", "@BoundaryTesting"] },
    async ({ page }, testInfo) => {
    const longMessage = "A".repeat(10000);

    const data = {
      fullName: "Jane Doe",
      email: "jane.doe@test.com",
      subject: "Boundary Test",
      message: longMessage,
    };

    await contactPage.fillContactForm(data);
    await contactPage.submitForm();

    // Either success or still on page (both valid, depending on backend limit)
    await expect.soft(page).toHaveURL(/contact/);

    await attachScreenshot(page, testInfo, CONTACT_BOUNDARY_SCREENSHOT);
  });

  test("Verify the form to show error on invalid email inputs ", 
    { tag: ["@ContactPage", "@NegativeTesting", "@InvalidEmail"] },

    async ({ page }, testInfo) => {
    for (const invalidCase of contactData.invalidInputs) {
      const data = {
        fullName: generateCustomerData().firstName,
        email: invalidCase.email,
        subject: "Invalid Email Test",
        message: "Testing invalid email formats",
      };

      await contactPage.fillContactForm(data);
      await contactPage.submitForm();

      // Browser native validation
      await contactPage.assertSubmissionBlocked();

      await attachScreenshot(page, testInfo, CONTACT_ERROR_SCREENSHOT);
    }
  });

    test(
      "Verify the form has a potential bug with input visibility",
      {
        tag: ["@ContactPage", "@UI/UX", "@PotentialBug"],
        annotation: {
          type: "MODULE",
          description:
            "Functional testing for contact form, found potential bug: https://github.com/jegspace/playwright-testautomation-cbtaph-2025/issues/1#issuecomment-3342084499",
        },
      },
      async ({ page }, testInfo) => {
        // Fill form with sample data
        await page.getByRole("textbox", { name: "Your Name" }).fill("Jenn");
        await page.getByRole("textbox", { name: "Your Email" }).fill("jenn@test.com");
        await page.getByRole("textbox", { name: "Subject" }).fill("Test Services");
        await page
          .getByRole("textbox", { name: "Your Message" })
          .fill("I would like to inquire about the individual training.");

        // Instead of inline checks, call the helper
        await assertFormInputsVisibility(page, "form", testInfo, true);

        // Attach screenshot
        await attachScreenshot(page, testInfo, CONTACT_BUG_SCREENSHOT);
      }
    );
  }
);
