import { test, expect } from "../shared/fixtures";
import { attachScreenshot } from "../shared/helpers";

const NAV_UI_SCREENSHOT = "navigation_ui_screenshot";
const NAV_FUNCTIONAL_SCREENSHOT = "navigation_functional_screenshot";

test.describe(
  "Navigation Section Tests",
  {
    annotation: {
      type: "MODULE",
      description: "Validation of Header, Navigation Menu, Hero, Services, and Practice Now button",
    },
    tag: "@Navigation",
  },
  () => {
    test.beforeEach(async ({ navigationPage }) => {
      await navigationPage.goto();
    });

    // Logo + Header
    test(
      "Verify Logo + Header UI",
      { tag: ["@Navigation", "@UI", "@Header"] },
      async ({ page }, testInfo) => {
        const logoLink = page.locator('a[href="/"]');
        const logoImg = logoLink.locator('img[alt="Test Automation PH Logo"]');
        const logoText = logoLink.locator("h1");

        await expect(logoLink).toBeVisible();
        await expect(logoImg).toBeVisible();
        await expect(logoText).toHaveText("Test Automation PH");

        await attachScreenshot(page, testInfo, NAV_UI_SCREENSHOT);
      }
    );

    test(
      "Click Logo navigates to Home",
      { tag: ["@Navigation", "@Functional", "@Header"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.clickLogo();
        await expect(page.locator("#home")).toBeVisible();

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    // Navigation Menu
    test(
      "Verify Navigation Menu Items",
      { tag: ["@Navigation", "@UI", "@Menu"] },
      async ({ page }, testInfo) => {
        const nav = page.getByRole("navigation");

        await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
        await expect(page.locator("#servicesBtn")).toContainText("Services");
        await expect(nav.getByRole("link", { name: "Testimonials" })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Blog" })).toBeVisible();
        await expect(nav.getByRole("link", { name: "About Us" })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Contact Us" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Practice Now" })).toBeVisible();

        await attachScreenshot(page, testInfo, NAV_UI_SCREENSHOT);
      }
    );

    test(
      "Navigate to Home",
      { tag: ["@Navigation", "@Functional", "@Menu"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.clickNavLink("Home");
        await expect(page.locator("#home")).toBeVisible();

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Expand Services Dropdown + Validate Submenus",
      { tag: ["@Navigation", "@Functional", "@Services"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.expandServicesMenu();
        await expect(page.getByRole("link", { name: "Testing-As-A-Service" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Individual Training" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Corporate Training" })).toBeVisible();

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Navigate to Testimonials",
      { tag: ["@Navigation", "@Functional", "@Menu"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.clickNavLink("Testimonials");
        await expect(page.locator("#testimonials")).toContainText("What Our Students & Clients Say");

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Navigate to Blog",
      { tag: ["@Navigation", "@Functional", "@Menu"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.clickNavLink("Blog");
        await expect(page.locator("#blog")).toContainText("Latest Test Automation Insights");

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Navigate to About Us",
      { tag: ["@Navigation", "@Functional", "@Menu"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.clickNavLink("About Us");
        await expect(page.locator("#about")).toContainText("Get to Know Us");

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Navigate to Contact Us",
      { tag: ["@Navigation", "@Functional", "@Menu"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.clickNavLink("Contact Us");
        await expect(page.locator("#contact")).toContainText("Get in Touch");

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    // Practice Now Button
    test(
      "Verify Practice Now Button UI",
      { tag: ["@Navigation", "@UI", "@PracticeNow"] },
      async ({ page }, testInfo) => {
        const practiceNowBtn = page.getByRole("button", { name: "Practice Now" });
        await expect(practiceNowBtn).toBeVisible();

        await attachScreenshot(page, testInfo, NAV_UI_SCREENSHOT);
      }
    );

    test(
      "Practice Now Button opens new tab",
      { tag: ["@Navigation", "@Functional", "@PracticeNow"] },
      async ({ page }, testInfo) => {
        const popupPromise = page.waitForEvent("popup");
        await page.getByRole("button", { name: "Practice Now" }).click();
        const popup = await popupPromise;
        await expect(popup).toBeDefined();

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    // Hero Section
    test(
      "Verify Hero Section UI",
      { tag: ["@Navigation", "@UI", "@Hero"] },
      async ({ page }, testInfo) => {
        const hero = page.locator("#home");
        await expect(hero).toContainText("Welcome to Test Automation PH");
        await expect(hero).toContainText("Best Software Testing Online Education Partner");
        await expect(page.getByRole("button", { name: "Start Automating" })).toBeVisible();
        await expect(page.getByRole("button", { name: "View Our Services" })).toBeVisible();

        await attachScreenshot(page, testInfo, NAV_UI_SCREENSHOT);
      }
    );

    test(
      "Click Start Automating Button",
      { tag: ["@Navigation", "@Functional", "@Hero"] },
      async ({ page }, testInfo) => {
        const popupPromise = page.waitForEvent("popup");
        await page.getByRole("button", { name: "Start Automating" }).click();
        await popupPromise;

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Click View Our Services scrolls to Services",
      { tag: ["@Navigation", "@Functional", "@Hero"] },
      async ({ page }, testInfo) => {
        await page.getByRole("button", { name: "View Our Services" }).click();
        await expect(page.locator("#services")).toContainText("The Services We Provide");

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    // Services Section
    test(
      "Verify Services Section UI",
      { tag: ["@Navigation", "@UI", "@Services"] },
      async ({ page }, testInfo) => {
        const services = page.locator("#services");
        await expect(services).toContainText("The Services We Provide");
        await expect(services.locator("h3")).toContainText([
          "Testing-As-A-Service",
          "Corporate Training",
          "Individual Training",
        ]);

        await attachScreenshot(page, testInfo, NAV_UI_SCREENSHOT);
      }
    );

    test(
      "Navigate via Services Submenu → Testing-As-A-Service",
      { tag: ["@Navigation", "@Functional", "@Services"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.expandServicesMenu();
        await navigationPage.clickServicesSubmenu("Testing-As-A-Service");
        await expect(page.locator("#testing-services")).toContainText("Testing-As-A-Service");

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Navigate via Services Submenu → Corporate Training",
      { tag: ["@Navigation", "@Functional", "@Services"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.expandServicesMenu();
        await navigationPage.clickServicesSubmenu("Corporate Training");
        await expect(page.locator("#corporate-training")).toContainText("Corporate Training");

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );

    test(
      "Navigate via Services Submenu → Individual Training",
      { tag: ["@Navigation", "@Functional", "@Services"] },
      async ({ navigationPage, page }, testInfo) => {
        await navigationPage.expandServicesMenu();
        await navigationPage.clickServicesSubmenu("Individual Training");
        await expect(page.locator("#individual-training")).toContainText("Individual Training");

        await attachScreenshot(page, testInfo, NAV_FUNCTIONAL_SCREENSHOT);
      }
    );
  }
);
