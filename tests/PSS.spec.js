import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { PSSLocators } from '../pages/Locaters/PSS.locators';
import { PSSPage } from '../pages/Pages/PSS.Page';
import loginData from '../testdata/AssloginData.json';
import pssData from '../testdata/PSSData.json';
const LOGIN_URL = 'https://test-assess.liveivory.com/login';

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });


  test('Perceived Stress Scale (PSS-10)', async ({ page }) => {
    test.setTimeout(120_000)
    const pssPage = new PSSPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText =PSSLocators.dashboardText(page);
    const targetPssAssessment = pssData.pssAssessment;
    const assTitle = pssPage.getAssessmentTitleByStatus(
      targetPssAssessment.title,
      targetPssAssessment.status
    );
    
    const kebabTitle= PSSLocators.kebabTitle(page);
    const kebabTime= PSSLocators.kebabTime(page);
    const backArrow= PSSLocators.backArrow(page);
    const  clickStart= PSSLocators.clickStart(page);
    const tabTitle= PSSLocators.tabTitle(page);
    const tabSubTitle =PSSLocators.tabSubTitle(page);
    const tabDiscription=PSSLocators.tabDiscription(page);
    const questionCount= PSSLocators.questionCount(page);
    const cancelIcon = PSSLocators.cancelIcon(page);
    const beginAss= PSSLocators.beginAss(page);  
    //question 1 data
    const unexpectedlyQuestion = pssData.unexpectedlyQuestion;
    const unexpectedlyOptions = pssData.unexpectedlyOptions;
    const selectedUnexpectedlyOption = pssData.selectedunexpectedlyOption;
    //question 2 data
    const controlQuestion = pssData.controlQuestion;
    const controlOptions = pssData.controlOptions;
    const selectedControlOption = pssData.selectedcontrolOption;
    //question 3 data
    const nervousStressedQuestion = pssData.nervousStressedQuestion;
    const nervousStressedOptions = pssData.nervousStressedOptions;
    const selectedNervousStressedOption = pssData.selectednervousStressedOption;
    //question 4 data
    const confidentQuestion = pssData.confidentQuestion;
    const confidentOptions = pssData.confidentOptions;
    const selectedConfidentOption = pssData.selectedconfidentOption;
    //question 5 data
    const goingYourWayQuestion = pssData.goingYourWayQuestion;
    const goingYourWayOptions = pssData.goingYourWayOptions;
    const selectedGoingYourWayOption = pssData.selectedgoingYourWayOption;
    //question 6 data
    const copeQuestion = pssData.copeQuestion;
    const copeOptions = pssData.copeOptions;
    const selectedCopeOption = pssData.selectedcopeOption;
    //question 7 data
    const irritationsQuestion = pssData.irritationsQuestion;
    const irritationsOptions = pssData.irritationsOptions;
    const selectedIrritationsOption = pssData.selectedirritationsOption;
    //question 8 data
    const topOfThingsQuestion = pssData.topOfThingsQuestion;
    const topOfThingsOptions = pssData.topOfThingsOptions;
    const selectedTopOfThingsOption = pssData.selectedtopOfThingsOption;
    //question 9 data
    const angeredQuestion = pssData.angeredQuestion;
    const angeredOptions = pssData.angeredOptions;
    const selectedAngeredOption = pssData.selectedangeredOption;
    //question 10 data
    const pilingUpQuestion = pssData.pilingUpQuestion;
    const pilingUpOptions = pssData.pilingUpOptions;
    const selectedPilingUpOption = pssData.selectedpilingUpOption;
    const updatedPilingUpOption = pssData.updatedpilingUpOption;   
    const completionSummary = pssData.completionSummary;
    //TC_PSS_001 - Verify user can login successfully using a valid phone number and static OTP
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

//TC_PSS_002 - Verify dashboard loads with correct greeting text for logged-in user

await expect(dashboardText).toBeVisible();
//TC_PSS_003 - Verify assessment card displays title, Added on date, partner name and status
await expect(assTitle).toBeVisible();

//verify the assessment created date
const pssAddedOnDate = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
);

await expect(pssAddedOnDate).toHaveText(
  /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
);


//verify the partner name for PSS-10

const pssPartnerName = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "by")][1]'
);

