import test, { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { InventoryItemLocators } from "./locators/InventoryItemLocators";


export class InventoryItemPage extends BasePage {
  readonly inventoryItemLocators: InventoryItemLocators;
  constructor(page: Page) {
    super(page);
    this.inventoryItemLocators = new InventoryItemLocators(page);
  }

  async clickAddToCartButton() {
    await test.step('Click on add to cart button', async () => {
      await this.inventoryItemLocators.addToCartButton.click();
    });
  }
}