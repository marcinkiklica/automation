import test, { Page } from "@playwright/test";
import defineConfig from '../../playwright.config';
import { CommonLocators } from './locators/CommonLocators';

export class BasePage {
  readonly page:Page;
  readonly url: string = defineConfig.use?.baseURL || '';
  readonly commonLocators: CommonLocators;

  constructor(page:Page) {
    this.page = page;
    this.commonLocators = new CommonLocators(page);
  }

  async clickShoppingCartButton() {
    await test.step('Click on shopping cart button', async () => {
      await this.commonLocators.shoppingCartButton.click();
    });
  }
}