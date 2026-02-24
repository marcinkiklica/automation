import test, { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CheckoutPageLocators } from "./locators/CheckoutPageLocators";

export class CheckoutPage extends BasePage  {
  readonly checkoutPageLocators: CheckoutPageLocators;
  
  constructor(page: Page) {
    super(page);
    this.checkoutPageLocators = new CheckoutPageLocators(page);
  }

  async fillCheckoutInformation(firstName: string, lastName: string, zipCode: string) {
    await test.step('Fill in checkout information', async () => {
      await this.checkoutPageLocators.firstNameInput.fill(firstName);
      await this.checkoutPageLocators.lastNameInput.fill(lastName);
      await this.checkoutPageLocators.zipCodeInput.fill(zipCode);
    });
  }

  async clickContinueButton() {
    await test.step('Click on continue button', async () => {
      await this.checkoutPageLocators.continueButton.click();
    });
  }

  async clickFinishButton() {
    await test.step('Click on finish button', async () => {
      await this.checkoutPageLocators.finishButton.click();
    });
  }
}