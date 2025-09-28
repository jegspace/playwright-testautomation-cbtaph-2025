import { test as base } from "./base";
import { HomePage } from "../pages/HomePage";
import { NavigationPage } from "../pages/NavigationPage";
import { FooterPage } from "../pages/FooterPage";
import { PracticeNowPage } from "../pages/PracticeNowPage";

type Pages = {
  homePage: HomePage;
  navigationPage: NavigationPage;
  footerPage: FooterPage;
  practiceNowPage: PracticeNowPage;
};

export const test = base.extend<Pages>({
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

export { expect } from "@shared/base";
