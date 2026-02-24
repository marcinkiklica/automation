import { Locator, Page } from "@playwright/test";
import { LOGIN_PAGE_SELECTORS } from "./selectors/LoginPageSelectors";

export class LoginPageLocators {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page:Page) {
    this.usernameInput = page.locator(LOGIN_PAGE_SELECTORS.usernameInput).describe('Username Input');
    this.passwordInput = page.locator(LOGIN_PAGE_SELECTORS.passwordInput).describe('Password Input');
    this.loginButton = page.locator(LOGIN_PAGE_SELECTORS.loginButton).describe('Login Button');
    this.errorMessage = page.locator(LOGIN_PAGE_SELECTORS.errorMessage).describe('Error Message');
  }
}