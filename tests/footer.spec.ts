import { test, expect } from "../shared/fixtures";
import { attachScreenshot } from "../shared/helpers";

const FOOTER_UI_SCREENSHOT = "footer_ui_screenshot";
const FOOTER_FUNCTIONAL_SCREENSHOT = "footer_functional_screenshot";

test.describe(
  "Footer Section Tests",
  {
    annotation: {
      type: "MODULE",
      description: "UI + Functional validation of the Footer section",
    },
    tag: "@Footer",
  },
  () => {
    test.beforeEach(async ({ footerPage }) => {
      await footerPage.goto();
    });

    // Company Info
    test(
      "Verify Company Header + Description are visible",
      { tag: ["@Footer", "@UI", "@CompanyInfo"] },
      async ({ page }, testInfo) => {
        const company = page.locator(".footer-company");
        await expect(company.locator("h3")).toHaveText("Test Automation PH");
        await expect(company).toContainText(
          "Empowering software testers and organizations with comprehensive test automation solutions"
        );
        await attachScreenshot(page, testInfo, FOOTER_UI_SCREENSHOT);
      }
    );

    // Quick Links
    test(
      "Verify Quick Links Header + Items are visible",
      { tag: ["@Footer", "@UI", "@QuickLinks"] },
      async ({ page }, testInfo) => {
        const quickLinks = page.locator(".footer-links");
        await expect(quickLinks.locator("h4")).toHaveText("Quick Links");

        const expectedLinks = ["Home", "Services", "Testimonials", "Blog"];
        for (const link of expectedLinks) {
          await expect(
            quickLinks.getByRole("link", { name: link })
          ).toBeVisible();
        }
        await attachScreenshot(page, testInfo, FOOTER_UI_SCREENSHOT);
      }
    );

    test(
      "Verify Footer Quicklink - Home hyperlink",
      { tag: ["@Footer", "@Functional", "@QuickLinks"] },
      async ({ footerPage, page }, testInfo) => {
        await footerPage.clickQuickLink("Home");
        await expect(page.locator("#home")).toBeVisible();
        await attachScreenshot(page, testInfo, FOOTER_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Verify Footer Quicklink - Services hyperlink",
      { tag: ["@Footer", "@Functional", "@QuickLinks"] },
      async ({ footerPage, page }, testInfo) => {
        await footerPage.clickQuickLink("Services");
        await expect(page.locator("#services")).toBeVisible();
        await attachScreenshot(page, testInfo, FOOTER_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Verify Footer Quicklink - Testimonials hyperlink",
      { tag: ["@Footer", "@Functional", "@QuickLinks"] },
      async ({ footerPage, page }, testInfo) => {
        await footerPage.clickQuickLink("Testimonials");
        await expect(page.locator("#testimonials")).toBeVisible();
        await attachScreenshot(page, testInfo, FOOTER_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Verify Footer Quicklink - Blog hyperlink",
      { tag: ["@Footer", "@Functional", "@QuickLinks"] },
      async ({ footerPage, page }, testInfo) => {
        await footerPage.clickQuickLink("Blog");
        await expect(page.locator("#blog")).toBeVisible();
        await attachScreenshot(page, testInfo, FOOTER_FUNCTIONAL_SCREENSHOT);
      }
    );

    // Contact Info
    test(
      "Verify Contact Header + Details",
      { tag: ["@Footer", "@UI", "@ContactInfo"] },
      async ({ page }, testInfo) => {
        const contact = page.locator(".footer-contact");
        await expect(contact.locator("h4")).toHaveText("Contact");

        await expect(contact).toContainText("info@testautomationph.com");
        await expect(contact).toContainText("+63 (2) 123-4567");
        await expect(contact).toContainText("123 Tech Street");
        await expect(contact).toContainText("Makati City, Metro Manila 1200");

        await attachScreenshot(page, testInfo, FOOTER_UI_SCREENSHOT);
      }
    );

    // Footer Bottom
    test(
      "Verify Footer Bottom Content",
      { tag: ["@Footer", "@UI", "@FooterBottom"] },
      async ({ page }, testInfo) => {
        const bottom = page.locator(".footer-bottom");
        await expect(bottom).toContainText("© 2025");
        await expect(bottom).toContainText(
          "Powered by Test Forge IT Consultancy"
        );
        await expect(bottom).toContainText("Code Blossom");

        await attachScreenshot(page, testInfo, FOOTER_UI_SCREENSHOT);
      }
    );
  }
);
