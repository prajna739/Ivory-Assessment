import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { CANONELocators } from '../pages/Locaters/CANONE.locators';
import { CANONEPage } from '../pages/Pages/CANONE.Page';
import loginData from '../testdata/AssloginData.json';
import canoneData from '../testdata/CANONEData.json';

const LOGIN_URL =loginData.urls.login;

test.describe('Ivory-AssLogin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });

  test('CANTAB® One', async ({ page }) => {
    test.setTimeout(180_000);

    const canonePage = new CANONEPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText = CANONELocators.dashboardText(page);

    const targetCANONEAssessment = canoneData.canoneAssessment;
    const assessmentReport = canoneData.assessmentReport; // FIX: was never declared
    const validAssessmentStatuses = ['Yet to be Started', 'In Progress'];

    expect(targetCANONEAssessment, 'Missing canoneAssessment in test data').toBeDefined();
    expect(assessmentReport, 'Missing assessmentReport in test data').toBeDefined();

    const assTitle = canonePage.getAssessmentTitleByStatus(
      targetCANONEAssessment.title,
      validAssessmentStatuses
    );

    const {
      profileTitle,
      profileDescription,
      fullName,
      dateofBirth,
      genderDetail,
      completeWithMixedScores,
    } = canonePage;

    // Login with a valid phone number and static OTP
    await loginPhoneInput.fill(loginData.phoneNumbers.valid);
    await loginSendOtpButton.click();

    await expect(page.getByRole('heading', { name: /verify phone/i })).toBeVisible();
    await expect(loginPinInputs).toHaveCount(6);

    for (const [index, digit] of [...loginData.otp.staticOtp].entries()) {
      await loginPinInputs.nth(index).fill(digit);
    }

    // Dashboard and assessment card
    await expect(dashboardText).toBeVisible();
    await expect(assTitle).toBeVisible();

    const canoneAddedOnDate = assTitle.locator(
      'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
    );
    await expect(canoneAddedOnDate).toHaveText(/^Added on \d{1,2} [A-Za-z]+ \d{4}$/);

    const canonePartnerName = assTitle.locator(
      'xpath=following::p[starts-with(normalize-space(), "by")][1]'
    );
    await expect(canonePartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

    await expect(
      canonePage.getAssessmentStatusByTitle(
        targetCANONEAssessment.title,
        validAssessmentStatuses
      )
    ).toContainText(/Yet to be Started|In Progress/);

    await canonePage.clickAssessmentCardByStatus(
      targetCANONEAssessment.title,
      validAssessmentStatuses
    );

    // Start or Resume
    await canonePage.clickStartOrResume();

    // Continue to profile details
    await canonePage.clickContinue();

    await expect(profileTitle).toBeVisible();
    await expect(profileDescription).toBeVisible();
    await expect(fullName).toBeVisible();
    await expect(dateofBirth).toBeVisible();
    await expect(genderDetail).toBeVisible();

    await canonePage.clickContinue();

    // Result action inside the assessment iframe
    await expect(completeWithMixedScores).toBeVisible({ timeout: 30_000 });
    await completeWithMixedScores.click();

    // "Calculating your scores" screen appears first, so wait for the report button
    const reportDownloadButton = canonePage.getAssessmentReportDownloadButton(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );
    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    const result = await canonePage.downloadAssessmentReport(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );

    if (result.kind === 'download') {
      expect(result.download.suggestedFilename()).toBeTruthy();
    } else {
      // Report opened in a new tab
      expect(result.page.url()).not.toBe('about:blank');
    }
    await page.waitForTimeout(6000);
    await page.close();
  });
});