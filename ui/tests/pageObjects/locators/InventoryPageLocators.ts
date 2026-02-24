import { Locator, Page } from "@playwright/test";
import { INVENTORY_PAGE_SELECTORS } from "./selectors/InventoryPageSelectors";

export class InventoryPageLocators {
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator
  readonly productSortDropdown: Locator;
  readonly productSortDropdownOption: Locator;

  constructor(private page: Page) {
    this.inventoryContainer = page.locator(INVENTORY_PAGE_SELECTORS.inventoryContainer).describe('Inventory Container');
    this.inventoryItems = page.locator(INVENTORY_PAGE_SELECTORS.inventoryItems).describe('Inventory Items');
    this.productSortDropdown = page.locator(INVENTORY_PAGE_SELECTORS.productSortDropdown).describe('Product Sort Dropdown');
    this.productSortDropdownOption = page.locator(INVENTORY_PAGE_SELECTORS.productSortDropdownOption).describe('Product Sort Dropdown Options');
  }

  async getAddItemToCardLocator(itemId: string): Promise<Locator> {
    const selector = INVENTORY_PAGE_SELECTORS.addItemToCartButton(itemId);
    return await this.page.locator(selector, {hasText: 'Add to cart'}).describe(`Add to Cart Button for ${itemId}`);
  }

  async getAllItemNamesLocator(): Promise<Locator[]> {
    return await this.page.locator(INVENTORY_PAGE_SELECTORS.itemNames).all();
  }

  async getItemNamesLocator(itemName: string): Promise<Locator> {
    return await this.page.locator(INVENTORY_PAGE_SELECTORS.itemNames, { hasText: itemName });
  }

  async getAllItemDescriptionsLocator(): Promise<Locator[]> {
    return await this.page.locator(INVENTORY_PAGE_SELECTORS.itemDescriptions).all();
  }

  async getAllItemPricesLocator(): Promise<Locator[]> {
    return await this.page.locator(INVENTORY_PAGE_SELECTORS.itemPrices).all();
  }

  async getAddItemToCardLocatorByItemName(itemName: string): Promise<Locator> {
    const itemNameLocator = this.page.locator(INVENTORY_PAGE_SELECTORS.itemNames, { hasText: itemName });
    const parentElement = this.page.locator(INVENTORY_PAGE_SELECTORS.inventoryItems).filter({ has: itemNameLocator });
    return parentElement.locator(INVENTORY_PAGE_SELECTORS.addItemToCartButtonSelector).describe(`Add to Cart Button for ${itemName}`);
  }
}
