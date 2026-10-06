import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { CANINSIGHTLocators } from '../pages/Locaters/CANINSIGHT.locators';
import { CANINSIGHTPage } from '../pages/Pages/CANINSIGHT.Page';
import loginData from '../testdata/AssloginData.json';
import caninsightData from '../testdata/CANINSIGHTData.json';

const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });

  test('CANTAB® Insights', async ({ page }) => {
    test.setTimeout(180_000);

    const caninsightPage = new CANINSIGHTPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText = CANINSIGHTLocators.dashboardText(page);

    const targetAssessment = caninsightData.caninsightAssessment;
    const assessmentReport = caninsightData.assessmentReport;
    const validAssessmentStatuses = caninsightData.assessmentStatuses;
    const videoModal = caninsightData.videoModal; // FIX: was never defined

    expect(targetAssessment, 'Missing caninsightAssessment in test data').toBeDefined();
    expect(assessmentReport, 'Missing assessmentReport in test data').toBeDefined();
    expect(videoModal, 'Missing videoModal in test data').toBeDefined();

    const assTitle = caninsightPage.getAssessmentTitleByStatus(
      targetAssessment.title,
      validAssessmentStatuses
    );

    const {
      profileTitle,
      profileDescription,
      fullName,
      dateofBirth,
      genderDetail,
      completeWithMixedScores,
    } = caninsightPage;

    await loginPhoneInput.fill(loginData.phoneNumbers.valid);
    await loginSendOtpButton.click();

    await expect(page.getByRole('heading', { name: /verify phone/i })).toBeVisible();
    await expect(loginPinInputs).toHaveCount(6);

    for (const [index, digit] of [...loginData.otp.staticOtp].entries()) {
      await loginPinInputs.nth(index).fill(digit);
    }

    await expect(dashboardText).toBeVisible();
    await expect(assTitle).toBeVisible();

    const caninsightAddedOnDate = assTitle.locator(
      'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
    );
    await expect(caninsightAddedOnDate).toHaveText(/^Added on \d{1,2} [A-Za-z]+ \d{4}$/);

    const caninsightPartnerName = assTitle.locator(
      'xpath=following::p[starts-with(normalize-space(), "by")][1]'
    );
    await expect(caninsightPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

    await expect(
      caninsightPage.getAssessmentStatusByTitle(
        targetAssessment.title,
        validAssessmentStatuses
      )
    ).toContainText(/Yet to be Started|In Progress/);

    await caninsightPage.clickAssessmentCardByStatus(
      targetAssessment.title,
      validAssessmentStatuses
    );

    // =====================================================
    // Watch Video (open and close)
    // =====================================================

    // Video banner is visible on the assessment screen
    await expect(caninsightPage.youtubePlay).toBeVisible();

    // Open the video
    await caninsightPage.clickYoutubePlay();

    // "Watch Before You Start" modal opens with the YouTube player
    await expect(
      caninsightPage.getVideoModalTitle(videoModal.title)
    ).toBeVisible();

    await expect(
      caninsightPage.getVideoFrame(videoModal.title)
    ).toBeVisible({ timeout: 30_000 });

    // X icon is visible on the modal
    await expect(
      caninsightPage.getVideoCloseIcon(videoModal.title)
    ).toBeVisible();

    // Close the video
    await caninsightPage.clickVideoCloseIcon(videoModal.title);

    // Modal is closed and the assessment screen is shown again
    await expect(
      caninsightPage.getVideoDialog(videoModal.title)
    ).toBeHidden();

    await expect(caninsightPage.youtubePlay).toBeVisible();

    // =====================================================
    // Start assessment
    // =====================================================

    await caninsightPage.clickStartOrResume();
    await caninsightPage.clickContinue();

    await expect(profileTitle).toBeVisible();
    await expect(profileDescription).toBeVisible();
    await expect(fullName).toBeVisible();
    await expect(dateofBirth).toBeVisible();
    await expect(genderDetail).toBeVisible();

    await caninsightPage.clickContinue();

    await expect(completeWithMixedScores).toBeVisible({ timeout: 30_000 });
    await completeWithMixedScores.click();

    const reportDownloadButton = caninsightPage.getAssessmentReportDownloadButton(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );
    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    const result = await caninsightPage.downloadAssessmentReport(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );

    if (result.kind === 'download') {
      expect(result.download.suggestedFilename()).toBeTruthy();
    } else {
      expect(result.page.url()).not.toBe('about:blank');
    }
  });
});