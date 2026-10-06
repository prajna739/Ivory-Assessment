import { test, expect } from '@playwright/test';

import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { BRAINFOGLocators } from '../pages/Locaters/BRAINFOG.locators';
import { BRAINFOGPage } from '../pages/Pages/BRAINFOG.Page';

import loginData from '../testdata/AssloginData.json';
import brainfogData from '../testdata/BRAINFOGData.json';

const LOGIN_URL =loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('Brain Fog Index', async ({ page }) => {
    test.setTimeout(240_000);
    const brainfogPage = new BRAINFOGPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText = BRAINFOGLocators.dashboardText(page);
    const targetBrainfogAssessment = brainfogData.brainfogAssessment;
    const assTitle = brainfogPage.getAssessmentTitleByStatus(
      targetBrainfogAssessment.title,
      targetBrainfogAssessment.status
    );

    const kebabTitle = BRAINFOGLocators.kebabTitle(page);
    const kebabTime = BRAINFOGLocators.kebabTime(page);
    const backArrow = BRAINFOGLocators.backArrow(page);
    const clickStart = BRAINFOGLocators.clickStart(page);
    const tabTitle = BRAINFOGLocators.tabTitle(page);
    const tabSubTitle = BRAINFOGLocators.tabSubTitle(page);
    const tabDiscription = BRAINFOGLocators.tabDiscription(page);
    const questionCount = BRAINFOGLocators.questionCount(page);
    const cancelIcon = BRAINFOGLocators.cancelIcon(page);
    const beginAss = BRAINFOGLocators.beginAss(page);

  
    const profileTitle = brainfogPage.profileTitle;
    const profileDescription = brainfogPage.profileDescription;
    const fullName = brainfogPage.fullName;
    const dateofBirth = brainfogPage.dateofBirth;
    const genderDetail = brainfogPage.genderDetail;
    const Mixedscore = brainfogPage.completeWithMixedScores;
    const assessmentReport = brainfogData.assessmentReport;

    //question 1 data
    const mentalQuestion = brainfogData.mentalQuestion;
    const mentalOptions = brainfogData.mentalOptions;
    const selectedMentalOption = brainfogData.selectedmentalOption;

    //question 2 data
    const focusQuestion = brainfogData.focusQuestion;
    const focusOptions = brainfogData.focusOptions;
    const selectedFocusOption = brainfogData.selectedFocusOption;

    //question 3 data
    const memoryQuestion = brainfogData.memoryQuestion;
    const memoryOptions = brainfogData.memoryOptions;
    const selectedMemoryOption = brainfogData.selectedMemoryOption;

    //question 4 data
    const thinkingSpeedQuestion = brainfogData.thinkingSpeedQuestion;
    const thinkingSpeedOptions = brainfogData.thinkingSpeedOptions;
    const selectedThinkingSpeedOption = brainfogData.selectedThinkingSpeedOption;
    const changedThinkingSpeedOption = brainfogData.changedThinkingSpeedOption;

    //question 5 data
    const mentalEnergyQuestion = brainfogData.mentalEnergyQuestion;
    const mentalEnergyOptions = brainfogData.mentalEnergyOptions;
    const selectedMentalEnergyOption = brainfogData.selectedMentalEnergyOption;

    //TC_BrainFog_001 - Verify user can login successfully using a valid phone number and static OTP
    await loginPhoneInput.fill(loginData.phoneNumbers.valid);
    await loginSendOtpButton.click();
    await expect(
      page.getByRole('heading', { name: /verify phone/i })
    ).toBeVisible();

    await expect(loginPinInputs).toHaveCount(6);

    for (const [index, digit] of [...loginData.otp.staticOtp].entries()) {
      await loginPinInputs.nth(index).fill(digit);
    }

    //TC_BrainFog_002 - Verify dashboard loads with correct greeting text for logged-in user
    await expect(dashboardText).toBeVisible();

    //TC_BrainFog_003 - Verify assessment card displays title, Added on date, partner name and status
    await expect(assTitle).toBeVisible();

    //TC_BrainFog_004-verify the assessment created date
    const brainfogAddedOnDate = assTitle.locator(
      'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
    );
    await expect(brainfogAddedOnDate).toHaveText(
      /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
    );

    //TC_BrainFog_005-verify the partner name for ISI
    const brainfogPartnerName = assTitle.locator(
      'xpath=following::p[starts-with(normalize-space(), "by")][1]'
    );
    await expect(brainfogPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

    //TC_BrainFog_006 - Verify new assessment shows "YET TO BE STARTED"/In progress status
    await expect(
      brainfogPage.getAssessmentStatusByTitle(
        targetBrainfogAssessment.title,
        targetBrainfogAssessment.status
      )
    ).toHaveText(targetBrainfogAssessment.status);

    //TC_BrainFog_007 - Verify clicking assessment card opens intro modal
    await brainfogPage.clickAssessmentCardByStatus(
      targetBrainfogAssessment.title,
      targetBrainfogAssessment.status
    );

    //TC_BrainFog_008 - Verify kebab menu is clickable and displays expected options (title and time)
    await expect(kebabTitle).toBeVisible();
    //Verify the timing
    await expect(kebabTime).toBeVisible();

    //TC_BrainFog_009 - Verify back arrow navigates to previous screen
    await backArrow.click();
    await page.waitForTimeout(2000);

    // TC_BrainFog_010-Re-open the assessment card to continue with the Start flow
    await brainfogPage.clickAssessmentCardByStatus(
      targetBrainfogAssessment.title,
      targetBrainfogAssessment.status
    );

    //TC_BrainFog_011 - Verify the Start option opens the assessment info modal
    await clickStart.click();

    //TC_BrainFog_012 - Verify modal displays title, subtitle, description, question count
    await expect(tabTitle).toBeVisible();
    await expect(tabSubTitle).toBeVisible();
    await expect(tabDiscription).toBeVisible();
    await expect(questionCount).toBeVisible();

    //TC_BrainFog_013- Verify X button closes modal without starting assessment
    await cancelIcon.click();
    // Re-open the Start modal to proceed with Begin Assessment
    await clickStart.click();

    //TC_BrainFog_014 - Verify the Begin Assessment option starts the assessment
    await beginAss.click();

    // TC_BrainFog_015 - Verify the first question progress counter is displayed correctly
    await expect(
      brainfogPage.getQuestionProgress(1, targetBrainfogAssessment.questionProgressTotal)
    ).toBeVisible();

    // ===================== Question 1 =====================

    // TC_BrainFog_016- Verify Question 1 is displayed
    await expect(brainfogPage.getmentalQuestion(mentalQuestion)).toBeVisible();

    // TC_BrainFog_017 - Verify all available options for Question 1 are displayed
    for (const option of mentalOptions) {
      await expect(brainfogPage.getmentalOption(option)).toBeVisible();
    }

    console.log(
      `Selected answer: ${selectedMentalOption.number} - ${selectedMentalOption.text}`
    );

    // TC_BrainFog_018 - Verify user can select the configured answer for Question 1
    await brainfogPage.selectmentalOption(selectedMentalOption);

    // TC_BrainFog_019 - Verify the Next button is enabled after selecting an answer
    await expect(brainfogPage.getNextButton()).toBeEnabled();

    // TC_BrainFog_020 - Verify user can proceed from Question 1 to Question 2 using Next
    await brainfogPage.clickNextButton();

    // TC_BrainFog_021 - Verify progress counter updates to Question 2
    await expect(
      brainfogPage.getQuestionProgress(2, targetBrainfogAssessment.questionProgressTotal)
    ).toBeVisible();

    // ===================== Question 2 - Focus =====================

    // TC_BrainFog_022 - Verify Question 2 - Focus - is displayed
    await expect(brainfogPage.getQuestionTitle(focusQuestion)).toBeVisible();

    // TC_BrainFog_023 - Verify all available options (1 to 4) for Question 2 are displayed
    for (const option of focusOptions) {
      await expect(brainfogPage.getAnswerOption(option)).toBeVisible();
    }
    await expect(brainfogPage.getAnswerLabel(focusOptions[0].text)).toBeVisible();
    await expect(brainfogPage.getAnswerLabel(focusOptions[3].text)).toBeVisible();

    console.log(
      `Selected answer: ${selectedFocusOption.number} - ${selectedFocusOption.text}`
    );

    // TC_BrainFog_024 - Verify user can select the configured answer for Question 2
    await brainfogPage.selectAnswerOption(selectedFocusOption);
    await expect(brainfogPage.getAnswerLabel(selectedFocusOption.text)).toBeVisible();

    // TC_BrainFog_025 - Verify the Next button is enabled after selecting an answer
    await expect(brainfogPage.getNextButton()).toBeEnabled();

    // TC_BrainFog_026 - Verify user can proceed from Question 2 to Question 3 using Next
    await brainfogPage.clickNextButton();

    // TC_BrainFog_027 - Verify progress counter updates to Question 3
    await expect(
      brainfogPage.getQuestionProgress(3, targetBrainfogAssessment.questionProgressTotal)
    ).toBeVisible();

    // ===================== Question 3 - Memory =====================

    // TC_BrainFog_028 - Verify Question 3 - Memory - is displayed
    await expect(brainfogPage.getQuestionTitle(memoryQuestion)).toBeVisible();

    // TC_BrainFog_029 - Verify all available options (1 to 4) for Question 3 are displayed
    for (const option of memoryOptions) {
      await expect(brainfogPage.getAnswerOption(option)).toBeVisible();
    }
    await expect(brainfogPage.getAnswerLabel(memoryOptions[0].text)).toBeVisible();
    await expect(brainfogPage.getAnswerLabel(memoryOptions[3].text)).toBeVisible();

    console.log(
      `Selected answer: ${selectedMemoryOption.number} - ${selectedMemoryOption.text}`
    );

    // TC_BrainFog_030 - Verify user can select the configured answer for Question 3
    await brainfogPage.selectAnswerOption(selectedMemoryOption);
    await expect(brainfogPage.getAnswerLabel(selectedMemoryOption.text)).toBeVisible();

    // TC_BrainFog_031 - Verify the Next button is enabled after selecting an answer
    await expect(brainfogPage.getNextButton()).toBeEnabled();

    // TC_BrainFog_032 - Verify user can proceed from Question 3 to Question 4 using Next
    await brainfogPage.clickNextButton();

    // TC_BrainFog_033 - Verify progress counter updates to Question 4
    await expect(
      brainfogPage.getQuestionProgress(4, targetBrainfogAssessment.questionProgressTotal)
    ).toBeVisible();

    // ===================== Question 4 - Thinking speed =====================

    // TC_BrainFog_034 - Verify Question 4 - Thinking speed - is displayed
    await expect(brainfogPage.getQuestionTitle(thinkingSpeedQuestion)).toBeVisible();

    // TC_BrainFog_035 - Verify all available options (1 to 4) for Question 4 are displayed
    for (const option of thinkingSpeedOptions) {
      await expect(brainfogPage.getAnswerOption(option)).toBeVisible();
    }
    await expect(brainfogPage.getAnswerLabel(thinkingSpeedOptions[0].text)).toBeVisible();
    await expect(brainfogPage.getAnswerLabel(thinkingSpeedOptions[3].text)).toBeVisible();

    // TC_BrainFog_036 - Verify the Next button is disabled until an answer is selected for Question 4
    await expect(brainfogPage.getNextButton()).toBeDisabled();

    console.log(
      `Selected answer: ${selectedThinkingSpeedOption.number} - ${selectedThinkingSpeedOption.text}`
    );

    // TC_BrainFog_037 - Verify user can select the configured answer for Question 4
    await brainfogPage.selectAnswerOption(selectedThinkingSpeedOption);
    await expect(brainfogPage.getAnswerLabel(selectedThinkingSpeedOption.text)).toBeVisible();

    // TC_BrainFog_038 - Verify the Next button is enabled after selecting an answer
    await expect(brainfogPage.getNextButton()).toBeEnabled();

    // TC_BrainFog_039 - Verify user can proceed from Question 4 to Question 5 using Next
    await brainfogPage.clickNextButton();

    // TC_BrainFog_040 - Verify progress counter updates to Question 5
    await expect(
      brainfogPage.getQuestionProgress(5, targetBrainfogAssessment.questionProgressTotal)
    ).toBeVisible();
    // wait until Q4 is gone, so Q5 clicks never run during the slide animation
    await expect(brainfogPage.getQuestionTitle(thinkingSpeedQuestion)).toBeHidden();

    // ===================== Question 5 - Mental energy (first visit) =====================

    // TC_BrainFog_041 - Verify Question 5 - Mental energy - is displayed
    await expect(brainfogPage.getQuestionTitle(mentalEnergyQuestion)).toBeVisible();

    // TC_BrainFog_042 - Verify all available options (1 to 4) for Question 5 are displayed
    for (const option of mentalEnergyOptions) {
      await expect(brainfogPage.getAnswerOption(option)).toBeVisible();
    }
    await expect(brainfogPage.getAnswerLabel(mentalEnergyOptions[0].text)).toBeVisible();
    await expect(brainfogPage.getAnswerLabel(mentalEnergyOptions[3].text)).toBeVisible();

    // TC_BrainFog_043 - Verify the Submit button is disabled until an answer is selected for Question 5
    await expect(brainfogPage.getChooseAnswerPrompt()).toBeVisible();
    await expect(brainfogPage.getSubmitButton()).toBeDisabled();

    // ===================== Go back to Question 4 and change the answer =====================

    // TC_BrainFog_044 - Verify Back button navigates from Question 5 to Question 4
    await brainfogPage.clickBackButton();
    await expect(
      brainfogPage.getQuestionProgress(4, targetBrainfogAssessment.questionProgressTotal)
    ).toBeVisible();
    await expect(brainfogPage.getQuestionTitle(thinkingSpeedQuestion)).toBeVisible();
    await expect(brainfogPage.getQuestionTitle(mentalEnergyQuestion)).toBeHidden();

    // TC_BrainFog_045 - Verify user can change the answer for Question 4
    console.log(
      `Changed answer: ${changedThinkingSpeedOption.number} - ${changedThinkingSpeedOption.text}`
    );
    await brainfogPage.selectAnswerOption(changedThinkingSpeedOption);
    await expect(brainfogPage.getAnswerLabel(changedThinkingSpeedOption.text)).toBeVisible();

    // TC_BrainFog_046 - Verify the Next button is enabled and user returns from Question 4 to Question 5
    await expect(brainfogPage.getNextButton()).toBeEnabled();
    await brainfogPage.clickNextButton();
    await expect(
      brainfogPage.getQuestionProgress(5, targetBrainfogAssessment.questionProgressTotal)
    ).toBeVisible();
    await expect(brainfogPage.getQuestionTitle(mentalEnergyQuestion)).toBeVisible();
    // wait until Q4 is gone before interacting with Q5
    await expect(brainfogPage.getQuestionTitle(thinkingSpeedQuestion)).toBeHidden();

    // ===================== Question 5 - select answer and submit =====================

    console.log(
      `Selected answer: ${selectedMentalEnergyOption.number} - ${selectedMentalEnergyOption.text}`
    );

    // TC_BrainFog_047 - Verify user can select the configured answer for Question 5
    await expect(brainfogPage.getAnswerOption(selectedMentalEnergyOption)).toBeVisible();
    await brainfogPage.selectAnswerOption(selectedMentalEnergyOption);
    // the "Choose an answer" placeholder disappears only when an answer is registered
    await expect(brainfogPage.getChooseAnswerPrompt()).toBeHidden();
    await expect(brainfogPage.getAnswerLabel(selectedMentalEnergyOption.text)).toBeVisible();

    // TC_BrainFog_048 - Verify the Submit button is enabled after selecting an answer
    await expect(brainfogPage.getSubmitButton()).toBeEnabled();

    // TC_BrainFog_049 - Verify user can submit the assessment
    await brainfogPage.clickSubmitButton();

    // wait for the submission to finish instead of ending the test right after the click
    await expect(
      brainfogPage.getQuestionProgress(5, targetBrainfogAssessment.questionProgressTotal)
    ).toBeHidden({ timeout: 30_000 });
    await expect(brainfogPage.getSubmitButton()).toBeHidden();

    // TC_BrainFog_050 - Verify the screen after submit is displayed (Profile details)
    await expect(profileTitle).toBeVisible({ timeout: 30_000 });
    // =====================================================
    // Profile Details
    // =====================================================

    await expect(profileDescription).toBeVisible();
    await expect(fullName).toBeVisible();
    await expect(dateofBirth).toBeVisible();
    await expect(genderDetail).toBeVisible();

    // =====================================================
    // Continue From Profile
    // =====================================================

    await brainfogPage.clickContinue();

    // =====================================================
    // Mixed Score (Assessment simulator inside the iframe)
    // =====================================================

    // FIX: replaced the fixed 11s sleep with a proper wait on the iframe button
    await expect(Mixedscore).toBeVisible({ timeout: 60_000 });
    await Mixedscore.click();

    // =====================================================
    // Report Download
    // =====================================================

    // "Generating Your Report..." screen appears first, so wait for the report button
    const reportDownloadButton = brainfogPage.getAssessmentReportDownloadButton(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );
    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    const result = await brainfogPage.downloadAssessmentReport(
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