await expect(pssPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

//TC_PSS_004 - Verify new assessment shows "YET TO BE STARTED"/In progress status

await expect(
  pssPage.getAssessmentStatusByTitle(
    targetPssAssessment.title,
    targetPssAssessment.status
  )
).toHaveText(
  targetPssAssessment.status
);

//TC_PSS_005 - Verify clicking assessment card opens intro modal
await pssPage.clickAssessmentCardByStatus(
  targetPssAssessment.title,
  targetPssAssessment.status
);

//TC_PSS_006 - Verify kebab menu is clickable and displays expected options (title and time)
await expect(kebabTitle).toBeVisible();
//Verify the timing
await expect(kebabTime).toBeVisible();

//TC_PSS_007 - Verify back arrow navigates to previous screen

await backArrow.click();
await page.waitForTimeout(2000);

// Re-open the assessment card to continue with the Start flow
await pssPage.clickAssessmentCardByStatus(
  targetPssAssessment.title,
  targetPssAssessment.status
);
//TC_PSS_008 - Verify the Start option opens the assessment info modal
await  clickStart.click();

//TC_PSS_009 - Verify modal displays title, subtitle, description, question count, time estimate and instructions
//title

await expect(tabTitle).toBeVisible();
//subtitle
await expect(tabSubTitle).toBeVisible();
//Description
await expect(tabDiscription).toBeVisible();
//Question count
await expect(questionCount).toBeVisible();
//TC_PSS_010 - Verify X button closes modal without starting assessment
await cancelIcon.click();
// Re-open the Start modal to proceed with Begin Assessment
await  clickStart.click();

//TC_PSS_011 - Verify the Begin Assessment option starts the assessment
await beginAss.click();

// TC_PSS_012 - Verify the first question progress counter is displayed correctly
await expect(
  pssPage.getQuestionProgress(1, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//Question 1

// TC_PSS_013 - Verify Question 1 - Upset because of something unexpected - is displayed
await expect(pssPage.getunexpectedlyQuestion(unexpectedlyQuestion)).toBeVisible();

// TC_PSS_014 - Verify all available options for Question 1 are displayed

for (const option of unexpectedlyOptions) {
  await expect(pssPage.getunexpectedlyOption(option)).toBeVisible();
}

// Log selected answer for Question 1 for reporting/debugging
console.log(
  `Selected answer: ${selectedUnexpectedlyOption.number} - ${selectedUnexpectedlyOption.text}`
);

// TC_PSS_015 - Verify user can select the configured answer for Question 1
await pssPage.selectunexpectedlyOption(selectedUnexpectedlyOption);

// TC_PSS_016 - Verify the Next button is enabled after selecting an answer
await expect(pssPage.getNextButton()).toBeEnabled();
//TC_PSS_017 - Verify user can proceed from Question 1 to Question 2 using Next
await pssPage.clickNextButton();

// TC_PSS_018 - Verify progress counter updates to Question 2
await expect(
  pssPage.getQuestionProgress(2, targetPssAssessment.questionProgressTotal)
).toBeVisible();
//Question 2

// TC_PSS_019 - Verify Question 2 - Unable to control important things in life - is displayed
await expect(pssPage.getcontrolQuestion(controlQuestion)).toBeVisible();

// TC_PSS_020 - Verify all available options for Question 2 are displayed
for (const option of controlOptions) {
  await expect(pssPage.getcontrolOption(option)).toBeVisible();
}

// Log selected answer for Question 2 for reporting/debugging
console.log(`Selected answer: ${selectedControlOption.number} - ${selectedControlOption.text}`);

// TC_PSS_021 - Verify user can select the configured answer for Question 2
await pssPage.selectcontrolOption(selectedControlOption);

// TC_PSS_022 - Verify the Next button is enabled after selecting an answer
await expect(pssPage.getNextButton()).toBeEnabled();
//TC_PSS_023 - Verify user can proceed from Question 2 to Question 3 using Next
await pssPage.clickNextButton();

// TC_PSS_024 - Verify progress counter updates to Question 3
await expect(
  pssPage.getQuestionProgress(3, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//Question 3

// TC_PSS_025 - Verify Question 3 - Felt nervous and stressed - is displayed
await expect(pssPage.getnervousStressedQuestion(nervousStressedQuestion)).toBeVisible();

// TC_PSS_026 - Verify all available options for Question 3 are displayed
for (const option of nervousStressedOptions) {
  await expect(pssPage.getnervousStressedOption(option)).toBeVisible();
}

// Log selected answer for Question 3 for reporting/debugging
console.log(`Selected answer: ${selectedNervousStressedOption.number} - ${selectedNervousStressedOption.text}`);

// TC_PSS_027 - Verify user can select the configured answer for Question 3
await pssPage.selectnervousStressedOption(selectedNervousStressedOption);

// TC_PSS_028 - Verify the Next button is enabled after selecting an answer
await expect(pssPage.getNextButton()).toBeEnabled();
//TC_PSS_029 - Verify user can proceed from Question 3 to Question 4 using Next
await pssPage.clickNextButton();

// TC_PSS_030 - Verify progress counter updates to Question 4
await expect(
  pssPage.getQuestionProgress(4, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//Question 4

// TC_PSS_031 - Verify Question 4 - Confident about ability to handle personal problems - is displayed
await expect(pssPage.getconfidentQuestion(confidentQuestion)).toBeVisible();

// TC_PSS_032 - Verify all available options for Question 4 are displayed
for (const option of confidentOptions) {
  await expect(pssPage.getconfidentOption(option)).toBeVisible();
}

// Log selected answer for Question 4 for reporting/debugging
console.log(`Selected answer: ${selectedConfidentOption.number} - ${selectedConfidentOption.text}`);

// TC_PSS_033 - Verify user can select the configured answer for Question 4
await pssPage.selectconfidentOption(selectedConfidentOption);

// TC_PSS_034 - Verify the Next button is enabled after selecting an answer
await expect(pssPage.getNextButton()).toBeEnabled();
//TC_PSS_035 - Verify user can proceed from Question 4 to Question 5 using Next
await pssPage.clickNextButton();

// TC_PSS_036 - Verify progress counter updates to Question 5
await expect(
  pssPage.getQuestionProgress(5, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//Question 5

// TC_PSS_037 - Verify Question 5 - Felt things were going your way - is displayed
await expect(pssPage.getgoingYourWayQuestion(goingYourWayQuestion)).toBeVisible();

// TC_PSS_038 - Verify all available options for Question 5 are displayed
for (const option of goingYourWayOptions) {
  await expect(pssPage.getgoingYourWayOption(option)).toBeVisible();
}

// Log selected answer for Question 5 for reporting/debugging
console.log(`Selected answer: ${selectedGoingYourWayOption.number} - ${selectedGoingYourWayOption.text}`);

// TC_PSS_039 - Verify user can select the configured answer for Question 5
await pssPage.selectgoingYourWayOption(selectedGoingYourWayOption);

// TC_PSS_040 - Verify the Next button is enabled after selecting an answer
await expect(pssPage.getNextButton()).toBeEnabled();
//TC_PSS_041 - Verify user can proceed from Question 5 to Question 6 using Next
await pssPage.clickNextButton();

// TC_PSS_042 - Verify progress counter updates to Question 6
await expect(
  pssPage.getQuestionProgress(6, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//Question 6

// TC_PSS_043 - Verify Question 6 - Could not cope with all the things you had to do - is displayed
await expect(pssPage.getcopeQuestion(copeQuestion)).toBeVisible();

// TC_PSS_044 - Verify all available options for Question 6 are displayed
for (const option of copeOptions) {
  await expect(pssPage.getcopeOption(option)).toBeVisible();
}

// Log selected answer for Question 6 for reporting/debugging
console.log(`Selected answer: ${selectedCopeOption.number} - ${selectedCopeOption.text}`);

// TC_PSS_045 - Verify user can select the configured answer for Question 6
await pssPage.selectcopeOption(selectedCopeOption);

// TC_PSS_046 - Verify the Next button is enabled after selecting an answer
await expect(pssPage.getNextButton()).toBeEnabled();
//TC_PSS_047 - Verify user can proceed from Question 6 to Question 7 using Next
await pssPage.clickNextButton();

// TC_PSS_048 - Verify progress counter updates to Question 7
await expect(
  pssPage.getQuestionProgress(7, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//Question 7

// TC_PSS_049 - Verify Question 7 - Able to control irritations in life - is displayed
await expect(pssPage.getirritationsQuestion(irritationsQuestion)).toBeVisible();

// TC_PSS_050 - Verify all available options for Question 7 are displayed
for (const option of irritationsOptions) {
  await expect(pssPage.getirritationsOption(option)).toBeVisible();
}

// Log selected answer for Question 7 for reporting/debugging
console.log(`Selected answer: ${selectedIrritationsOption.number} - ${selectedIrritationsOption.text}`);

// TC_PSS_051 - Verify user can select the configured answer for Question 7
await pssPage.selectirritationsOption(selectedIrritationsOption);

// TC_PSS_052 - Verify the Next button is enabled after selecting an answer
await expect(pssPage.getNextButton()).toBeEnabled();
//TC_PSS_053 - Verify user can proceed from Question 7 to Question 8 using Next
await pssPage.clickNextButton();

// TC_PSS_054 - Verify progress counter updates to Question 8
await expect(
  pssPage.getQuestionProgress(8, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//Question 8

// TC_PSS_055 - Verify Question 8 - Felt on top of things - is displayed
await expect(pssPage.gettopOfThingsQuestion(topOfThingsQuestion)).toBeVisible();

// TC_PSS_056 - Verify all available options for Question 8 are displayed
for (const option of topOfThingsOptions) {
  await expect(pssPage.gettopOfThingsOption(option)).toBeVisible();
}

// Log selected answer for Question 8 for reporting/debugging
console.log(`Selected answer: ${selectedTopOfThingsOption.number} - ${selectedTopOfThingsOption.text}`);

// TC_PSS_057 - Verify user can select the configured answer for Question 8
await pssPage.selecttopOfThingsOption(selectedTopOfThingsOption);

// TC_PSS_058 - Verify the Next button is enabled after selecting an answer
await expect(pssPage.getNextButton()).toBeEnabled();
//TC_PSS_059 - Verify user can proceed from Question 8 to Question 9 using Next
await pssPage.clickNextButton();

// TC_PSS_060 - Verify progress counter updates to Question 9
await expect(
  pssPage.getQuestionProgress(9, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//Question 9

// TC_PSS_061 - Verify Question 9 - Angered because of things outside of your control - is displayed
await expect(pssPage.getangeredQuestion(angeredQuestion)).toBeVisible();

// TC_PSS_062 - Verify all available options for Question 9 are displayed
for (const option of angeredOptions) {
  await expect(pssPage.getangeredOption(option)).toBeVisible();
}

// Log selected answer for Question 9 for reporting/debugging
console.log(`Selected answer: ${selectedAngeredOption.number} - ${selectedAngeredOption.text}`);

// TC_PSS_063 - Verify user can select the configured answer for Question 9
await pssPage.selectangeredOption(selectedAngeredOption);

// TC_PSS_064 - Verify the Next button is enabled after selecting an answer
await expect(pssPage.getNextButton()).toBeEnabled();
//TC_PSS_065 - Verify user can proceed from Question 9 to Question 10 using Next
await pssPage.clickNextButton();

// TC_PSS_066 - Verify progress counter updates to Question 10
await expect(
  pssPage.getQuestionProgress(10, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//Question 10

// TC_PSS_067 - Verify Question 10 - Difficulties piling up so high they could not be overcome - is displayed
await expect(pssPage.getpilingUpQuestion(pilingUpQuestion)).toBeVisible();

// TC_PSS_068 - Verify all available options for Question 10 are displayed
for (const option of pilingUpOptions) {
  await expect(pssPage.getpilingUpOption(option)).toBeVisible();
}

// Log selected answer for Question 10 for reporting/debugging
console.log(`Selected answer: ${selectedPilingUpOption.number} - ${selectedPilingUpOption.text}`);

// TC_PSS_069 - Verify user can select the configured answer for Question 10
await pssPage.selectpilingUpOption(selectedPilingUpOption);

// TC_PSS_070 - Verify the Submit button is enabled after answering the final question
await expect(pssPage.getSubmitButton()).toBeEnabled();

//TC_PSS_071 - Verify user can navigate back from Question 10 to Question 9 and re-confirm the answer

await pssPage.clickQuestionBackButton();

await expect(
  pssPage.getQuestionProgress(9, targetPssAssessment.questionProgressTotal)
).toBeVisible();

await expect(pssPage.getangeredQuestion(angeredQuestion)).toBeVisible();

console.log(`Re-confirmed answer: ${selectedAngeredOption.number} - ${selectedAngeredOption.text}`);

await pssPage.selectangeredOption(selectedAngeredOption);

await expect(pssPage.getNextButton()).toBeEnabled();
// Proceed back to Question 10 after re-confirming the Question 9 answer
await pssPage.clickNextButton();

await expect(
  pssPage.getQuestionProgress(10, targetPssAssessment.questionProgressTotal)
).toBeVisible();

//TC_PSS_072 - Verify user can update the answer for Question 10 and submit the assessment

await expect(pssPage.getpilingUpQuestion(pilingUpQuestion)).toBeVisible();

console.log(`Updated answer: ${updatedPilingUpOption.number} - ${updatedPilingUpOption.text}`);

await pssPage.selectpilingUpOption(updatedPilingUpOption);

await expect(pssPage.getSubmitButton()).toBeEnabled();
await pssPage.clickSubmitButton();

// TC_PSS_073 - Verify assessment submission confirmation is displayed after successful submission
await expect(
  page.getByRole('alert').filter({
    hasText: 'Assessment Submitted',
  })
).toBeVisible();

//TC_PSS_074 - Refresh current page to load Assessment and Assessment Report cards
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_PSS_075 - Verify completed assessment card displays the expected completion status
await expect(
  pssPage.getAssessmentStatusByTitle(
    completionSummary.assessmentTitle,
    completionSummary.status
  )
).toHaveText(completionSummary.status);
await backArrow.click();
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_PSS_076 - On the dashboard, open the first PSS card with Completed status
const firstCompletedPssAssessment = pssData.firstCompletedPssAssessment;

await expect(
  pssPage.getAssessmentStatusByTitle(
    firstCompletedPssAssessment.title,
    firstCompletedPssAssessment.status
  )
).toHaveText(firstCompletedPssAssessment.status);

await pssPage.clickAssessmentCardByStatus(
  firstCompletedPssAssessment.title,
  firstCompletedPssAssessment.status
);

// TC_PSS_077 - Download the report from the completed PSS assessment page
const assessmentReport = pssData.assessmentReport;
const downloadButton = pssPage.getAssessmentReportDownloadButton(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);

await expect(downloadButton).toBeVisible();
await expect(downloadButton).toBeEnabled();

await pssPage.clickAssessmentReportDownload(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);
await page.waitForTimeout(6000);
 // waits until the download is finished
await page.close();

})
})