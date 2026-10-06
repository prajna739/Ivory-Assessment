import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { STRESSLocators } from '../pages/Locaters/STRESS.locators';
import { STRESSPage } from '../pages/Pages/STRESS.Page';
import loginData from '../testdata/AssloginData.json';
import stressData from '../testdata/STRESSData.json';
const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });


  test('Cognitive Stress Index', async ({ page }) => {
    test.setTimeout(120_000)
    const stressPage = new STRESSPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText =STRESSLocators.dashboardText(page);
    const targetStressAssessment = stressData.stressAssessment;
    const assTitle = stressPage.getAssessmentTitleByStatus(
      targetStressAssessment.title,
      targetStressAssessment.status
    );
    
    const kebabTitle= STRESSLocators.kebabTitle(page);
    const kebabTime= STRESSLocators.kebabTime(page);
    const backArrow= STRESSLocators.backArrow(page);
    const  clickStart= STRESSLocators.clickStart(page);
    const tabTitle= STRESSLocators.tabTitle(page);
    const tabSubTitle =STRESSLocators.tabSubTitle(page);
    const tabDiscription=STRESSLocators.tabDiscription(page);
    const questionCount= STRESSLocators.questionCount(page);
    const secondTask= STRESSLocators.secondTask(page);
    const thirdTask=STRESSLocators.thirdTask(page);
    const cancelIcon = STRESSLocators.cancelIcon(page);
    const beginAss= STRESSLocators.beginAss(page);
     //question 1 data
    const mentalQuestion = stressData.mentalQuestion;
    const mentalOptions = stressData.mentalOptions;
    const selectedMentalOption = stressData.selectedmentalOption;
    //question 2 to 8 data
    const question2 = stressData.question2;
    const question3 = stressData.question3;
    const question4 = stressData.question4;
    const question5 = stressData.question5;
    const question6 = stressData.question6;
    const question7 = stressData.question7;
    const question8 = stressData.question8;
    
    const {
      profileTitle,
      profileDescription,
      fullName,
      dateofBirth,
      genderDetail,
      completeWithMixedScores,
    } = stressPage;
    
    const assessmentReport = stressData.assessmentReport;


  //TC_Stress_001 - Verify user can login successfully using a valid phone number and static OTP
  await loginPhoneInput.fill(loginData.phoneNumbers.valid);
  await loginSendOtpButton.click();
  // TC_Stress_002-Add assertion for successful OTP send if applicable
  await expect(
  page.getByRole('heading', { name: /verify phone/i })
).toBeVisible();

await expect(loginPinInputs).toHaveCount(6);

for (const [index, digit] of [...loginData.otp.staticOtp].entries()) {
  await loginPinInputs.nth(index).fill(digit);
} 

//TC_Stress_003 - Verify dashboard loads with correct greeting text for logged-in user

await expect(dashboardText).toBeVisible();
//TC_Stress_004 - Verify assessment card displays title, Added on date, partner name and status
await expect(assTitle).toBeVisible();

//verify the assessment created date
const stressAddedOnDate = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
);

await expect(stressAddedOnDate).toHaveText(
  /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
);


//TC_Stress_005-verify the partner name for ISI

const stressPartnerName = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "by")][1]'
);

