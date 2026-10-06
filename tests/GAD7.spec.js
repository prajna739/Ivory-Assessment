import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { GAD7Locators } from '../pages/Locaters/GAD7.locators';
import { GAD7Page } from '../pages/Pages/GAD7.Page';
import loginData from '../testdata/AssloginData.json';
import gad7Data from '../testdata/GAD7Data.json';
const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });


  test('GAD-7 Anxiety Assessment', async ({ page }) => {
    test.setTimeout(120_000)
    const gad7Page = new GAD7Page(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText =GAD7Locators.dashboardText(page);
    const targetGad7Assessment = gad7Data.gad7Assessment;
    const assTitle = gad7Page.getAssessmentTitleByStatus(
      targetGad7Assessment.title,
      targetGad7Assessment.status
    );
    
    const kebabTitle= GAD7Locators.kebabTitle(page);
    const kebabTime= GAD7Locators.kebabTime(page);
    const backArrow= GAD7Locators.backArrow(page);
    const  clickStart= GAD7Locators. clickStart(page);
    const tabTitle= GAD7Locators.tabTitle(page);
    const tabSubTitle =GAD7Locators.tabSubTitle(page);
    const tabDiscription=GAD7Locators.tabDiscription(page);
    const questionCount= GAD7Locators.questionCount(page);
    const cancelIcon = GAD7Locators.cancelIcon(page);
    const beginAss= GAD7Locators.beginAss(page);

    //question1 data
    const question = gad7Data.nervousQuestion;
    const options = gad7Data.nervousOptions;
    const selectedOption = gad7Data.selectedNervousOption;
    const nextButton= GAD7Locators.nextButton(page); 
    //question 2 data
    const controlQuestion = gad7Data.controlQuestion;
    const controlOptions = gad7Data.controlOptions;
    const selectedControlOption = gad7Data.selectedcontrolOption;
    //question 3 data
    const botheredQuestion = gad7Data.botheredQuestion;
    const botheredOptions = gad7Data.botheredOptions;
    const selectedbotheredOption = gad7Data.selectedbotheredOption;
    //question 4 data
    const relaxingQuestion = gad7Data.relaxingQuestion;
    const relaxingOptions = gad7Data.relaxingOptions;
    const selectedrelaxingOption = gad7Data.selectedrelaxingOption;
    //question 5 data
    const restlessQuestion = gad7Data.restlessQuestion;
    const restlessOptions = gad7Data.restlessOptions;
    const selectedrestlessOption = gad7Data.selectedrestlessOption;
    //question 6 data
    const irritableQuestion = gad7Data.irritableQuestion;
    const irritableOptions = gad7Data.irritableOptions;
    const selectedirritableOption = gad7Data.selectedirritableOption;
    //question 7 data
    const afraidQuestion = gad7Data.afraidQuestion;
    const afraidOptions = gad7Data.afraidOptions;
    const selectedafraidOption = gad7Data.selectedafraidOption;

    //back button
    const backButton = GAD7Locators.backButton(page); 
    //change the 7th question option
    const afraidOptions2 = gad7Data.afraidOptions2;
    const selectedafraidOption2 = gad7Data.selectedafraidOption2;
    //question 8 data
    const difficultQuestion = gad7Data.difficultQuestion;
    const difficultOptions = gad7Data.difficultOptions;
    const selecteddifficultOption = gad7Data.selecteddifficultOption;
    const completionSummary = gad7Data.completionSummary;



    //Login to the application
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

await page.waitForTimeout(2000);

//TC_GAD7_001-Verify dashboard loads with correct greeting text for logged-in user

await expect(dashboardText).toBeVisible();

//TC_GAD7_002-Verify assessment card displays title, Added on date, partner name and status
await expect(assTitle).toBeVisible();

//TC_GAD7_003_verify the assessment created date
const gad7AddedOnDate = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
);

await expect(gad7AddedOnDate).toHaveText(
  /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
);


//TC_GAD7_004_verify the partner name for GAD7

const gad7PartnerName = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "by")][1]'
);

