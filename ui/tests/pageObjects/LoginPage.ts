import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { User } from "./data/User";
import { LoginPageLocators } from "./locators/LoginPageLocators";
import { test } from "../fixures";

export class LoginPage extends BasePage {
  readonly loginPageLocators: LoginPageLocators;

  constructor(page:Page) {
    super(page);
    this.loginPageLocators = new LoginPageLocators(page);
  }

  async logIn(user: User){
    await test.step(`Login with user: ${user.username}`, async () => {
      await this.loginPageLocators.usernameInput.fill(user.username);
      await this.loginPageLocators.passwordInput.fill(user.password);
      await this.loginPageLocators.loginButton.click();
    });
  }

  async navigateToLoginPage() {
    await test.step('Navigate to login page', async () => {
      await this.page.goto(this.url);
    });
  }
}