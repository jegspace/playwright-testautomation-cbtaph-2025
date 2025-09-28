import { test, expect } from "../shared/base";
import { attachScreenshot } from "../shared/helpers";

const HOMEPAGE_UI_SCREENSHOT = "homepage_ui_screenshot";
const HOMEPAGE_FUNCTIONAL_SCREENSHOT = "homepage_functional_screenshot";

test.describe(
  "Homepage UI & Functional Tests",
  {
    annotation: {
      type: "MODULE",
      description: "Validation of Homepage sections: Header, Navigation, Hero",
    },
    tag: "@Homepage",
  },
  () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.goto();
    });

    // UI: Logo + Header
    test(
      "Verify Logo and Header",
      { tag: ["@Homepage", "@UI", "@Header"] },
      async ({ page }, testInfo) => {
        const logoLink = page.locator('a[href="/"]');
        const logoImg = logoLink.locator('img[alt="Test Automation PH Logo"]');
        const logoText = logoLink.locator("h1");

        await expect(logoLink).toBeVisible();
        await expect(logoImg).toBeVisible();
        await expect(logoText).toHaveText("Test Automation PH");

        await attachScreenshot(page, testInfo, HOMEPAGE_UI_SCREENSHOT);
      }
    );

    // UI: Navigation Menu
    test(
      "Verify Navigation Menu Items",
      { tag: ["@Homepage", "@UI", "@Navigation"] },
      async ({ page }, testInfo) => {
        const navigation = page.getByRole("navigation");

        await expect(navigation.getByRole("link", { name: "Home" })).toBeVisible();
        await expect(page.locator("#servicesBtn")).toContainText("Services");
        await expect(navigation.getByRole("link", { name: "Testimonials" })).toBeVisible();
        await expect(navigation.getByRole("link", { name: "Blog" })).toBeVisible();
        await expect(navigation.getByRole("link", { name: "About Us" })).toBeVisible();
        await expect(navigation.getByRole("link", { name: "Contact Us" })).toBeVisible();

        // Practice Now button (header)
        await expect(page.getByRole("button", { name: "Practice Now" })).toBeVisible();

        await attachScreenshot(page, testInfo, HOMEPAGE_UI_SCREENSHOT);
      }
    );

    // UI: Hero Section
    test(
      "Verify Hero Section Content",
      { tag: ["@Homepage", "@UI", "@Hero"] },
      async ({ page }, testInfo) => {
        const hero = page.locator("#home");

        await expect(hero).toContainText("Welcome to Test Automation PH");
        await expect(hero).toContainText("Best Software Testing Online Education Partner");
        await expect(hero).toContainText("Transform your application quality assurance");

        // Hero buttons
        await expect(page.getByRole("button", { name: "Start Automating" })).toBeVisible();
        await expect(page.getByRole("button", { name: "View Our Services" })).toBeVisible();

        await attachScreenshot(page, testInfo, HOMEPAGE_UI_SCREENSHOT);
      }
    );

    // Functional: Hero Button
    test(
      "Verify Start Automating Button Opens Popup",
      { tag: ["@Homepage", "@Functional", "@Hero"] },
      async ({ homePage }, testInfo) => {
        const popupPromise = homePage.page.waitForEvent("popup");
        await homePage.clickStartAutomating();
        await popupPromise;

        await expect(homePage.startAutomatingButton).toBeVisible();
        await attachScreenshot(homePage.page, testInfo, HOMEPAGE_FUNCTIONAL_SCREENSHOT);
      }
    );
  }
);
