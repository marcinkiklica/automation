import test, { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { InventoryPageLocators } from "./locators/InventoryPageLocators";

export class InventoryPage extends BasePage {
  readonly inventoryPageLocators: InventoryPageLocators;
  
  constructor(page:Page) {
    super(page);
    this.inventoryPageLocators = new InventoryPageLocators(page);
  }

  async addSingleItemToCart(itemId: string) {
    await test.step(`Add item with id ${itemId} to cart`, async () => {
      const addToCartButton = await this.inventoryPageLocators.getAddItemToCardLocator(itemId);
      await addToCartButton.click();
    });
  }

  async openItemByName(itemName: string) {
    await test.step(`Open item with name ${itemName}`, async () => {
      const itemNameLocators = await this.inventoryPageLocators.getItemNamesLocator(itemName);
      await itemNameLocators.click();
    });
  }

  async addItemsToCart(itemIds: string[]) {
    await test.step(`Add items with ids ${itemIds.join(', ')} to cart`, async () => {
      for (const itemId of itemIds) {
        await this.addSingleItemToCart(itemId);
      }
    });
  }

  async sortProductsByName(value: string = 'Name (A to Z)') {
    await test.step(`Sort products by ${value}`, async () => {
      await this.inventoryPageLocators.productSortDropdownOption.selectOption({ label: value });
    });
  }

  async getAllItemsNamesInInventory(): Promise<string[]> {
    return await test.step('Get all item names in inventory', async () => {
      const itemNameLocators = await this.inventoryPageLocators.getAllItemNamesLocator();
      const itemNames: string[] = [];
      for (const locator of itemNameLocators) {
        const textContent = await locator.textContent();
        if (textContent !== null) {
          itemNames.push(textContent);
        }
      }
      return itemNames;
    });
  }
}