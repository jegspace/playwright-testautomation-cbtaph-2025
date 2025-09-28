# Test Automation PH - Playwright E2E Tests

This repository contains **end-to-end automation tests** for [Test Automation PH](https://testautomationph.com) and [Test Automation PH Labs](https://labs.testautomationph.com).  
It is built using **Playwright + TypeScript** with full support for **POM (Page Object Model), Fixtures, Tagging, Annotations, Grouping, Hooks, and Screenshots**.

---

## 🚀 Project Overview

### What is Test Automation PH?
[Test Automation PH](https://testautomationph.com) is a **Software Testing Online Education Partner**.  
It provides resources, tutorials, and real-world projects to help professionals improve their **test automation skills**.

### What is Test Automation PH Labs?
[Test Automation PH Labs](https://labs.testautomationph.com) is a **web app playground** where testers can practice:
- Basic interactions  
- Data handling  
- UI elements  
- Advanced workflows  

This repository covers **UI tests** and **functional tests** across both platforms.

---

## 📂 Project Structure

```
playwright-testautomation-cbtaph-2025/
│── pages/                # Page Object Models (POM)
│   ├── HomePage.ts
│   ├── ContactPage.ts
│   ├── NavigationPage.ts
│   ├── FooterPage.ts
│   ├── PracticeNowPage.ts
│   ├── LabsAutomationPage.ts
│   └── LabsSidebarPage.ts
│
│── shared/               # Shared helpers & fixtures
│   ├── base.ts
│   ├── fakerUtils.ts
│   └── helpers.ts    ├
│   └── utils.ts 
│
│── tests/                # Spec files
│   ├── homepage.spec.ts
│   ├── contact.spec.ts
│   ├── navigation.spec.ts
│   ├── footer.spec.ts
│   ├── practiceNow.spec.ts
│   ├── labsautomation.spec.ts
│   └── labssidebar.spec.ts
│
│── test-data/            # JSON test data
│── playwright.config.ts  # Playwright configuration
│── package.json          # Scripts & dependencies
```

---

## 🧪 Features

✅ **Page Object Model (POM)** for maintainable tests  
✅ **Fixtures** for dependency injection  
✅ **Tagging & Grouping** with annotations for easy test filtering  
✅ **Screenshots** on test execution  
✅ **Functional & UI Coverage** for buttons, navigation, and sidebar flows  
✅ **Storage State (Auth setup)** for persistent login sessions  

---

## 🏃 Running the Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests (Headless)
```bash
npm test
```

### Run in Headed Mode
```bash
npm run test:headed
```

### Run in Debug Mode
```bash
npm run test:debug
```

---

## 🎯 Running Specific Specs

We’ve added **npm scripts** for each section:

- **Homepage**  
  ```bash
  npm run homepage-test
  npm run homepage-test-ui
  ```

- **Contact Page**  
  ```bash
  npm run contact-test
  npm run contact-test-ui
  ```

- **Navigation**  
  ```bash
  npm run navigation-test
  npm run navigationP-test-ui
  ```

- **Footer**  
  ```bash
  npm run footer-test
  npm run footer-test-ui
  ```

- **Practice Now Button**  
  ```bash
  npm run practiceNow-test
  npm run practiceNow-test-ui
  ```

- **Labs Automation (Homepage + Sidebar)**  
  ```bash
  npx playwright test tests/labsautomation.spec.ts
  npx playwright test tests/sidebar.spec.ts
  ```

---

## 📝 Example Annotation & Tagging

```ts
test.describe(
  "Homepage UI & Functional Tests",
  {
    annotation: {
      type: "MODULE",
      description: "Validation of homepage UI, header, navigation, and hero section",
    },
    tag: "@Homepage",
  },
  () => {
    test("Verify Logo and Header", async ({ homePage }) => {
      // test implementation
    });

    test("Verify Start Automating Button", async ({ homePage }) => {
      // test implementation
    });
  }
);
```

- `@ui` → UI validation tests  
- `@functional` → Functional navigation & redirects  
- `@Sidebar`, `@Homepage`, `@Contact` → Module-level tags  

---

## 📸 Screenshots

Screenshots are automatically attached during test execution via `attachScreenshot()` helper.  
This is useful for debugging **UI failures**.

---

## 📌 Notes

- Make sure you have **Node.js 18+** installed.  
- Playwright will auto-download required browsers on first run.  
- Labs Automation tests cover **light mode / dark mode toggle**, **sidebar navigation**, and **practice flows**.  

---

## 📖 License

This project is licensed under the **ISC License**.  
Maintained by **Jegspace in collaboration with TAPH**.