await expect(gad7PartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

//TC_GAD7_005-Verify new assessment shows "YET TO BE STARTED"/In progress

await expect(
  gad7Page.getAssessmentStatusByTitle(
    targetGad7Assessment.title,
    targetGad7Assessment.status
  )
).toHaveText(
  targetGad7Assessment.status
);

//TC_GAD7_006-Verify clicking assessment card opens intro modal
await gad7Page.clickAssessmentCardByStatus(
  targetGad7Assessment.title,
  targetGad7Assessment.status
);

//TC_GAD7_007-Verify kebab menu is clickable and displays expected options
await expect(kebabTitle).toBeVisible();
//Verify the timing
await expect(kebabTime).toBeVisible();

//TC_GAD7_008-Verify back arrow navigates to previous screen

await backArrow.click();
await page.waitForTimeout(2000);

await gad7Page.clickAssessmentCardByStatus(
  targetGad7Assessment.title,
  targetGad7Assessment.status
);
//TC_GAD7_009-Verify the start option
await  clickStart.click();

//TC_GAD7_010-Verify modal displays title, subtitle, description, question count, time estimate and instructions
//title

await expect(tabTitle).toBeVisible();
//subtitle
await expect(tabSubTitle).toBeVisible();
//Description
await expect(tabDiscription).toBeVisible();
//Question count
await expect(questionCount).toBeVisible();
//TC_GAD7_011-Verify X button closes modal without starting assessment
await cancelIcon.click();
await  clickStart.click();

//TC_GAD7_012-Verify the begin assessment option
await beginAss.click();

// TC_GAD7_013-Verify the first question progress counter.
await expect(
  gad7Page.getQuestionProgress(1, targetGad7Assessment.questionProgressTotal)
).toBeVisible();
//question 1
// TC_GAD7_014-Verify Question 1
await expect(gad7Page.getnervousQuestion(question)).toBeVisible();

// TC_GAD7_015-Verify all available options for question  1

for (const optionNumber of options) {
  await expect(gad7Page.getnervousOption(optionNumber)).toBeVisible();
}

// TC_GAD7_016-Verify user can select the configured answer for Question 1.
// Keeps the data meaning available for reporting/debugging.
console.log(
  `Selected answer: ${selectedOption.number} - ${selectedOption.text}`
);

// TC_GAD7_017-Verify selected option for question 1
await gad7Page.selectnervousOption(selectedOption);

// TC_GAD7_015-Verify the next buton is enabled
await expect(gad7Page.getNextButton()).toBeEnabled();
await gad7Page.clickNextButton();
//TC_GAD7_016_Verify user can proceed from Question 1 to Question 2 using Next.
await expect(
  gad7Page.getQuestionProgress(2, targetGad7Assessment.questionProgressTotal)
).toBeVisible();

//Question 2

// TC_gad7_017-Verify Question 2
await expect(gad7Page.getcontrolQuestion(controlQuestion)).toBeVisible();

// TC_GAD7_018-Verify all available options for question  2

for (const option of controlOptions) {
  await expect(gad7Page.getcontrolOption(option)).toBeVisible();
}

// TC_GAD7_019-Verify user can select the configured answer for Question 2
console.log(
  `Selected answer: ${selectedControlOption.number} - ${selectedControlOption.text}`
);

// TC_GAD7_020-Verify selected option for question 2
await gad7Page.selectcontrolOption(selectedControlOption);

// TC_GAD7_021-Verify the next buton is enabled
await expect(gad7Page.getNextButton()).toBeEnabled();

await gad7Page.clickNextButton();
//TC_GAD7_022_Verify user can proceed from Question 2 to Question 3 using Next.
await expect(
  gad7Page.getQuestionProgress(3, targetGad7Assessment.questionProgressTotal)
).toBeVisible();

//Question 3

// TC_GAD7L_023-Verify Question 3
await expect(gad7Page.getbotheredQuestion(botheredQuestion)).toBeVisible();

// TC_GAD7_024-Verify all available options for question  3

for (const option of botheredOptions) {
  await expect(gad7Page.getbotheredOption(option)).toBeVisible();
}

// TC_GAD7_025-Verify user can select the configured answer for Question 3
console.log(
  `Selected answer: ${selectedbotheredOption.number} - ${selectedbotheredOption.text}`
);

// TC_GAD7_026-Verify selected option for question 3
await gad7Page.selectbotheredOption(selectedbotheredOption);

// TC_GAD7_027-Verify the next buton is enabled
await expect(gad7Page.getNextButton()).toBeEnabled();
await gad7Page.clickNextButton();
//TC_GAD7_028_Verify user can proceed from Question 3 to Question 4 using Next.
await expect(
  gad7Page.getQuestionProgress(4, targetGad7Assessment.questionProgressTotal)
).toBeVisible();

//Question 4

// TC_GAD7_029-Verify Question 4
await expect(gad7Page.getrelaxingQuestion(relaxingQuestion)).toBeVisible();

// TC_GAD7_030-Verify all available options for question  4

for (const option of relaxingOptions) {
  await expect(gad7Page.getrelaxingOption(option)).toBeVisible();
}

// TC_GAD7_031-Verify user can select the configured answer for Question 4.
console.log(
  `Selected answer: ${selectedrelaxingOption.number} - ${selectedrelaxingOption.text}`
);

// TC_GAD7_032-Verify selected option for question 4
await gad7Page.selectrelaxingOption(selectedrelaxingOption);

// TC_GAD7_033-Verify the next buton is enabled
await expect(gad7Page.getNextButton()).toBeEnabled();

await gad7Page.clickNextButton();
//TC_GAD7_034_Verify user can proceed from Question 4 to Question 5 using Next.
await expect(
  gad7Page.getQuestionProgress(5, targetGad7Assessment.questionProgressTotal)
).toBeVisible();

//Question 5

// TC_GAD7_035-Verify Question 5
await expect(gad7Page.getrestlessQuestion(restlessQuestion)).toBeVisible();

// TC_GAD7_036-Verify all available options for question  5

for (const option of restlessOptions) {
  await expect(gad7Page.getrestlessOption(option)).toBeVisible();
}

// TC_GAD7_037-Verify user can select the configured answer for Question 5.
console.log(
  `Selected answer: ${selectedrestlessOption.number} - ${selectedrestlessOption.text}`
);

// TC_GAD7_038-Verify selected option for question 5
await gad7Page.selectrestlessOption(selectedrestlessOption);

// TC_GAD7_039-Verify the next buton is enabled
await expect(gad7Page.getNextButton()).toBeEnabled();
await gad7Page.clickNextButton();
//TC_GAD7_040_Verify user can proceed from Question 5 to Question 6 using Next.
await expect(
  gad7Page.getQuestionProgress(6, targetGad7Assessment.questionProgressTotal)
).toBeVisible();

//Question 6

// TC_GAD7_041-Verify Question 6
await expect(gad7Page.getirritableQuestion(irritableQuestion)).toBeVisible();

// TC_GAD7_042-Verify all available options for question  6

for (const option of irritableOptions) {
  await expect(gad7Page.getirritableOption(option)).toBeVisible();
}

// TC_GAD7_043-Verify user can select the configured answer for Question 6

console.log(
  `Selected answer: ${selectedirritableOption.number} - ${selectedirritableOption.text}`
);

// TC_GAD7_044-Verify selected option for question 6
await gad7Page.selectirritableOption(selectedirritableOption);

// TC_GAD7_045-Verify the next buton is enabled
await expect(gad7Page.getNextButton()).toBeEnabled();

await gad7Page.clickNextButton();
//TC_GAD7_046_Verify user can proceed from Question 6 to Question 7 using Next.
await expect(
  gad7Page.getQuestionProgress(7, targetGad7Assessment.questionProgressTotal)
).toBeVisible();

//Question 7

// TC_GAD7_047-Verify Question 7
await expect(gad7Page.getafraidQuestion(afraidQuestion)).toBeVisible();

// TC_GAD7_048-Verify all available options for question  7

for (const option of afraidOptions) {
  await expect(gad7Page.getafraidOption(option)).toBeVisible();
}

// TC_GAD7_049-Verify user can select the configured answer for Question 7
console.log(
  `Selected answer: ${selectedafraidOption.number} - ${selectedafraidOption.text}`
);

// TC_GAD7_050-Verify selected option for question 7
await gad7Page.selectafraidOption(selectedafraidOption);

// TC_GAD7_051-Verify the next buton is enabled
await expect(gad7Page.getNextButton()).toBeEnabled();

await gad7Page.clickNextButton();
//TC_GAD7_052_Verify user can proceed from Question 7 to Question 8 using Next.
await expect(
  gad7Page.getQuestionProgress(8, targetGad7Assessment.questionProgressTotal)
).toBeVisible();

await backButton.click();

//TC_GAD7_053-Verify Question 7 is displayed after navigating backward from Question 8.
await expect(gad7Page.getafraidQuestion(afraidQuestion)).toBeVisible();

// TC_GAD7_054-Verify user can select the configured answer for Question 7.
// Keeps the data meaning available for reporting/debugging.
console.log(
  `Selected answer: ${selectedafraidOption2.number} - ${selectedafraidOption2.text}`
);

// TC_GAD7_055-Verify selected option for question 7
await gad7Page.selectafraidOption2(selectedafraidOption2);

// TC_GAD7_056-Verify the next buton is enabled
await expect(gad7Page.getNextButton()).toBeEnabled();
//TC_GAD7_057_Verify user can proceed from Question 1 to Question 2 using Next.
await gad7Page.clickNextButton();


//Question 8

// TC_GAD7_058-Verify Question 8
await expect(gad7Page.getdifficultQuestion(difficultQuestion)).toBeVisible();

// TC_GAD7_059-Verify all available options for question  8

for (const option of difficultOptions) {
  await expect(gad7Page.getdifficultOption(option)).toBeVisible();
}

// TC_GAD7_060-Verify user can select the configured answer for Question 8.
// Keeps the data meaning available for reporting/debugging.
console.log(
  `Selected answer: ${selecteddifficultOption.number} - ${selecteddifficultOption.text}`
);

// TC_GAD7_061-Verify selected option for question 8
await gad7Page.selectdifficultOption(selecteddifficultOption);

// TC_GAD7_062-Verify the next buton is enabled
await expect(gad7Page.getSubmitButton()).toBeEnabled();


// TC_GAD7_063-Verify user can submit the completed assessment.
await gad7Page.clickSubmitButton();

// TC_GAD7_064-Verify assessment submission confirmation is displayed after successful submission.
await expect(
  page.getByRole('alert').filter({
    hasText: 'Assessment Submitted',
  })
).toBeVisible();

//TC_GAD7_065- Refresh current page to load Assessment and Assessment Report cards.
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_GAD7_066-Verify completed assessment card displays the expected completion status.
await expect(
  gad7Page.getAssessmentStatusByTitle(
    completionSummary.assessmentTitle,
    completionSummary.status
  )
).toHaveText(completionSummary.status);
await page.waitForTimeout(6000);

await backArrow.click();
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_GAD7_067 - Open the first completed GAD7 assessment from the dashboard.
const firstCompletedGad7Assessment = gad7Data.firstCompletedGad7Assessment;

await expect(
  gad7Page.getAssessmentStatusByTitle(
    firstCompletedGad7Assessment.title,
    firstCompletedGad7Assessment.status
  )
).toHaveText(firstCompletedGad7Assessment.status);

await gad7Page.clickAssessmentCardByStatus(
  firstCompletedGad7Assessment.title,
  firstCompletedGad7Assessment.status
);

// TC_GAD7_068 - Download the completed assessment report.
const assessmentReport = gad7Data.assessmentReport;
const downloadButton = gad7Page.getAssessmentReportDownloadButton(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);

await expect(downloadButton).toBeVisible();
await expect(downloadButton).toBeEnabled();

await gad7Page.clickAssessmentReportDownload(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);
await page.waitForTimeout(6000);

await page.close();














  });
});
