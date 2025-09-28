import { Page, Locator, expect } from "@playwright/test";

export class SidebarPage {
  readonly page: Page;

  // --- Groups ---
  readonly groupBasicInteractions: Locator;
  readonly groupDataHandling: Locator;
  readonly groupUIElements: Locator;
  readonly groupAdvancedFeatures: Locator;

  // --- Basic Interactions ---
  readonly loginForm: Locator;
  readonly registrationForm: Locator;
  readonly buttonInteractions: Locator;
  readonly dropdownsSelectors: Locator;
  readonly checkboxesRadio: Locator;

  // --- Data Handling ---
  readonly dynamicTable: Locator;
  readonly apiInteractions: Locator;
  readonly fileUpload: Locator;
  readonly databaseTesting: Locator;
  readonly formValidation: Locator;

  // --- UI Elements ---
  readonly modalsPopups: Locator;
  readonly dragDrop: Locator;
  readonly tooltips: Locator;
  readonly tabsAccordions: Locator;
  readonly alertsNotifications: Locator;

  // --- Advanced Features ---
  readonly advancedForms: Locator;
  readonly ecomWorkflows: Locator;
  readonly erpWorkflows: Locator;

  constructor(page: Page) {
    this.page = page;

    // Groups
    this.groupBasicInteractions = page.getByTestId("sidebar-group-header-basic-interactions");
    this.groupDataHandling = page.getByTestId("sidebar-group-header-data-handling");
    this.groupUIElements = page.getByTestId("sidebar-group-header-ui-elements");
    this.groupAdvancedFeatures = page.getByTestId("sidebar-group-header-advanced-features");

    // Basic Interactions
    this.loginForm = page.getByTestId("sidebar-item-login-form");
    this.registrationForm = page.getByTestId("sidebar-item-registration-form");
    this.buttonInteractions = page.getByTestId("sidebar-item-button-interactions");
    this.dropdownsSelectors = page.getByTestId("sidebar-item-dropdowns-selectors");
    this.checkboxesRadio = page.getByTestId("sidebar-item-checkboxes-radio-buttons");

    // Data Handling
    this.dynamicTable = page.getByTestId("sidebar-item-dynamic-table");
    this.apiInteractions = page.getByTestId("sidebar-item-api-interactions");
    this.fileUpload = page.getByTestId("sidebar-item-file-upload");
    this.databaseTesting = page.getByTestId("sidebar-item-database-testing");
    this.formValidation = page.getByTestId("sidebar-item-form-validation");

    // UI Elements
    this.modalsPopups = page.getByTestId("sidebar-item-modals-popups");
    this.dragDrop = page.getByTestId("sidebar-item-drag-drop");
    this.tooltips = page.getByTestId("sidebar-item-tooltips");
    this.tabsAccordions = page.getByTestId("sidebar-item-tabs-accordions");
    this.alertsNotifications = page.getByTestId("sidebar-item-alerts-notifications");

    // Advanced Features
    this.advancedForms = page.getByTestId("sidebar-item-advanced-forms");
    this.ecomWorkflows = page.getByTestId("sidebar-item-ecom-workflows");
    this.erpWorkflows = page.getByTestId("sidebar-item-erp-workflows");
  }

  async assertBasicInteractionsUI() {
    await this.groupBasicInteractions.click();
    await expect(this.loginForm).toBeVisible();
    await expect(this.loginForm).toContainText("Login Form");
    await expect(this.registrationForm).toContainText("Registration Form");
    await expect(this.buttonInteractions).toContainText("Button Interactions");
    await expect(this.dropdownsSelectors).toContainText("Dropdowns and Selectors");
    await expect(this.checkboxesRadio).toContainText("Checkboxes and Radio Buttons");
  }

  async assertDataHandlingUI() {
    await this.groupDataHandling.click();
    await expect(this.dynamicTable).toContainText("Dynamic Table");
    await expect(this.apiInteractions).toContainText("API Interactions");
    await expect(this.fileUpload).toContainText("File Upload");
    await expect(this.databaseTesting).toContainText("Database Testing");
    await expect(this.formValidation).toContainText("Form Validation");
  }

  async assertUIElementsUI() {
    await this.groupUIElements.click();
    await expect(this.modalsPopups).toContainText("Modals and Popups");
    await expect(this.dragDrop).toContainText("Drag and Drop");
    await expect(this.tooltips).toContainText("Tooltips");
    await expect(this.tabsAccordions).toContainText("Tabs and Accordions");
    await expect(this.alertsNotifications).toContainText("Alerts and Notifications");
  }

  async assertAdvancedFeaturesUI() {
    await this.groupAdvancedFeatures.click();
    await expect(this.advancedForms).toContainText("Advanced Forms");
    await expect(this.ecomWorkflows).toContainText("Ecom Workflows");
    await expect(this.erpWorkflows).toContainText("ERP Workflows");
  }
}
