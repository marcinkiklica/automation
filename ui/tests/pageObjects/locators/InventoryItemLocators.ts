import { Locator, Page } from "@playwright/test";
import { INVENTORY_ITEM_SELECTORS } from "./selectors/InventoryItemSelectors";

export class InventoryItemLocators {
  readonly addToCartButton: Locator;

  constructor(private page: Page) {
    this.addToCartButton = page.locator(INVENTORY_ITEM_SELECTORS.addToCartButton).describe('Add to Cart Button');
   }
}