import { Locator } from "@playwright/test";
import { CHECKOUT_PAGE_SELECTORS } from "./selectors/CheckoutPageSelectors";

export class CheckoutPageLocators {
  firstNameInput: Locator;
  lastNameInput: Locator;
  zipCodeInput: Locator;
  continueButton: Locator;
  finishButton: Locator;
  orderConfirmationHeader: Locator;
  orderConfirmationText: Locator;

  constructor(page: any) {
    this.firstNameInput = page.locator(CHECKOUT_PAGE_SELECTORS.firstNameInput).describe('First Name Input');
    this.lastNameInput = page.locator(CHECKOUT_PAGE_SELECTORS.lastNameInput).describe('Last Name Input');
    this.zipCodeInput = page.locator(CHECKOUT_PAGE_SELECTORS.zipCodeInput).describe('Zip Code Input');
    this.continueButton = page.locator(CHECKOUT_PAGE_SELECTORS.continueButton).describe('Continue Button');
    this.finishButton = page.locator(CHECKOUT_PAGE_SELECTORS.finishButton).describe('Finish Button');
    this.orderConfirmationHeader = page.locator(CHECKOUT_PAGE_SELECTORS.orderConfirmationHeader).describe('Order Confirmation Header');
    this.orderConfirmationText = page.locator(CHECKOUT_PAGE_SELECTORS.orderConfirmationText).describe('Order Confirmation Text');
  }
}