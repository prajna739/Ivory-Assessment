import { test, expect } from '@playwright/test';

import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { COGFLEXLocators } from '../pages/Locaters/COGFLEX.locators';
import { COGFLEXPage } from '../pages/Pages/COGFLEX.Page';

import loginData from '../testdata/AssloginData.json';
import cogflexData from '../testdata/COGFLEXData.json';

const LOGIN_URL =  loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('Cognitive Flexibility Test (COG_FLEX)', async ({ page }) => {

    // Raised from 120s: fixed waits (16s) + report generation + download
    test.setTimeout(180_000);

    // =====================================================
    // Page Object
    // =====================================================

    const cogflexPage = new COGFLEXPage(page);

    // =====================================================
    // Login Locators
    // =====================================================

    const loginPhoneInput =
      AssLoginLocators.LoginPhoneInput(page);

    const loginSendOtpButton =
      AssLoginLocators.loginSendOtpButton(page);

    const loginPinInputs =
      AssLoginLocators.loginPinInputs(page);

    // =====================================================
    // COG_FLEX Locators
    // =====================================================

    const dashboardText =
      COGFLEXLocators.dashboardText(page);

    const profileTitle =
      COGFLEXLocators.profileTitle(page);

    const profileDescription =
      COGFLEXLocators.profileDescription(page);

    const fullName =
      COGFLEXLocators.fullName(page);

    const dateofBirth =
      COGFLEXLocators.dateofBirth(page);

    const genderDetail =
      COGFLEXLocators.genderDetail(page);

    // =====================================================
    // Test Data
    // =====================================================

    const targetCOGFLEXAssessment =
      cogflexData.cogflexAssessment;

    const validAssessmentStatuses =
      cogflexData.assessmentStatuses;


  
    const resultActions =
      cogflexData.resultActions;

    const assessmentReport =
      cogflexData.assessmentReport;

    // Mixed score option (name comes from test data)
    const Mixedscore =
      cogflexPage.getMixedscore(resultActions.Mixedscore);

    // =====================================================
    // Validate Test Data
    // =====================================================

    expect(
      targetCOGFLEXAssessment,
      'Missing cogflexAssessment in test data'
    ).toBeDefined();

    expect(
      targetCOGFLEXAssessment.title,
      'Missing assessment title in test data'
    ).toBeDefined();

    // =====================================================
    // Assessment Title
    // =====================================================

    const assTitle =
      cogflexPage.getAssessmentTitleByStatus(
        targetCOGFLEXAssessment.title,
        validAssessmentStatuses
      );

    // =====================================================
    // Login
    // =====================================================

    await loginPhoneInput.fill(
      loginData.phoneNumbers.valid
    );

    await loginSendOtpButton.click();

    // Verify OTP screen
    await expect(
      page.getByRole('heading', {
        name: /verify phone/i,
      })
    ).toBeVisible();

    // Verify six OTP fields
    await expect(loginPinInputs).toHaveCount(6);

    // =====================================================
    // Enter OTP
    // =====================================================

    const otp = loginData.otp.staticOtp;

    expect(
      otp,
      'Static OTP must contain exactly 6 digits'
    ).toMatch(/^\d{6}$/);

    for (const [index, digit] of [...otp].entries()) {
      await loginPinInputs
        .nth(index)
        .fill(digit);
    }

    // =====================================================
    // Dashboard
    // =====================================================

    await expect(dashboardText).toBeVisible();

    // =====================================================
    // Assessment Card
    // =====================================================

    await expect(assTitle).toBeVisible();

    // =====================================================
    // Added On Date
    // =====================================================

    const cogflexAddedOnDate =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
      );

    await expect(cogflexAddedOnDate).toHaveText(
      /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
    );

    // =====================================================
    // Partner Name
    // =====================================================

    const cogflexPartnerName =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "by")][1]'
      );

    await expect(cogflexPartnerName).toHaveText(
      /^\s*by\s+\S[\s\S]*$/
    );

    // =====================================================
    // Assessment Status
    // =====================================================

    await expect(
      cogflexPage.getAssessmentStatusByTitle(
        targetCOGFLEXAssessment.title,
        validAssessmentStatuses
      )
    ).toContainText(
      /Yet to be Started|In Progress/
    );

    // =====================================================
    // Open Assessment
    // =====================================================

    await cogflexPage.clickAssessmentCardByStatus(
      targetCOGFLEXAssessment.title,
      validAssessmentStatuses
    );

    
    // =====================================================
    // Resume
    // =====================================================

    // Start or Resume, whichever button is shown
    
    // Start or Resume, whichever button is shown
    await cogflexPage.clickStartOrResume();
    await page.waitForTimeout(3000);

    // =====================================================
    // Continue
    // =====================================================

    await cogflexPage.clickContinue();

    await page.waitForTimeout(2000);

    // =====================================================
    // Profile Details
    // =====================================================

    await expect(profileTitle).toBeVisible();

    await expect(profileDescription).toBeVisible();

    await expect(fullName).toBeVisible();

    await expect(dateofBirth).toBeVisible();

    await expect(genderDetail).toBeVisible();

    // =====================================================
    // Continue From Profile
    // =====================================================

    await cogflexPage.clickContinue();

    await page.waitForTimeout(11_000);

    // =====================================================
    // Mixed Score (Assessment simulator inside the iframe)
    // =====================================================

    await expect(Mixedscore).toBeVisible({ timeout: 30_000 });
    // FIX: was "Mixedscores.click()" (typo)
    await Mixedscore.click();
    
    // =====================================================
    // Report Download
    // =====================================================

    // "Generating Your Report..." screen appears first, so wait for the report button
    const reportDownloadButton = cogflexPage.getAssessmentReportDownloadButton(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );
    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    const result = await cogflexPage.downloadAssessmentReport(
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