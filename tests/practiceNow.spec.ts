import { test, expect } from "../shared/base";
import { attachScreenshot } from "../shared/helpers";

const PRACTICE_NOW_FUNCTIONAL_SCREENSHOT = "practice_now_functional_screenshot";

test.describe(
  "Practice Now Button Tests",
  {
    annotation: {
      type: "MODULE",
      description: "Functional validation of the Practice Now button behavior",
    },
    tag: "@PracticeNow",
  },
  () => {
    test.beforeEach(async ({ practiceNowPage }) => {
      await practiceNowPage.goto();
    });

    test(
      "Verify Practice Now Button Opens New Tab",
      { tag: ["@PracticeNow", "@Functional"] },
      async ({ practiceNowPage }, testInfo) => {
        const popupPromise = practiceNowPage.page.waitForEvent("popup");

        await practiceNowPage.clickPracticeNow();
        const popup = await popupPromise;

        await practiceNowPage.assertButtonVisible();
        await expect(popup).toBeTruthy();

        await attachScreenshot(
          practiceNowPage.page,
          testInfo,
          PRACTICE_NOW_FUNCTIONAL_SCREENSHOT
        );
      }
    );
  }
);
