
---
### 1. Installation 

Run command line. All dependencies will be installed with all playwright browsers.
```bash
npm run start
```

### 2. Run tests in headless mode

```bash
npm run test
```

### 3. Run tests with the browser window 

```bash
npm run test-headed
```

### 4. Show report

After the tests finish, generate and open the report by running:
```bash
npm run report
```

### Proof of the execution: 

![Proof of the execution](../executionUI.png)

## Project Structure

### Directory Overview

```
ui/
├── tests/                          
│   ├── fixures.ts                  # Playwright fixtures for test setup and configuration
│   ├── pageObjects/                # Page Object Model (POM) implementation
│   │   ├── BasePage.ts             # Base class with common page interactions and utilities
│   │   ├── CartPage.ts             # Shopping cart page object
│   │   ├── CheckoutPage.ts         # Checkout flow page object
│   │   ├── InventoryItemPage.ts    # Product detail page object
│   │   ├── InventoryPage.ts        # Products listing page object
│   │   ├── LoginPage.ts            # Login page object
│   │   ├── data/                   # Test data models
│   │   │   ├── Item.ts             # Item/Product data model
│   │   │   └── User.ts             # User credentials data model
│   │   ├── helpers/                # Utility functions for test data
│   │   │   └── TestData.ts         # Test data factory and helpers
│   │   └── locators/               # Selector management and locator strategies
│   │       └── selectors/          # CSS selectors definitions
│   ├── specs/                      # Test specifications (test cases)
│   └── testData/                   # Static test data files
│       ├── items.json              # Product/item test data
│       └── users.json              # User credentials test data
├── playwright.config.ts            # Playwright configuration (browser settings, timeouts, etc.)
├── package.json                    # NPM dependencies and scripts
└── README.md                        # This file
```
