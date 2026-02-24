import { Locator, Page } from "@playwright/test";
import { COMMON_SELECTORS } from "./selectors/CommonSelectors";

export class CommonLocators {
  readonly shoppingCartButton: Locator;
  constructor(page:Page){
    this.shoppingCartButton = page.locator(COMMON_SELECTORS.shoppingCartButton).describe('Shopping Cart Button');
  }
}