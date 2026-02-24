import { Locator, Page } from "@playwright/test";
import { CART_PAGE_SELECTORS } from "./selectors/CartPageSelectors";

export class CartPageLocators {
  readonly checkoutButton: Locator;
  constructor(private page: Page) {
    this.checkoutButton = this.page.locator(CART_PAGE_SELECTORS.checkoutButton).describe('Checkout Button');
  }

  async getRemoveButtonLocator(index: number): Promise<Locator> {
    return await this.page.locator(CART_PAGE_SELECTORS.removeButton).nth(index-1).describe(`Remove Button for item at position ${index}`);
  }

  async getAllItemNamesInCart(): Promise<string[]> {
    const itemNameLocators = await this.page.locator(CART_PAGE_SELECTORS.cartItemName).all();
    const itemNames = [];
    for (const locator of itemNameLocators) {
      const textContent = await locator.textContent();
      if (textContent !== null) {
        itemNames.push(textContent);
      }
    }
    return itemNames;
  }

  async getAllItemDescriptionsInCart(): Promise<string[]> {
    const itemDescriptionLocators = await this.page.locator(CART_PAGE_SELECTORS.cartItemDescription).all();
    const itemDescriptions = [];
    for (const locator of itemDescriptionLocators) {
      const textContent = await locator.textContent();
      if (textContent !== null) {
        itemDescriptions.push(textContent);
      }
    }
    return itemDescriptions;
  }

  async getAllItemPricesInCart(): Promise<string[]> {
    const itemPriceLocators = await this.page.locator(CART_PAGE_SELECTORS.cartItemPrice).all();
    const itemPrices = [];
    for (const locator of itemPriceLocators) {
      const textContent = await locator.textContent();
      if (textContent !== null) {
        itemPrices.push(textContent);
      }
    }
    return itemPrices;
  }
}