import { PartnerLocators } from '../Locaters/Partner.locators';
export class PartnerPage {
  constructor(page) {
    this.page = page;
    this.AssessmentButton = page.locator(PartnerLocators.AssessmentButton);
    this.enterLoginInput = page.locator(PartnerLocators.logininput);
    this.enterPasswordInput = page.locator(PartnerLocators.passwordinput);
    this.signinButton = page.locator(PartnerLocators.signinButton);
    this.phoneInput = page.locator(PartnerLocators.phoneInput);
    this.username = page.locator(PartnerLocators.username);
    this.pnumber = page.locator(PartnerLocators.pnumber);
    this.combobox = page.locator(PartnerLocators.combobox);
    this.comboboxOption = page.locator(PartnerLocators.comboboxOption);
    this.comboboxError = page.locator(PartnerLocators.ComboboxError);
    this.assignButton = page.locator(PartnerLocators.AssignButton);
    this.cancelButton = page.locator(PartnerLocators.cancelButton);
 }

  async enterLoginInput(input) {
    await this.page.locator(PartnerLocators.logininput).fill(input);
  }

  async enterPasswordInput(input) {
    await this.page.locator(PartnerLocators.passwordinput).fill(input);
  } 

  async clickSigninButton() {
    await this.page.locator(PartnerLocators.signinButton).click();
  }

  async clickAssessmentButton() {
    await this.page.locator(PartnerLocators.AssessmentButton).click();
  }
 
  async enterPhoneInput(input) {
    await this.page.locator(PartnerLocators.phoneInput).fill(input);
  }
 
  async getUsername() {
    return await this.page.locator(PartnerLocators.username).textContent();
  }

  async getPhone() {
    return await this.page.locator(PartnerLocators.pnumber).textContent();
  }

 async clickCombobox() {
    await this.page.locator(PartnerLocators.combobox).click();
  } 

 async selectComboboxOption() {
    await this.page.locator(PartnerLocators.comboboxOption).click();
  }
 
async getComboboxError() {
    return await this.page.locator(PartnerLocators.ComboboxError).textContent();
  }

async clickAssignButton() {
    await this.page.locator(PartnerLocators.assignButton).click();
  }

async clickCancelButton() {
    await this.page.locator(PartnerLocators.cancelButton).click();
  } 
}
