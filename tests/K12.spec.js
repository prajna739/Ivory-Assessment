import { test, expect } from '@playwright/test';

import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { K12Locators } from '../pages/Locaters/K12.locators';
import { K12Page } from '../pages/Pages/K12.Page';

import loginData from '../testdata/AssloginData.json';
import k12Data from '../testdata/K12Data.json';

const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('K-12 Academic Assessment (Ages 5-18)', async ({ page }) => {

  
    test.setTimeout(180_000);

    // =====================================================
    // Page Object
    // =====================================================

    const k12Page = new K12Page(page);

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
    // DIY Locators
    // =====================================================

    const dashboardText =
      K12Locators.dashboardText(page);

    const profileTitle =
      K12Locators.profileTitle(page);

    const profileDescription =
      K12Locators.profileDescription(page);

    const fullName =
      K12Locators.fullName(page);

    const dateofBirth =
      K12Locators.dateofBirth(page);

    const genderDetail =
      K12Locators.genderDetail(page);

    // =====================================================
    // Test Data
    // =====================================================

    const targetK12Assessment =
      k12Data.k12Assessment;

    const validAssessmentStatuses =
      k12Data.assessmentStatuses;

    const resultActions =
      k12Data.resultActions;

    const assessmentReport =
      k12Data.assessmentReport;

    // Mixed score option (name comes from test data)
    const Mixedscore =
      k12Page.getMixedscore(resultActions.Mixedscore);

    // =====================================================
    //TC_K12_001 Validate Test Data
    // =====================================================

    expect(
      targetK12Assessment,
      'Missing diyAssessment in test data'
    ).toBeDefined();

    expect(
      targetK12Assessment.title,
      'Missing assessment title in test data'
    ).toBeDefined();

    // =====================================================
    // TC_K12_002-Assessment Title
    // =====================================================

    const assTitle =
      k12Page.getAssessmentTitleByStatus(
        targetK12Assessment.title,
        validAssessmentStatuses
      );

    // =====================================================
    // TC_K12_003-Login
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
    //TC_K12_004- Enter OTP
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
    // TC_K12_005-Dashboard
    // =====================================================

    await expect(dashboardText).toBeVisible();

    // =====================================================
    // TC_K12_006-Assessment Card
    // =====================================================

    await expect(assTitle).toBeVisible();

    // =====================================================
    // TC_K12_007-Added On Date
    // =====================================================

    const diyAddedOnDate =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
      );

    await expect(diyAddedOnDate).toHaveText(
      /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
    );

    // =====================================================
    // TC_K12_008-Partner Name
    // =====================================================

    const diyPartnerName =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "by")][1]'
      );

    await expect(diyPartnerName).toHaveText(
      /^\s*by\s+\S[\s\S]*$/
    );

    // =====================================================
    // TC_K12_009-Assessment Status
    // =====================================================

    await expect(
      k12Page.getAssessmentStatusByTitle(
        targetK12Assessment.title,
        validAssessmentStatuses
      )
    ).toContainText(
      /Yet to be Started|In Progress/
    );

    // =====================================================
    // TC_K12_010-Open Assessment
    // =====================================================

    await k12Page.clickAssessmentCardByStatus(
      targetK12Assessment.title,
      validAssessmentStatuses
    );

    
    // =====================================================
    // TC_K12_011-Resume
    // =====================================================
 
    // Start or Resume, whichever button is shown
    await k12Page.clickStartOrResume();
    await page.waitForTimeout(3000);

    // =====================================================
    // TC_K12_012-Continue
    // =====================================================

    await k12Page.clickContinue();

    await page.waitForTimeout(2000);

    // =====================================================
    // TC_K12_013-Profile Details
    // =====================================================

    await expect(profileTitle).toBeVisible();

    await expect(profileDescription).toBeVisible();

    await expect(fullName).toBeVisible();

    await expect(dateofBirth).toBeVisible();

    await expect(genderDetail).toBeVisible();

    // =====================================================
    // TC_K12_014-Continue From Profile
    // =====================================================

    await k12Page.clickContinue();

    await page.waitForTimeout(11_000);

    // =====================================================
    // TC_K12_015-Mixed Score
    // =====================================================

    await expect(Mixedscore).toBeVisible({ timeout: 30_000 });
    await Mixedscore.click();
    
    // =====================================================
    // TC_K12_016-Report Download
    // =====================================================

    // "Generating Your Report..." screen appears first, so wait for the report button
    const reportDownloadButton = k12Page.getAssessmentReportDownloadButton(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );
    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    const result = await k12Page.downloadAssessmentReport(
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