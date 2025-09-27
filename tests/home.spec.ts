import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LabsPage } from "../pages/LabsPage";
import { attachScreenshot } from "../shared/helpers";

// Screenshot constants
const NAV_SCREENSHOT = "home_nav";
const SERVICES_SCREENSHOT = "home_services";
const LABS_START_SCREENSHOT = "labs_start_automating";
const LABS_PRACTICE_SCREENSHOT = "labs_practice_now";

test.describe("Homepage Navigation and Actions", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should navigate across main navigation menu @smoke @nav", async ({ page }, testInfo) => {
    await homePage.clickNavLink("Home");
    await homePage.assertNavContains("Home");

    await homePage.clickNavLink("Testimonials");
    await expect(page.getByRole("heading", { name: /What Our Students/ })).toBeVisible();

    await homePage.clickNavLink("Blog");
    await expect(page.getByRole("heading", { name: /Latest Test Automation/ })).toBeVisible();

    await homePage.clickNavLink("About Us");
    await expect(page.getByRole("heading", { name: "Get to Know Us" })).toBeVisible();

    await homePage.clickNavLink("Contact Us");
    await expect(page.getByRole("heading", { name: "Get in Touch" })).toBeVisible();

    await attachScreenshot(page, testInfo, NAV_SCREENSHOT);
  });

  test("should expand Services dropdown and validate menu items @regression @services", async ({ page }, testInfo) => {
    await homePage.expandServicesMenu();

    await homePage.assertServicesContains("Testing-As-A-Service");
    await homePage.assertServicesContains("Individual Training");
    await homePage.assertServicesContains("Corporate Training");

    await homePage.clickService("Testing-As-A-Service");
    await expect(page.getByRole("heading", { name: "Testing-As-A-Service" })).toBeVisible();

    await homePage.clickService("Individual Training");
    await expect(page.getByRole("heading", { name: "Individual Training" })).toBeVisible();

    await homePage.clickService("Corporate Training");
    await expect(page.getByRole("heading", { name: "Corporate Training" })).toBeVisible();

    await attachScreenshot(page, testInfo, SERVICES_SCREENSHOT);
  });

  test("should open Labs site from 'Start Automating' button @labs @popup", async ({ page }, testInfo) => {
    const labsPagePromise = page.waitForEvent("popup");
    await homePage.clickStartAutomating();
    const labsPopup = await labsPagePromise;
    const labsPage = new LabsPage(labsPopup);

    await labsPage.assertOnLabsURL();
    await labsPage.assertHeadingVisible();

    await attachScreenshot(labsPopup, testInfo, LABS_START_SCREENSHOT);
  });

  test("should open Labs site from 'Practice Now' button and explore sidebar @labs @popup", async ({ page }, testInfo) => {
    const labsPagePromise = page.waitForEvent("popup");
    await homePage.clickPracticeNow();
    const labsPopup = await labsPagePromise;
    const labsPage = new LabsPage(labsPopup);

    await labsPage.assertOnLabsURL();
    await labsPage.assertHeadingVisible();

    await labsPage.navigateToLoginForm();
    await labsPage.navigateToRegistrationForm();

    await attachScreenshot(labsPopup, testInfo, LABS_PRACTICE_SCREENSHOT);
  });
});