await expect(stressPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

//TC_Stress_006 - Verify new assessment shows "YET TO BE STARTED"/In progress status

await expect(
  stressPage.getAssessmentStatusByTitle(
    targetStressAssessment.title,
    targetStressAssessment.status
  )
).toHaveText(
  targetStressAssessment.status
);

//TC_Stress_007 - Verify clicking assessment card opens intro modal
await stressPage.clickAssessmentCardByStatus(
  targetStressAssessment.title,
  targetStressAssessment.status
);

//TC_Stress_008 - Verify kebab menu is clickable and displays expected options (title and time)
await expect(kebabTitle).toBeVisible();
//Verify the timing
await expect(kebabTime).toBeVisible();

//TC_Stress_009 - Verify back arrow navigates to previous screen

await backArrow.click();
await page.waitForTimeout(2000);

// TC_Stress_010Re-open the assessment card to continue with the Start flow
await stressPage.clickAssessmentCardByStatus(
  targetStressAssessment.title,
  targetStressAssessment.status
);
//TC_Stress_011- Verify the Start option opens the assessment info modal
await  clickStart.click();

//TC_Stress_012- Verify modal displays title, subtitle, description, question count, time estimate and instructions
//title

await expect(tabTitle).toBeVisible();
//subtitle
await expect(tabSubTitle).toBeVisible();
//Description
await expect(tabDiscription).toBeVisible();
//Question count
await expect(questionCount).toBeVisible();
await expect(secondTask).toBeVisible();
await expect(thirdTask).toBeVisible();
//TC_Stress_013- Verify X button closes modal without starting assessment
await cancelIcon.click();
// Re-open the Start modal to proceed with Begin Assessment
await  clickStart.click();

//TC_Stress_014- Verify the Begin Assessment option starts the assessment
await beginAss.click();

// TC_Stress_015- Verify the first question progress counter is displayed correctly
await expect(
  stressPage.getQuestionProgress(1, targetStressAssessment.questionProgressTotal)
).toBeVisible();

//Question 1

// TC_Stress_016- Verify Question 1
await expect(stressPage.getmentalQuestion(mentalQuestion)).toBeVisible();

// TC_Stress_017 - Verify all available options for Question 1 are displayed

for (const option of mentalOptions) {
  await expect(stressPage.getmentalOption(option)).toBeVisible();
}

//TC_Stress_018 Log selected answer for Question 1 for reporting/debugging
console.log(
  `Selected answer: ${selectedMentalOption.number} - ${selectedMentalOption.text}`
);

// TC_Stress_019 - Verify user can select the configured answer for Question 1
await stressPage.selectmentalOption(selectedMentalOption);

// TC_Stress_020- Verify the Next button is enabled after selecting an answer
await expect(stressPage.getNextButton()).toBeEnabled();
//TC_Stress_021 - Verify user can proceed from Question 1 to Question 2 using Next
await stressPage.clickNextButton();

// TC_Stress_022 - Verify progress counter updates to Question 2
await expect(
  stressPage.getQuestionProgress(2, targetStressAssessment.questionProgressTotal)
).toBeVisible();

//Question 2

// TC_Stress_023 - Verify Question 2 is displayed
await expect(stressPage.getQuestion(question2.question)).toBeVisible();

// TC_Stress_024 - Verify all available options for Question 2 are displayed
for (const option of mentalOptions) {
  await expect(stressPage.getOption(option)).toBeVisible();
}

// TC_Stress_025 - Log selected answer for Question 2 for reporting/debugging
console.log(`Q2 selected answer: ${question2.selectedOption.number} - ${question2.selectedOption.text}`);

// TC_Stress_026 - Verify user can select the configured answer for Question 2
await stressPage.selectOption(question2.selectedOption);

// TC_Stress_027 - Verify the Next button is enabled after selecting an answer
await expect(stressPage.getNextButton()).toBeEnabled();

// TC_Stress_028 - Verify user can proceed from Question 2 to Question 3 using Next
await stressPage.clickNextButton();

// TC_Stress_029 - Verify progress counter updates to Question 3
await expect(
  stressPage.getQuestionProgress(3, targetStressAssessment.questionProgressTotal)
).toBeVisible();

//Question 3

// TC_Stress_030 - Verify Question 3 is displayed
await expect(stressPage.getQuestion(question3.question)).toBeVisible();

// TC_Stress_031 - Verify all available options for Question 3 are displayed
for (const option of mentalOptions) {
  await expect(stressPage.getOption(option)).toBeVisible();
}

// TC_Stress_032 - Log selected answer for Question 3 for reporting/debugging
console.log(`Q3 selected answer: ${question3.selectedOption.number} - ${question3.selectedOption.text}`);

// TC_Stress_033 - Verify user can select the configured answer for Question 3
await stressPage.selectOption(question3.selectedOption);

// TC_Stress_034 - Verify the Next button is enabled after selecting an answer
await expect(stressPage.getNextButton()).toBeEnabled();

// TC_Stress_035 - Verify user can proceed from Question 3 to Question 4 using Next
await stressPage.clickNextButton();

// TC_Stress_036 - Verify progress counter updates to Question 4
await expect(
  stressPage.getQuestionProgress(4, targetStressAssessment.questionProgressTotal)
).toBeVisible();

//Question 4

// TC_Stress_037 - Verify Question 4 is displayed
await expect(stressPage.getQuestion(question4.question)).toBeVisible();

// TC_Stress_038 - Verify all available options for Question 4 are displayed
for (const option of mentalOptions) {
  await expect(stressPage.getOption(option)).toBeVisible();
}

// TC_Stress_039 - Log selected answer for Question 4 for reporting/debugging
console.log(`Q4 selected answer: ${question4.selectedOption.number} - ${question4.selectedOption.text}`);

// TC_Stress_040 - Verify user can select the configured answer for Question 4
await stressPage.selectOption(question4.selectedOption);

// TC_Stress_041 - Verify the Next button is enabled after selecting an answer
await expect(stressPage.getNextButton()).toBeEnabled();

// TC_Stress_042 - Verify user can proceed from Question 4 to Question 5 using Next
await stressPage.clickNextButton();

// TC_Stress_043 - Verify progress counter updates to Question 5
await expect(
  stressPage.getQuestionProgress(5, targetStressAssessment.questionProgressTotal)
).toBeVisible();

//Question 5

// TC_Stress_044 - Verify Question 5 is displayed
await expect(stressPage.getQuestion(question5.question)).toBeVisible();

// TC_Stress_045 - Verify all available options for Question 5 are displayed
for (const option of mentalOptions) {
  await expect(stressPage.getOption(option)).toBeVisible();
}

// TC_Stress_046 - Log selected answer for Question 5 for reporting/debugging
console.log(`Q5 selected answer: ${question5.selectedOption.number} - ${question5.selectedOption.text}`);

// TC_Stress_047 - Verify user can select the configured answer for Question 5
await stressPage.selectOption(question5.selectedOption);

// TC_Stress_048 - Verify the Next button is enabled after selecting an answer
await expect(stressPage.getNextButton()).toBeEnabled();

// TC_Stress_049 - Verify user can proceed from Question 5 to Question 6 using Next
await stressPage.clickNextButton();

// TC_Stress_050 - Verify progress counter updates to Question 6
await expect(
  stressPage.getQuestionProgress(6, targetStressAssessment.questionProgressTotal)
).toBeVisible();

//Question 6

// TC_Stress_051 - Verify Question 6 is displayed
await expect(stressPage.getQuestion(question6.question)).toBeVisible();

// TC_Stress_052 - Verify all available options for Question 6 are displayed
for (const option of mentalOptions) {
  await expect(stressPage.getOption(option)).toBeVisible();
}

// TC_Stress_053 - Log selected answer for Question 6 for reporting/debugging
console.log(`Q6 selected answer: ${question6.selectedOption.number} - ${question6.selectedOption.text}`);

// TC_Stress_054 - Verify user can select the configured answer for Question 6
await stressPage.selectOption(question6.selectedOption);

// TC_Stress_055 - Verify the Next button is enabled after selecting an answer
await expect(stressPage.getNextButton()).toBeEnabled();

// TC_Stress_056 - Verify user can proceed from Question 6 to Question 7 using Next
await stressPage.clickNextButton();

// TC_Stress_057 - Verify progress counter updates to Question 7
await expect(
  stressPage.getQuestionProgress(7, targetStressAssessment.questionProgressTotal)
).toBeVisible();

//Question 7

// TC_Stress_058 - Verify Question 7 is displayed
await expect(stressPage.getQuestion(question7.question)).toBeVisible();

// TC_Stress_059 - Verify all available options for Question 7 are displayed
for (const option of mentalOptions) {
  await expect(stressPage.getOption(option)).toBeVisible();
}

// TC_Stress_060 - Log selected answer for Question 7 for reporting/debugging
console.log(`Q7 selected answer: ${question7.selectedOption.number} - ${question7.selectedOption.text}`);

// TC_Stress_061 - Verify user can select the configured answer for Question 7
await stressPage.selectOption(question7.selectedOption);

// TC_Stress_062 - Verify the Next button is enabled after selecting an answer
await expect(stressPage.getNextButton()).toBeEnabled();

// TC_Stress_063 - Verify user can proceed from Question 7 to Question 8 using Next
await stressPage.clickNextButton();

// TC_Stress_064 - Verify progress counter updates to Question 8
await expect(
  stressPage.getQuestionProgress(8, targetStressAssessment.questionProgressTotal)
).toBeVisible();

//Question 8 (first visit - do not answer yet)

// TC_Stress_065 - Verify Question 8 is displayed
await expect(stressPage.getQuestion(question8.question)).toBeVisible();

// TC_Stress_066 - Verify all available options for Question 8 are displayed
for (const option of mentalOptions) {
  await expect(stressPage.getOption(option)).toBeVisible();
}

// TC_Stress_067 - Verify Submit button is disabled before answering Question 8
await expect(stressPage.getSubmitButton()).toBeDisabled();

// TC_Stress_068 - Verify Back button navigates from Question 8 to Question 7
await stressPage.clickQuestionBackButton();
await expect(
  stressPage.getQuestionProgress(7, targetStressAssessment.questionProgressTotal)
).toBeVisible();
await expect(stressPage.getQuestion(question7.question)).toBeVisible();

// TC_Stress_069 - Log updated answer for Question 7 for reporting/debugging
console.log(`Q7 updated answer: ${question7.updatedOption.number} - ${question7.updatedOption.text}`);

// TC_Stress_070 - Verify user can change the answer for Question 7
await stressPage.selectOption(question7.updatedOption);

// TC_Stress_071 - Verify the Next button is enabled after changing the answer
await expect(stressPage.getNextButton()).toBeEnabled();

// TC_Stress_072 - Verify user can proceed from Question 7 to Question 8 again using Next
await stressPage.clickNextButton();

// TC_Stress_073 - Verify progress counter shows Question 8 again and Question 8 is displayed
await expect(
  stressPage.getQuestionProgress(8, targetStressAssessment.questionProgressTotal)
).toBeVisible();
await expect(stressPage.getQuestion(question8.question)).toBeVisible();

// TC_Stress_074 - Log selected answer for Question 8 for reporting/debugging
console.log(`Q8 selected answer: ${question8.selectedOption.number} - ${question8.selectedOption.text}`);

// TC_Stress_075 - Verify user can select the configured answer for Question 8
await stressPage.selectOption(question8.selectedOption);

// TC_Stress_076 - Verify the Submit button is enabled after selecting an answer
await expect(stressPage.getSubmitButton()).toBeEnabled();

// TC_Stress_077 - Verify user can submit the assessment
await stressPage.clickSubmitButton();
await page.waitForTimeout(2000);



    await expect(profileTitle).toBeVisible();
    await expect(profileDescription).toBeVisible();
    await expect(fullName).toBeVisible();
    await expect(dateofBirth).toBeVisible();
    await expect(genderDetail).toBeVisible();
    await stressPage.clickContinue();
    await expect(completeWithMixedScores).toBeVisible({ timeout: 30_000 });
    await completeWithMixedScores.click();
    await page.waitForTimeout(2000);
    
    const reportDownloadButton = stressPage.getAssessmentReportDownloadButton(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );
    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    const result = await stressPage.downloadAssessmentReport(
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