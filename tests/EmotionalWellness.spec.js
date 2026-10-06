import { test, expect } from '@playwright/test';

import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { EmotionalWellnessLocators } from '../pages/Locaters/EmotionalWellness.locators';
import { EmotionalWellnessPage } from '../pages/Pages/EmotionalWellness.Page';

import loginData from '../testdata/AssloginData.json';
import emotionalwellnessData from '../testdata/EmotionalWellnessData.json';

const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('Emotional Wellness Assessment', async ({ page }) => {
    test.setTimeout(180_000);

    // Page Object
    const emotionalwellnessPage = new EmotionalWellnessPage(page);

    // Login Locators
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);

    // Page Locators
    const dashboardText = EmotionalWellnessLocators.dashboardText(page);
    const profileTitle = EmotionalWellnessLocators.profileTitle(page);
    const profileDescription = EmotionalWellnessLocators.profileDescription(page);
    const fullName = EmotionalWellnessLocators.fullName(page);
    const dateofBirth = EmotionalWellnessLocators.dateofBirth(page);
    const genderDetail = EmotionalWellnessLocators.genderDetail(page);
    const assessmentIntroDialog = EmotionalWellnessLocators.assessmentIntroDialog(page);
    const tabTitle = EmotionalWellnessLocators.tabTitle(page);
    const secondAssessmentTitle = EmotionalWellnessLocators.secondAssessmentTitle(page);
    const assessmentTime = EmotionalWellnessLocators.assessmentTime(page);
    const startAssessment = EmotionalWellnessLocators.startAssessment(page);

    // Test Data
    const targetEmotionalWellnessAssessment =
      emotionalwellnessData.emotionalwellnessAssessment;
    const validAssessmentStatuses = emotionalwellnessData.assessmentStatuses;

    // Question 1 data
    const anxiousQuestion = emotionalwellnessData.anxiousQuestion;
    const anxiousOptions = emotionalwellnessData.anxiousOptions;
    const selectedAnxiousOption = emotionalwellnessData.selectedanxiousOption;
    const questionProgressTotal = emotionalwellnessData.questionProgressTotal;

    // Question 2 data
    const worryQuestion = emotionalwellnessData.worryQuestion;
    const worryOptions = emotionalwellnessData.worryOptions;
    const selectedWorryOption = emotionalwellnessData.selectedworryOption;

    // Question 3 data
    const interestQuestion = emotionalwellnessData.interestQuestion;
    const interestOptions = emotionalwellnessData.interestOptions;
    const selectedInterestOption = emotionalwellnessData.selectedinterestOption;

    // Question 4 data
    const depressedQuestion = emotionalwellnessData.depressedQuestion;
    const depressedOptions = emotionalwellnessData.depressedOptions;
    const selectedDepressedOption = emotionalwellnessData.selecteddepressedOption;

    // Validate Test Data
    expect(
      targetEmotionalWellnessAssessment,
      'Missing assessment in test data'
    ).toBeDefined();
    expect(
      targetEmotionalWellnessAssessment.title,
      'Missing assessment title in test data'
    ).toBeDefined();

    // Assessment Title
    const assTitle = emotionalwellnessPage.getAssessmentTitleByStatus(
      targetEmotionalWellnessAssessment.title,
      validAssessmentStatuses
    );

    // =====================================================
    // Login
    // =====================================================
    await loginPhoneInput.fill(loginData.phoneNumbers.valid);
    await loginSendOtpButton.click();

    await expect(
      page.getByRole('heading', { name: /verify phone/i })
    ).toBeVisible();
    await expect(loginPinInputs).toHaveCount(6);

    const otp = loginData.otp.staticOtp;
    expect(otp, 'Static OTP must contain exactly 6 digits').toMatch(/^\d{6}$/);

    for (const [index, digit] of [...otp].entries()) {
      await loginPinInputs.nth(index).fill(digit);
    }

    // =====================================================
    // Dashboard / Assessment Card
    // =====================================================
    await expect(dashboardText).toBeVisible();
    await expect(assTitle).toBeVisible();

    const emotionalwellnessAddedOnDate = assTitle.locator(
      'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
    );
    await expect(emotionalwellnessAddedOnDate).toHaveText(
      /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
    );

    const emotionalwellnessPartnerName = assTitle.locator(
      'xpath=following::p[starts-with(normalize-space(), "by")][1]'
    );
    await expect(emotionalwellnessPartnerName).toHaveText(
      /^\s*by\s+\S[\s\S]*$/
    );

    await expect(
      emotionalwellnessPage.getAssessmentStatusByTitle(
        targetEmotionalWellnessAssessment.title,
        validAssessmentStatuses
      )
    ).toContainText(/Yet to be Started|In Progress/);

    // =====================================================
    // Open Assessment
    // =====================================================
    await emotionalwellnessPage.clickAssessmentCardByStatus(
      targetEmotionalWellnessAssessment.title,
      validAssessmentStatuses
    );

    // Start or Resume, whichever button is shown
    await emotionalwellnessPage.clickStartOrResume();

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
    await emotionalwellnessPage.clickContinue();
    await expect(assessmentIntroDialog).toBeVisible();
    await expect(tabTitle).toBeVisible();
    await expect(secondAssessmentTitle).toBeVisible();
    await expect(assessmentTime).toBeVisible();
    await startAssessment.click();
    await page.waitForTimeout(11_000);

    // =====================================================
    // Back arrow -> Exit popup -> Exit
    // =====================================================
    await emotionalwellnessPage.clickBrowserBack();
    await emotionalwellnessPage.verifyExitPopup();
    await emotionalwellnessPage.clickExit();

    await expect(page).toHaveURL(/\/product\//);
    await expect(emotionalwellnessPage.inProgressBadge).toBeVisible();

    // =====================================================
    // Resume -> start assessment again
    // =====================================================
    await emotionalwellnessPage.clickStartOrResume();

    // Profile and intro screens may be skipped on resume
    if (await emotionalwellnessPage.continueButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await emotionalwellnessPage.clickContinue();
    }
    if (await startAssessment.isVisible({ timeout: 5000 }).catch(() => false)) {
      await emotionalwellnessPage.ClickstartAssessment();
    }

    await expect(page).toHaveURL(/emotional-wellness-assessment/);

    // Wait for the question screen (web-first assertion instead of a fixed sleep)
    await expect(
      emotionalwellnessPage.getanxiousQuestion(anxiousQuestion)
    ).toBeVisible({ timeout: 15_000 });

    // =====================================================
    // Back arrow -> Exit popup -> Stay
    // =====================================================
    await emotionalwellnessPage.clickBrowserBack();
    await emotionalwellnessPage.verifyExitPopup();
    await emotionalwellnessPage.clickStay();

    await expect(emotionalwellnessPage.exitPopupTitle).toBeHidden();

    // =====================================================
    // Question 1
    // =====================================================

    // TC_ISI_013 - Question 1 is displayed
    await expect(
      emotionalwellnessPage.getanxiousQuestion(anxiousQuestion)
    ).toBeVisible();

    // TC_ISI_014 - All options are displayed
    for (const option of anxiousOptions) {
      await expect(emotionalwellnessPage.getanxiousOption(option)).toBeVisible();
    }

    console.log(
      `Selected answer: ${selectedAnxiousOption.number} - ${selectedAnxiousOption.text}`
    );

    // TC_ISI_015 - Select the configured answer
    await emotionalwellnessPage.selectanxiousOption(selectedAnxiousOption);

    // TC_ISI_016 - Next is enabled after selecting
    await expect(emotionalwellnessPage.getNextButton()).toBeEnabled();

    // TC_ISI_017 - Proceed to Question 2
    await emotionalwellnessPage.clickNextButton();

    // =====================================================
    // Question 2
    // =====================================================

    // Question 2 is displayed (progress 2 / 4)
    await expect(
      emotionalwellnessPage.getQuestionProgress(2, targetEmotionalWellnessAssessment.questionProgressTotal)
    ).toBeVisible();
    await expect(emotionalwellnessPage.getworryQuestion(worryQuestion)).toBeVisible();

    // All options are displayed
    for (const option of worryOptions) {
      await expect(emotionalwellnessPage.getworryOption(option)).toBeVisible();
    }

    console.log(
      `Selected answer: ${selectedWorryOption.number} - ${selectedWorryOption.text}`
    );

    // Select the configured answer
    await emotionalwellnessPage.selectworryOption(selectedWorryOption);

    // Next is enabled after selecting
    await expect(emotionalwellnessPage.getNextButton()).toBeEnabled();

    // Proceed to Question 3
    await emotionalwellnessPage.clickNextButton();

    // =====================================================
    // Question 3
    // =====================================================

    await expect(
      emotionalwellnessPage.getQuestionProgress(3, targetEmotionalWellnessAssessment.questionProgressTotal)
    ).toBeVisible();
    await expect(emotionalwellnessPage.getinterestQuestion(interestQuestion)).toBeVisible();

    for (const option of interestOptions) {
      await expect(emotionalwellnessPage.getinterestOption(option)).toBeVisible();
    }

    console.log(
      `Selected answer: ${selectedInterestOption.number} - ${selectedInterestOption.text}`
    );

    await emotionalwellnessPage.selectinterestOption(selectedInterestOption);

    await expect(emotionalwellnessPage.getNextButton()).toBeEnabled();

    // Proceed to Question 4
    await emotionalwellnessPage.clickNextButton();

    // =====================================================
    // Question 4
    // =====================================================

    await expect(
      emotionalwellnessPage.getQuestionProgress(4, targetEmotionalWellnessAssessment.questionProgressTotal)
    ).toBeVisible();
    await expect(emotionalwellnessPage.getdepressedQuestion(depressedQuestion)).toBeVisible();

    for (const option of depressedOptions) {
      await expect(emotionalwellnessPage.getdepressedOption(option)).toBeVisible();
    }

    console.log(
      `Selected answer: ${selectedDepressedOption.number} - ${selectedDepressedOption.text}`
    );

    // Select the answer and retry until the app accepts it
    // (the click can be lost while the question screen is still transitioning)
    await expect(async () => {
      await emotionalwellnessPage.selectdepressedOption(selectedDepressedOption);
      await expect(emotionalwellnessPage.getQuestionContinueButton()).toBeEnabled({
        timeout: 2_000,
      });
    }).toPass({ timeout: 15_000 });

    // Click Continue on the last question
    await emotionalwellnessPage.clickQuestionContinueButton();
  });
});