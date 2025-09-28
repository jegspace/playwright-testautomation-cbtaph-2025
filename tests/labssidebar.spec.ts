import { test } from "@shared/base";
import { attachScreenshot } from "@shared/helpers";
import { SidebarPage } from "../pages/LabsSidebarPage";

const SIDEBAR_UI_SCREENSHOT = "sidebar_ui_screenshot";

test.describe(
  "Labs Automation Sidebar UI Tests",
  {
    annotation: {
      type: "MODULE",
      description: "UI validation for Sidebar sections and menu items",
    },
    tag: "@SidebarUI",
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://labs.testautomationph.com/");
    });

    test(
      "Verify Basic Interactions Menu Items",
      { tag: ["@SidebarUI", "@UI", "@BasicInteractionsMenu"] },
      async ({ page }, testInfo) => {
        const sidebar = new SidebarPage(page);
        await sidebar.assertBasicInteractionsUI();
        await attachScreenshot(page, testInfo, SIDEBAR_UI_SCREENSHOT);
      }
    );

    test(
      "Verify Data Handling Menu Items",
      { tag: ["@SidebarUI", "@UI", "@DataHandlingMenu"] },
      async ({ page }, testInfo) => {
        const sidebar = new SidebarPage(page);
        await sidebar.assertDataHandlingUI();
        await attachScreenshot(page, testInfo, SIDEBAR_UI_SCREENSHOT);
      }
    );

    test(
      "Verify UI Elements Menu Items",
      { tag: ["@SidebarUI", "@UI", "@UIElementsMenu"] },
      async ({ page }, testInfo) => {
        const sidebar = new SidebarPage(page);
        await sidebar.assertUIElementsUI();
        await attachScreenshot(page, testInfo, SIDEBAR_UI_SCREENSHOT);
      }
    );

    test(
      "Verify Advanced Features Menu Items",
      { tag: ["@SidebarUI", "@UI", "@AdvancedFeaturesMenu"] },
      async ({ page }, testInfo) => {
        const sidebar = new SidebarPage(page);
        await sidebar.assertAdvancedFeaturesUI();
        await attachScreenshot(page, testInfo, SIDEBAR_UI_SCREENSHOT);
      }
    );
  }
);
