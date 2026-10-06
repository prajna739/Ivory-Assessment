import { test, expect } from '@playwright/test';

import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { ConcentrationLocators } from '../pages/Locaters/Concentration.locators';
import { ConcentrationPage } from '../pages/Pages/Concentration.Page';

import loginData from '../testdata/AssloginData.json';
import concentrationData from '../testdata/ConcentrationData.json';

const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('Concentration Assessment', async ({ page }) => {

    test.setTimeout(180_000);

    // =====================================================
    // Test Data
    // =====================================================

    const targetConcentrationAssessment =
      concentrationData.concentrationAssessment;

    const validAssessmentStatuses =
      concentrationData.assessmentStatuses;

    const resultActions =
      concentrationData.resultActions;

    const assessmentReport =
      concentrationData.assessmentReport;

    expect(
      targetConcentrationAssessment,
      'Missing "concentrationAssessment" key in ConcentrationData.json'
    ).toBeDefined();

    expect(
      targetConcentrationAssessment?.title,
      'Missing assessment title in test data'
    ).toBeDefined();

    expect(
      validAssessmentStatuses,
      'Missing "assessmentStatuses" in test data'
    ).toBeDefined();

    expect(
      resultActions?.Mixedscore,
      'Missing "resultActions.Mixedscore" in test data'
    ).toBeDefined();

    expect(
      assessmentReport?.title,
      'Missing "assessmentReport.title" in test data'
    ).toBeDefined();

    // =====================================================
    // Page Object
    // =====================================================

    const concentrationPage = new ConcentrationPage(page);

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
    // Concentration Locators
    // =====================================================

    const dashboardText =
      ConcentrationLocators.dashboardText(page);

    const profileTitle =
      ConcentrationLocators.profileTitle(page);

    const profileDescription =
      ConcentrationLocators.profileDescription(page);

    const fullName =
      ConcentrationLocators.fullName(page);

    const dateofBirth =
      ConcentrationLocators.dateofBirth(page);

    const genderDetail =
      ConcentrationLocators.genderDetail(page);

    // Mixed score option
    const Mixedscore =
      concentrationPage.getMixedscore(resultActions.Mixedscore);

    // =====================================================
    // Assessment Title
    // =====================================================

    const assTitle =
      concentrationPage.getAssessmentTitleByStatus(
        targetConcentrationAssessment.title,
        validAssessmentStatuses
      );

    // =====================================================
    // TC_Concentration_001-Login
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
    // TC_Concentration_002-Enter OTP
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
    // TC_Concentration_003-Dashboard
    // =====================================================

    await expect(dashboardText).toBeVisible();

    // =====================================================
    // TC_Concentration_004-Assessment Card
    // =====================================================

    await expect(assTitle).toBeVisible();

    // =====================================================
    // TC_Concentration_005-Added On Date
    // =====================================================

    const diyAddedOnDate =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
      );

    await expect(diyAddedOnDate).toHaveText(
      /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
    );

    // =====================================================
    // TC_Concentration_006-Partner Name
    // =====================================================

    const diyPartnerName =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "by")][1]'
      );

    await expect(diyPartnerName).toHaveText(
      /^\s*by\s+\S[\s\S]*$/
    );

    // =====================================================
    // TC_Concentration_007-Assessment Status
    // =====================================================

    await expect(
      concentrationPage.getAssessmentStatusByTitle(
        targetConcentrationAssessment.title,
        validAssessmentStatuses
      )
    ).toContainText(
      /Yet to be Started|In Progress/
    );

    // =====================================================
    // TC_Concentration_008-Open Assessment
    // =====================================================

    await concentrationPage.clickAssessmentCardByStatus(
      targetConcentrationAssessment.title,
      validAssessmentStatuses
    );

    // =====================================================
    // TC_Concentration_009-Start / Resume
    // =====================================================

    
    await concentrationPage.clickStartOrResume();
    await page.waitForTimeout(3000);

    // =====================================================
    // TC_Concentration_010-Continue
    // =====================================================

    await concentrationPage.clickContinue();

    await page.waitForTimeout(2000);

    // =====================================================
    // TC_Concentration_011-Profile Details
    // =====================================================

    await expect(profileTitle).toBeVisible();
    await expect(profileDescription).toBeVisible();
    await expect(fullName).toBeVisible();
    await expect(dateofBirth).toBeVisible();
    await expect(genderDetail).toBeVisible();

    // =====================================================
    // TC_Concentration_012-Continue From Profile
    // =====================================================

    await concentrationPage.clickContinue();

    await page.waitForTimeout(11_000);

    // =====================================================
    // TC_Concentration_013-Mixed Score (Assessment simulator)
    // =====================================================

    await expect(Mixedscore).toBeVisible({ timeout: 30_000 });
    await Mixedscore.click();

    // =====================================================
    // TC_Concentration_014-Report Download
    // =====================================================

    // "Generating Your Report..." screen appears first, so wait for the report button
    const reportDownloadButton =
      concentrationPage.getAssessmentReportDownloadButton(
        assessmentReport.title,
        assessmentReport.downloadButtonName
      );

    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    const result = await concentrationPage.downloadAssessmentReport(
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