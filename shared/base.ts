import { test as base, expect, request } from "@playwright/test";
import { attachScreenshot } from "./helpers";

// Page Objects
import { HomePage } from "../pages/HomePage";
import { NavigationPage } from "../pages/NavigationPage";
import { FooterPage } from "../pages/FooterPage";
import { PracticeNowPage } from "../pages/PracticeNowPage";

// Define Fixture types
type MyFixtures = {
  homePage: HomePage;
  navigationPage: NavigationPage;
  footerPage: FooterPage;
  practiceNowPage: PracticeNowPage;
};

export const test = base.extend<MyFixtures>({
  page: async ({ page }, use, testInfo) => {
    await use(page);
    // Take screenshot after every test
    await attachScreenshot(page, testInfo, "final-state");
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  footerPage: async ({ page }, use) => {
    await use(new FooterPage(page));
  },
  practiceNowPage: async ({ page }, use) => {
    await use(new PracticeNowPage(page));
  },
});

export { expect };
