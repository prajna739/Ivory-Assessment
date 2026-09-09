// pages/Login.Page.js

import { LoginLocators } from './Locaters/Login.locators';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.logoImage = page.locator('img[alt="company-branding"]');
    this.loginText = page.locator(LoginLocators.loginText);
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/');
  }

 async verifyLoginPageUI() {
    await this.page.locator(LoginLocators.logoImage).isVisible();
    await this.page.locator(LoginLocators.loginText).isVisible();
  }




   async login(username, password) {
    await this.page.fill(LoginLocators.usernameInput, username);
    await this.page.fill(LoginLocators.passwordInput, password);
    await this.page.click(LoginLocators.loginButton);
  }

  async getDashboardHeader() {
    return this.page.locator(LoginLocators.dashboardHeader);
  }

  async getErrorMessage() {
    return this.page.locator(LoginLocators.errorMessage);
  }
}