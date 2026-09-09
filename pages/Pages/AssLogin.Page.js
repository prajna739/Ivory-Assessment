import { AssLogin } from './AssLogin.locators';

export class AssLoginPage {
  constructor(page) {
    this.page = page;
    this.logoImage = page.locator(AssLoginLocators.logoImage);
    this.otpInputs = page.locator(AssLoginLocators.otpInputs);
}
 

    async verifyAssLoginPageUI() {
    await this.page.locator(AssLoginLocators.logoImage).isVisible(); 
  }
    async verifyAssLoginText() {
    await this.page.locator(AssLoginLocators.loginText).isVisible(); 
  }

  async clickLoginPhoneTab() {
    await this.page.locator(AssLoginLocators.loginPhoneClick).click();
  }

  async clickLoginEmailTab() {
    await this.page.locator(AssLoginLocators.loginEmailClick).click();
  } 

  async clickLoginCountryCode() {
    await this.page.locator(AssLoginLocators.loginCountryCodeClick).click();
  }

  async selectCountryCode(code) {
    await this.page.locator(AssLoginLocators.loginCountryCodeDropdown).click();
  } 
   
  async enterPhoneNumber(phoneNumber) {
    await this.page.locator(AssLoginLocators.LoginPhoneInput).fill(phoneNumber);
    await this.page.locator(AssLoginLocators.loginSendOtpButton).click();

  }

  async verifyEmptyPhoneError() {
    await this.page.locator(AssLoginLocators.loginEmptyPhoneError).isVisible();
  }

  async verifyInvalidPhoneError() {
    await this.page.locator(AssLoginLocators.loginInvalidPhoneError).isVisible();
  }

  async enterStaticOtp(otp) {
    await this.page.locator(AssLoginLocators.loginPinInputs).fill(otp);
  }
}
