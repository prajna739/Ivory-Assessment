import { test, expect } from '@playwright/test';

import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { DIYLocators } from '../pages/Locaters/DIY.locators';
import { DIYPage } from '../pages/Pages/DIY.Page';

import loginData from '../testdata/AssloginData.json';
import diyData from '../testdata/DIYData.json';

const LOGIN_URL = loginData.urls.login;


test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('TC01_DIY - Cognitive Assessment (DIY)', async ({ page }) => {
    test.setTimeout(180_000);

    // =====================================================
    // Page Object
    // =====================================================

    const diyPage = new DIYPage(page);

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
      DIYLocators.dashboardText(page);

    const profileTitle =
      DIYLocators.profileTitle(page);

    const profileDescription =
      DIYLocators.profileDescription(page);

    const fullName =
      DIYLocators.fullName(page);

    const dateofBirth =
      DIYLocators.dateofBirth(page);

    const genderDetail =
      DIYLocators.genderDetail(page);

    // =====================================================
    // Test Data
    // =====================================================

    const targetDIYAssessment =
      diyData.diyAssessment;

    const validAssessmentStatuses =
      diyData.assessmentStatuses;

    // Video modal data
    const videoModal =
      diyData.videoModal;

    // Result actions and report data
    const resultActions =
      diyData.resultActions;

    const assessmentReport =
      diyData.assessmentReport;

    // Mixed score option 
    const Mixedscore =
      diyPage.getMixedscore(resultActions.Mixedscore);

    // =====================================================
    // Validate Test Data
    // =====================================================

    expect(
      targetDIYAssessment,
      'Missing diyAssessment in test data'
    ).toBeDefined();

    expect(
      targetDIYAssessment.title,
      'Missing assessment title in test data'
    ).toBeDefined();

    // =====================================================
    // Assessment Title
    // =====================================================

    const assTitle =
      diyPage.getAssessmentTitleByStatus(
        targetDIYAssessment.title,
        validAssessmentStatuses
      );

    // =====================================================
    // TC01_DIY -Login with valid phone number
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
    // TC02_DIY -: Enter static OTP
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
    // TC03_DIY -: Dashboard is displayed
    // =====================================================

    await expect(dashboardText).toBeVisible();

    // =====================================================
    // TC04_DIY : Verify DIY assessment card
    // =====================================================

    await expect(assTitle).toBeVisible();

    // -----------------------------------------------------
    // Added On Date
    // Expected: "Added on <d Month yyyy>"
    // -----------------------------------------------------

    const diyAddedOnDate =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
      );

    await expect(diyAddedOnDate).toHaveText(
      /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
    );

    // -----------------------------------------------------
    // TC6_DIY-Partner Name
    // -----------------------------------------------------

    const diyPartnerName =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "by")][1]'
      );

    await expect(diyPartnerName).toHaveText(
      /^\s*by\s+\S[\s\S]*$/
    );

    // -----------------------------------------------------
    // Assessment Status
    // -----------------------------------------------------

    await expect(
      diyPage.getAssessmentStatusByTitle(
        targetDIYAssessment.title,
        validAssessmentStatuses
      )
    ).toContainText(
      /Yet to be Started|In Progress/
    );

    // =====================================================
    // TC07_DIY -: Open the assessment card
    // =====================================================

    await diyPage.clickAssessmentCardByStatus(
      targetDIYAssessment.title,
      validAssessmentStatuses
    );

    // =====================================================
    // TC08_DIY : Watch Video (open)
    
    // =====================================================

    // Video banner is visible on the assessment screen
    await expect(diyPage.youtubePlay).toBeVisible();

    // Open the video
    await diyPage.clickYoutubePlay();

    // "Watch Before You Start" modal opens with the YouTube player
    await expect(
      diyPage.getVideoModalTitle(videoModal.title)
    ).toBeVisible();

    await expect(
      diyPage.getVideoFrame(videoModal.title)
    ).toBeVisible({ timeout: 30_000 });

    // X icon is visible on the modal
    await expect(
      diyPage.getVideoCloseIcon(videoModal.title)
    ).toBeVisible();

    // =====================================================
    // TC09_DIY - Step 6: Watch Video (close)
    // =====================================================

    // Close the video
    await diyPage.clickVideoCloseIcon(videoModal.title);

    // Modal is closed and the assessment screen is shown again
    await expect(
      diyPage.getVideoDialog(videoModal.title)
    ).toBeHidden();

    await expect(diyPage.youtubePlay).toBeVisible();

    // =====================================================
    // TC010_DIY -: Start / Resume and Continue
    // =====================================================

    // Start or Resume, whichever button is shown
    await diyPage.clickStartOrResume();
    await page.waitForTimeout(3000);

    await diyPage.clickContinue();

    await page.waitForTimeout(2000);

    // =====================================================
    // TC011_DIY : Verify profile details
    // =====================================================

    await expect(profileTitle).toBeVisible();

    await expect(profileDescription).toBeVisible();

    await expect(fullName).toBeVisible();

    await expect(dateofBirth).toBeVisible();

    await expect(genderDetail).toBeVisible();

    // =====================================================
    // TC12_DIY -  Continue from Profile
    // =====================================================

    await diyPage.clickContinue();

    await page.waitForTimeout(11_000);

    // =====================================================
    // TC013_DIY - Step 10: Select Mixed score
    // =====================================================

    await expect(Mixedscore).toBeVisible({ timeout: 30_000 });
    await Mixedscore.click();

    // =====================================================
    // TC015_DIY -: Wait for report download button
    // =====================================================

    // "Generating Your Report..." screen appears first, so wait for the report button
    const reportDownloadButton = diyPage.getAssessmentReportDownloadButton(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );
    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    // =====================================================
    // TC16_DIY -: Download the report
    // =====================================================

    const result = await diyPage.downloadAssessmentReport(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );

    if (result.kind === 'download') {
      expect(result.download.suggestedFilename()).toBeTruthy();
    } else {
      // Report opened in a new tab
      expect(result.page.url()).not.toBe('about:blank');
    }

    // =====================================================
    // Post-condition: close the browser page
    // =====================================================

    await page.waitForTimeout(6000);
    await page.close();
  });
});