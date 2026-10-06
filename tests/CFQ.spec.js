import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { CFQLocators } from '../pages/Locaters/CFQ.locators';
import { CFQPage } from '../pages/Pages/CFQ.Page';
import loginData from '../testdata/AssloginData.json';
import cfqData from '../testdata/CFQData.json';
const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });


  test('Cognitive Failure Check (CFQ 2.0)', async ({ page }) => {
    test.setTimeout(120_000)
    const cfqPage = new CFQPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText =CFQLocators.dashboardText(page);
    const targetCfqAssessment = cfqData.cfqAssessment;
    const assTitle = cfqPage.getAssessmentTitleByStatus(
      targetCfqAssessment.title,
      targetCfqAssessment.status
    );
    
    const kebabTitle= CFQLocators.kebabTitle(page);
    const kebabTime= CFQLocators.kebabTime(page);
    const backArrow= CFQLocators.backArrow(page);
    const  clickStart= CFQLocators.clickStart(page);
    const tabTitle= CFQLocators.tabTitle(page);
    const tabSubTitle =CFQLocators.tabSubTitle(page);
    const tabDiscription=CFQLocators.tabDiscription(page);
    const questionCount= CFQLocators.questionCount(page);
    const cancelIcon = CFQLocators.cancelIcon(page);
    const beginAss= CFQLocators.beginAss(page);
    //question 1 data
    const forgetQuestion = cfqData.forgetQuestion;
    const forgetOptions = cfqData.forgetOptions;
    const selectedForgetOption = cfqData.selectedforgetOption;
    //question 2 data
    const doorQuestion = cfqData.doorQuestion;
    const doorOptions = cfqData.doorOptions;
    const selectedDoorOption = cfqData.selecteddoorOption;
    //question 3 data
const hearQuestion = cfqData.hearQuestion;
const hearOptions = cfqData.hearOptions;
const selectedHearOption = cfqData.selectedhearOption;
//question 4 data
const appointmentQuestion = cfqData.appointmentQuestion;
const appointmentOptions = cfqData.appointmentOptions;
const selectedAppointmentOption = cfqData.selectedappointmentOption;
//question 5 data
const throwQuestion = cfqData.throwQuestion;
const throwOptions = cfqData.throwOptions;
const selectedThrowOption = cfqData.selectedthrowOption;
//question 6 data
const shopsQuestion = cfqData.shopsQuestion;
const shopsOptions = cfqData.shopsOptions;
const selectedShopsOption = cfqData.selectedshopsOption;
//question 7 data
const keysQuestion = cfqData.keysQuestion;
const keysOptions = cfqData.keysOptions;
const selectedKeysOption = cfqData.selectedkeysOption;
//question 8 data
const passwordsQuestion = cfqData.passwordsQuestion;
const passwordsOptions = cfqData.passwordsOptions;
const selectedPasswordsOption = cfqData.selectedpasswordsOption;
//question 9 data
const deliveryQuestion = cfqData.deliveryQuestion;
const deliveryOptions = cfqData.deliveryOptions;
const selectedDeliveryOption = cfqData.selecteddeliveryOption;
//question 10 data
const nameQuestion = cfqData.nameQuestion;
const nameOptions = cfqData.nameOptions;
const selectedNameOption = cfqData.selectednameOption;
//question 11 data
const namesInConvoQuestion = cfqData.namesInConvoQuestion;
const namesInConvoOptions = cfqData.namesInConvoOptions;
const selectedNamesInConvoOption = cfqData.selectednamesInConvoOption;
//question 12 data
const datesQuestion = cfqData.datesQuestion;
const datesOptions = cfqData.datesOptions;
const selectedDatesOption = cfqData.selecteddatesOption;
//question 13 data
const wrongPlaceQuestion = cfqData.wrongPlaceQuestion;
const wrongPlaceOptions = cfqData.wrongPlaceOptions;
const selectedWrongPlaceOption = cfqData.selectedwrongPlaceOption;
//question 14 data
const leaveHomeQuestion = cfqData.leaveHomeQuestion;
const leaveHomeOptions = cfqData.leaveHomeOptions;
const selectedLeaveHomeOption = cfqData.selectedleaveHomeOption;
//back button
const backButton = CFQLocators.backButton(page); 
 //change the 14th question option
const selectedleaveHomeOption2 = cfqData.selectedleaveHomeOption2;
//question 15 data
const missingQuestion = cfqData.missingQuestion;
const missingOptions = cfqData.missingOptions;
const selectedMissingOption = cfqData.selectedmissingOption;
const completionSummary = cfqData.completionSummary;
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

//TC_CFQ_001-Verify dashboard loads with correct greeting text for logged-in user

await expect(dashboardText).toBeVisible();
//TC_CFQ_002-Verify assessment card displays title, Added on date, partner name and status
await expect(assTitle).toBeVisible();

//verify the assessment created date
const cfqAddedOnDate = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
);

await expect(cfqAddedOnDate).toHaveText(
  /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
);


//verify the partner name for IADL

const cfqPartnerName = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "by")][1]'
);

