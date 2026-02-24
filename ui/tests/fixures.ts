import { test as base } from '@playwright/test';
import { LoginPage } from './pageObjects/LoginPage';
import { InventoryPage } from './pageObjects/InventoryPage';
import { TestData } from './pageObjects/helpers/TestData';
import { CartPage } from './pageObjects/CartPage';
import { CheckoutPage } from './pageObjects/CheckoutPage';
import { InventoryItemPage } from './pageObjects/InventoryItemPage';

type MyFixtures = {
  testData: TestData;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage; 
  inventoryItemPage: InventoryItemPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  testData: async ({ }, use) => {
    const testData = new TestData();
    await use(testData);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  inventoryItemPage: async ({ page }, use) => {
    const inventoryItemPage = new InventoryItemPage(page);
    await use(inventoryItemPage);
  }
});
