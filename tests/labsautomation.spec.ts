import { test, expect } from "../shared/base";
import { attachScreenshot } from "../shared/helpers";
import { LabsAutomationPage } from "../pages/LabsAutomationPage";

const LABS_UI_SCREENSHOT = "labs_ui_screenshot";

test.describe(
  "Labs Automation UI Tests",
  {
    annotation: {
      type: "MODULE",
      description: "UI validation for Labs Automation site (Practice Now / Start Automating redirect)",
    },
    tag: "@LabsAutomation",
  },
  () => {
    test.beforeEach(async ({ page }) => {
      const labsPage = new LabsAutomationPage(page);
      await labsPage.goto();
    });

    test(
      "Verify Sidebar UI Elements visibility",
      { tag: ["@LabsAutomation", "@UI", "@Sidebar"] },
      async ({ page }, testInfo) => {
        const labsPage = new LabsAutomationPage(page);
        await labsPage.assertSidebarUI();
        await attachScreenshot(page, testInfo, LABS_UI_SCREENSHOT);
      }
    );

    test(
      "Verify Main Hero Section UI visibility",
      { tag: ["@LabsAutomation", "@UI", "@Hero"] },
      async ({ page }, testInfo) => {
        const labsPage = new LabsAutomationPage(page);
        await labsPage.assertMainHeroUI();
        await attachScreenshot(page, testInfo, LABS_UI_SCREENSHOT);
      }
    );

    test(
      "Verify Technology Cards (Cypress, Playwright, Selenium) visibility",
      { tag: ["@LabsAutomation", "@UI", "@Cards"] },
      async ({ page }, testInfo) => {
        const labsPage = new LabsAutomationPage(page);
        await labsPage.assertCardsUI();
        await attachScreenshot(page, testInfo, LABS_UI_SCREENSHOT);
      }
    );

    test(
      "Verify Theme Toggle (Light/Dark Mode)",
      { tag: ["@LabsAutomation", "@UI", "@ThemeToggle"] },
      async ({ page }, testInfo) => {
        const labsPage = new LabsAutomationPage(page);

        // Default Light Mode
        await expect(labsPage.themeLabel).toContainText("Light Mode");

        // Toggle to Dark Mode
        await labsPage.toggleTheme();
        await expect(labsPage.themeLabel).toContainText("Dark Mode");

        // Toggle back to Light Mode
        await labsPage.toggleTheme();
        await expect(labsPage.themeLabel).toContainText("Light Mode");

        await attachScreenshot(page, testInfo, LABS_UI_SCREENSHOT);
      }
    );
  }
);
