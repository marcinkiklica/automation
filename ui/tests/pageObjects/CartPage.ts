import test, { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartPageLocators } from "./locators/CartPageLocators";
import { Item } from "./data/Item";

export class CartPage extends BasePage {
  cartPageLocators: CartPageLocators;
    
  constructor(page: Page) {
    super(page);
    this.cartPageLocators = new CartPageLocators(page);
  }

  async clickRemoveButton(index: number) {
    await test.step(`Click on remove button for item at index ${index}`, async () => {
      const removeButton = await this.cartPageLocators.getRemoveButtonLocator(index);
      await removeButton.click();
    });
  }

  async getAllItemsInCart(): Promise<Item[]> {
    return await test.step('Get all items in the cart', async () => {
      const items: Item[] = [];
      const itemNames = await this.cartPageLocators.getAllItemNamesInCart();
      const itemDescriptions = await this.cartPageLocators.getAllItemDescriptionsInCart();
      const itemPrices = await this.cartPageLocators.getAllItemPricesInCart();
      for (let i = 0; i < itemNames.length; i++) {
        items.push(new Item('-', itemNames[i], itemDescriptions[i], itemPrices[i]));
      }
      return items;
    });
  }

  async clickCheckoutButton() {
    await test.step('Click on checkout button', async () => {
      await this.cartPageLocators.checkoutButton.click();
    });
  }
}
