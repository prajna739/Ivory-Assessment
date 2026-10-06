import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { ProfileLocators } from '../pages/Locaters/Profile.locators';
import { ISIPage } from '../pages/Pages/ISI.Page';
import loginData from '../testdata/AssloginData.json';
//import isiData from '../testdata/ISIData.json';
const LOGIN_URL = 'https://test-assess.liveivory.com/login';

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });


  test('Profile', async ({ page }) => {
    test.setTimeout(120_000)
    
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dottedMenuClick =ProfileLocators.dottedMenuClick(page);
    const ProfileMenu =ProfileLocators.ProfileMenu(page);
      //TC_ISI_001 - Verify user can login successfully using a valid phone number and static OTP
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
await expect(dottedMenuClick).toBeVisible(); 
await dottedMenuClick.click();
//profile menu
await ProfileMenu.click();
})
})