await expect(cfqPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

//TC_CFQ_003-Verify new assessment shows "YET TO BE STARTED"/In progress

await expect(
  cfqPage.getAssessmentStatusByTitle(
    targetCfqAssessment.title,
    targetCfqAssessment.status
  )
).toHaveText(
  targetCfqAssessment.status
);

//TC_CFQ_004-Verify clicking assessment card opens intro modal
await cfqPage.clickAssessmentCardByStatus(
  targetCfqAssessment.title,
  targetCfqAssessment.status
);

//TC_CFQ_005-Verify kebab menu is clickable and displays expected options
await expect(kebabTitle).toBeVisible();
//Verify the timing
await expect(kebabTime).toBeVisible();

//TC_CFQ_006-Verify back arrow navigates to previous screen

await backArrow.click();
await page.waitForTimeout(2000);

await cfqPage.clickAssessmentCardByStatus(
  targetCfqAssessment.title,
  targetCfqAssessment.status
);
//TC_CFQ_007-Verify the start option
await  clickStart.click();

//TC_CFQ_008-Verify modal displays title, subtitle, description, question count, time estimate and instructions
//title

await expect(tabTitle).toBeVisible();
//subtitle
await expect(tabSubTitle).toBeVisible();
//Description
await expect(tabDiscription).toBeVisible();
//Question count
await expect(questionCount).toBeVisible();
//TC_CFQ_009-Verify X button closes modal without starting assessment
await cancelIcon.click();
await  clickStart.click();

//TC_CFQ_010-Verify the begin assessment option
await beginAss.click();

// TC_CFQ_011-Verify the first question progress counter.
await expect(
  cfqPage.getQuestionProgress(1, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 1

// TC_CFQ_011-Verify Question 1 - Do you find you forget why you went from one part of the house to the other?
await expect(cfqPage.getforgetQuestion(forgetQuestion)).toBeVisible();

// TC_CFQ_012-Verify all available options for question  1

for (const option of forgetOptions) {
  await expect(cfqPage.getforgetOption(option)).toBeVisible();
}

// TC_CFQ_013-Verify user can select the configured answer for Question 1.

console.log(
  `Selected answer: ${selectedForgetOption.number} - ${selectedForgetOption.text}`
);

// TC_CFQ_014-Verify selected option for question 1
await cfqPage.selectforgetOption(selectedForgetOption);

// TC_CFQ_015-Verify the next buton is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
//TC_CFQ_016_Verify user can proceed from Question 1 to Question 2 using Next.
await cfqPage.clickNextButton();
//TC_CFQ_017_Verify the progress bar
await expect(
  cfqPage.getQuestionProgress(2, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 2

// TC_CFQ_018-Verify Question 2 - Do you find you forget whether you've turned off a light or a fire or locked the door?
await expect(cfqPage.getdoorQuestion(doorQuestion)).toBeVisible();

// TC_CFQ_019-Verify all available options for question  2

for (const option of doorOptions) {
  await expect(cfqPage.getdoorOption(option)).toBeVisible();
}

// TC_CFQ_020-Verify user can select the configured answer for Question 2.
// Keeps the data meaning available for reporting/debugging.
console.log(
  `Selected answer: ${selectedDoorOption.number} - ${selectedDoorOption.text}`
);

// TC_CFQ_021-Verify selected option for question 2
await cfqPage.selectdoorOption(selectedDoorOption);

// TC_CFQ_022-Verify the next buton is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
//TC_CFQ_023_Verify user can proceed from Question 2 to Question 3 using Next.
await cfqPage.clickNextButton();

await expect(
  cfqPage.getQuestionProgress(3, targetCfqAssessment.questionProgressTotal)
).toBeVisible();
await page.waitForTimeout(2000);

//Question 3
// TC_CFQ_024-Verify Question 3
await expect(cfqPage.gethearQuestion(hearQuestion)).toBeVisible();
// TC_CFQ_025-Verify all available options for question  3
for (const option of hearOptions) {
  await expect(cfqPage.gethearOption(option)).toBeVisible();
}
// TC_CFQ_026-Verify user can select the configured answer for Question 3
console.log(`Selected answer: ${selectedHearOption.number} - ${selectedHearOption.text}`);
// TC_CFQ_027-Verify selected option for question 3
await cfqPage.selecthearOption(selectedHearOption);
// TC_CFQ_028-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_029_Verify user can proceed from Question 3 to Question 4 using Next.
await expect(
  cfqPage.getQuestionProgress(4, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 4
// TC_CFQ_030-Verify Question 4
await expect(cfqPage.getappointmentQuestion(appointmentQuestion)).toBeVisible();
// TC_CFQ_031-Verify all available options for question  4
for (const option of appointmentOptions) {
  await expect(cfqPage.getappointmentOption(option)).toBeVisible();
}
// TC_CFQ_032-Verify user can select the configured answer for Question 4.
console.log(`Selected answer: ${selectedAppointmentOption.number} - ${selectedAppointmentOption.text}`);
// TC_CFQ_033-Verify selected option for question 4
await cfqPage.selectappointmentOption(selectedAppointmentOption);
// TC_CFQ_034-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_035_Verify user can proceed from Question 4 to Question 5 using Next.
await expect(
  cfqPage.getQuestionProgress(5, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 5
// TC_CFQ_036-Verify Question 5
await expect(cfqPage.getthrowQuestion(throwQuestion)).toBeVisible();
// TC_CFQ_037-Verify all available options for question  5
for (const option of throwOptions) {
  await expect(cfqPage.getthrowOption(option)).toBeVisible();
}
// TC_CFQ_038-Verify user can select the configured answer for Question 5
console.log(`Selected answer: ${selectedThrowOption.number} - ${selectedThrowOption.text}`);
// TC_CFQ_039-Verify selected option for question 5
await cfqPage.selectthrowOption(selectedThrowOption);
// TC_CFQ_040-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_041_Verify user can proceed from Question 5 to Question 6 using Next.
await expect(
  cfqPage.getQuestionProgress(6, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 6
// TC_CFQ_042-Verify Question 6
await expect(cfqPage.getshopsQuestion(shopsQuestion)).toBeVisible();
// TC_CFQ_043-Verify all available options for question  6
for (const option of shopsOptions) {
  await expect(cfqPage.getshopsOption(option)).toBeVisible();
}
// TC_CFQ_044-Verify user can select the configured answer for Question 6.
console.log(`Selected answer: ${selectedShopsOption.number} - ${selectedShopsOption.text}`);
// TC_CFQ_045-Verify selected option for question 6
await cfqPage.selectshopsOption(selectedShopsOption);
// TC_CFQ_046-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_047_Verify user can proceed from Question 2 to Question 3 using Next.
await expect(
  cfqPage.getQuestionProgress(7, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 7
// TC_CFQ_048-Verify Question 7
await expect(cfqPage.getkeysQuestion(keysQuestion)).toBeVisible();
// TC_CFQ_049-Verify all available options for question  7
for (const option of keysOptions) {
  await expect(cfqPage.getkeysOption(option)).toBeVisible();
}
// TC_CFQ_050-Verify user can select the configured answer for Question 7
console.log(`Selected answer: ${selectedKeysOption.number} - ${selectedKeysOption.text}`);
// TC_CFQ_051-Verify selected option for question 7
await cfqPage.selectkeysOption(selectedKeysOption);
// TC_CFQ_052-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_053_Verify user can proceed from Question 7 to Question 8 using Next.
await expect(
  cfqPage.getQuestionProgress(8, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 8
// TC_CFQ_054-Verify Question 8
await expect(cfqPage.getpasswordsQuestion(passwordsQuestion)).toBeVisible();
// TC_CFQ_055-Verify all available options for question  9
for (const option of passwordsOptions) {
  await expect(cfqPage.getpasswordsOption(option)).toBeVisible();
}
// TC_CFQ_056-Verify user can select the configured answer for Question 9.
console.log(`Selected answer: ${selectedPasswordsOption.number} - ${selectedPasswordsOption.text}`);
// TC_CFQ_057-Verify selected option for question 9
await cfqPage.selectpasswordsOption(selectedPasswordsOption);
// TC_CFQ_058-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_059_Verify user can proceed from Question 8 to Question 9 using Next.
await expect(
  cfqPage.getQuestionProgress(9, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 9
// TC_CFQ_060-Verify Question 9
await expect(cfqPage.getdeliveryQuestion(deliveryQuestion)).toBeVisible();
// TC_CFQ_061-Verify all available options for question  9
for (const option of deliveryOptions) {
  await expect(cfqPage.getdeliveryOption(option)).toBeVisible();
}
// TC_CFQ_062-Verify user can select the configured answer for Question 9

console.log(`Selected answer: ${selectedDeliveryOption.number} - ${selectedDeliveryOption.text}`);
// TC_CFQ_063-Verify selected option for question 9
await cfqPage.selectdeliveryOption(selectedDeliveryOption);
// TC_CFQ_064-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_065_Verify user can proceed from Question 2 to Question 3 using Next.
await expect(
  cfqPage.getQuestionProgress(10, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 10
// TC_CFQ_066-Verify Question 10
await expect(cfqPage.getnameQuestion(nameQuestion)).toBeVisible();
// TC_CFQ_067-Verify all available options for question  10
for (const option of nameOptions) {
  await expect(cfqPage.getnameOption(option)).toBeVisible();
}
// TC_CFQ_068-Verify user can select the configured answer for Question 10.
console.log(`Selected answer: ${selectedNameOption.number} - ${selectedNameOption.text}`);
// TC_CFQ_069-Verify selected option for question 10
await cfqPage.selectnameOption(selectedNameOption);
// TC_CFQ_070-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_071_Verify user can proceed from Question 2 to Question 3 using Next.
await expect(
  cfqPage.getQuestionProgress(11, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 11
// TC_CFQ_072-Verify Question 11
await expect(cfqPage.getnamesInConvoQuestion(namesInConvoQuestion)).toBeVisible();
// TC_CFQ_073-Verify all available options for question  11
for (const option of namesInConvoOptions) {
  await expect(cfqPage.getnamesInConvoOption(option)).toBeVisible();
}
// TC_CFQ_074-Verify user can select the configured answer for Question 11
console.log(`Selected answer: ${selectedNamesInConvoOption.number} - ${selectedNamesInConvoOption.text}`);
// TC_CFQ_075-Verify selected option for question 11
await cfqPage.selectnamesInConvoOption(selectedNamesInConvoOption);
// TC_CFQ_076-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_077_Verify user can proceed from Question 11 to Question 12 using Next.
await expect(
  cfqPage.getQuestionProgress(12, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 12
// TC_CFQ_078-Verify Question 12
await expect(cfqPage.getdatesQuestion(datesQuestion)).toBeVisible();
// TC_CFQ_079-Verify all available options for question  12
for (const option of datesOptions) {
  await expect(cfqPage.getdatesOption(option)).toBeVisible();
}
// TC_CFQ_080-Verify user can select the configured answer for Question 12
console.log(`Selected answer: ${selectedDatesOption.number} - ${selectedDatesOption.text}`);
// TC_CFQ_081-Verify selected option for question 12
await cfqPage.selectdatesOption(selectedDatesOption);
// TC_CFQ_082-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_083_Verify user can proceed from Question 12 to Question 13 using Next.
await expect(
  cfqPage.getQuestionProgress(13, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 13
// TC_CFQ_084-Verify Question 13
await expect(cfqPage.getwrongPlaceQuestion(wrongPlaceQuestion)).toBeVisible();
// TC_CFQ_085-Verify all available options for question  13
for (const option of wrongPlaceOptions) {
  await expect(cfqPage.getwrongPlaceOption(option)).toBeVisible();
}
// TC_CFQ_086-Verify user can select the configured answer for Question 13
console.log(`Selected answer: ${selectedWrongPlaceOption.number} - ${selectedWrongPlaceOption.text}`);
// TC_CFQ_087-Verify selected option for question 13
await cfqPage.selectwrongPlaceOption(selectedWrongPlaceOption);
// TC_CFQ_088-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_089_Verify user can proceed from Question 13 to Question 14 using Next.
await expect(
  cfqPage.getQuestionProgress(14, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

//Question 14
// TC_CFQ_090-Verify Question 14
await expect(cfqPage.getleaveHomeQuestion(leaveHomeQuestion)).toBeVisible();
// TC_CFQ_091-Verify all available options for question  14
for (const option of leaveHomeOptions) {
  await expect(cfqPage.getleaveHomeOption(option)).toBeVisible();
}
// TC_CFQ_092-Verify user can select the configured answer for Question 14.
console.log(`Selected answer: ${selectedLeaveHomeOption.number} - ${selectedLeaveHomeOption.text}`);
// TC_CFQ_093-Verify selected option for question 14
await cfqPage.selectleaveHomeOption(selectedLeaveHomeOption);
// TC_CFQ_094-Verify the next button is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
await cfqPage.clickNextButton();
//TC_CFQ_095_Verify user can proceed from Question 14 to Question 15 using Next.
await expect(
  cfqPage.getQuestionProgress(15, targetCfqAssessment.questionProgressTotal)
).toBeVisible();

await backButton.click();
//TC_CFQ_096-Verify Question 14 is displayed after navigating backward from Question 15.
await expect(cfqPage.getleaveHomeQuestion(leaveHomeQuestion)).toBeVisible();

// TC_CFQ_097-Verify user can select the configured answer for Question 14.
// Keeps the data meaning available for reporting/debugging.
console.log(
  `Selected answer: ${selectedleaveHomeOption2.number} - ${selectedleaveHomeOption2.text}`
);

// TC_CFQ_098-Verify selected option for question 14
await cfqPage.selectleaveHomeOption2(selectedleaveHomeOption2);

// TC_CFQ_099-Verify the next buton is enabled
await expect(cfqPage.getNextButton()).toBeEnabled();
//TC_IADL_100_Verify user can proceed from Question 1 to Question 2 using Next.
await cfqPage.clickNextButton();

//Question 15
// TC_CFQ_101-Verify Question 15
await expect(cfqPage.getmissingQuestion(missingQuestion)).toBeVisible();
// TC_CFQ_102-Verify all available options for question  15
for (const option of missingOptions) {
  await expect(cfqPage.getmissingOption(option)).toBeVisible();
}
// TC_CFQ_103-Verify user can select the configured answer for Question 15.
console.log(`Selected answer: ${selectedMissingOption.number} - ${selectedLeaveHomeOption.text}`);
// TC_CFQ_104-Verify selected option for question 15
await cfqPage.selectmissingOption(selectedMissingOption);

// TC_CFQ_105-Verify the next buton is enabled
await expect(cfqPage.getSubmitButton()).toBeEnabled();


// TC_CFQ_106-Verify user can submit the completed assessment.
await cfqPage.clickSubmitButton();

// TC_CFQ_107-Verify assessment submission confirmation is displayed after successful submission.
await expect(
  page.getByRole('alert').filter({
    hasText: 'Assessment Submitted',
  })
).toBeVisible();

//TC_CFQ_108- Refresh current page to load Assessment and Assessment Report cards.
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_CFQ_109-Verify completed assessment card displays the expected completion status.
await expect(
  cfqPage.getAssessmentStatusByTitle(
    completionSummary.assessmentTitle,
    completionSummary.status
  )
).toHaveText(completionSummary.status);
await page.waitForTimeout(6000);


await backArrow.click();
await page.reload({ waitUntil: 'domcontentloaded' });

const firstCompletedCfqAssessment =
  cfqData.firstCompletedCfqAssessment;

await expect(
  cfqPage.getAssessmentStatusByTitle(
    firstCompletedCfqAssessment.title,
    firstCompletedCfqAssessment.status
  )
).toHaveText(firstCompletedCfqAssessment.status);

await cfqPage.clickAssessmentCardByStatus(
  firstCompletedCfqAssessment.title,
  firstCompletedCfqAssessment.status
);

const assessmentReport = cfqData.assessmentReport;

const downloadButton =
  cfqPage.getAssessmentReportDownloadButton(
    assessmentReport.title,
    assessmentReport.downloadButtonName
  );
// TC_CFQ_109-Verify the downlod button is visible and enable
await expect(downloadButton).toBeVisible();
await expect(downloadButton).toBeEnabled();
// TC_CFQ_110-Verify that able to download the report and able to view
await cfqPage.clickAssessmentReportDownload(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);

await page.waitForTimeout(6000);
await page.close();





































































})
})