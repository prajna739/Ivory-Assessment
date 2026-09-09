import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import loginData from '../testdata/AssloginData.json';

const LOGIN_URL = 'https://test-assess.liveivory.com/login';

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });

  test('TC_Login_001 - Verify logo and login text are visible', async ({ page }) => {
    const logoImage = AssLoginLocators.logoImage(page);
    const loginText = AssLoginLocators.loginText(page);
    await expect(logoImage).toBeVisible();
    await expect(loginText).toBeVisible();
  });

  test('TC_Login_002 - Verify phone login option is clickable', async ({ page }) => {
    const loginPhoneClick = AssLoginLocators.loginPhoneClick(page);
    const loginEmailClick = AssLoginLocators.loginEmailClick(page);
    await loginPhoneClick.click();
    await loginEmailClick.click();
  });
 
  test('TC_Login_003 - Verify country code selection is functional', async ({ page }) => {
  
    const loginCountryCodeClick = AssLoginLocators.loginCountryCodeClick(page);
    const loginCountryCodedropdown = AssLoginLocators.loginCountryCodeDropdown(page);
    
    await expect(loginCountryCodeClick).toBeVisible();
    await loginCountryCodeClick.click();
    await expect(loginCountryCodedropdown).toBeVisible();
    await loginCountryCodedropdown.click();
  });

  test('TC_Login_004 - Verify phone number input and send OTP button', async ({ page }) => {
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    await expect(loginPhoneInput).toBeVisible();
    await loginPhoneInput.fill(loginData.phoneNumbers.empty);
    await expect(loginSendOtpButton).toBeVisible();
    await loginSendOtpButton.click();
    await expect(AssLoginLocators.loginEmptyPhoneError(page)).toBeVisible();
    
  await loginPhoneInput.fill(loginData.phoneNumbers.lessThanTenDigits);
  await loginSendOtpButton.click();
  await expect(AssLoginLocators.loginInvalidPhoneError(page)).toBeVisible();
  
  await loginPhoneInput.fill(loginData.phoneNumbers.valid);
  await loginSendOtpButton.click();
  // Add assertion for successful OTP send if applicable
  await expect(
  page.getByRole('heading', { name: /verify phone/i })
).toBeVisible();

await expect(loginPinInputs).toHaveCount(6);

for (const [index, digit] of [...loginData.otp.staticOtp].entries()) {
  await loginPinInputs.nth(index).fill(digit);
} 

await page.waitForTimeout(2000);

})



});
