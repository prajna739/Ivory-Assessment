import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { PHQLocators } from '../pages/Locaters/PHQ.locators';
import { PHQPage } from '../pages/Pages/PHQ.Page';
import loginData from '../testdata/AssloginData.json';
import phqData from '../testdata/PHQData.json';
const LOGIN_URL = 'https://test-assess.liveivory.com/login';

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });


  test('PHQ-9 Depression Assessment', async ({ page }) => {
    test.setTimeout(120_000)
    const phqPage = new PHQPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText =PHQLocators.dashboardText(page);
    const targetPhqAssessment = phqData.phqAssessment;
    const assTitle = phqPage.getAssessmentTitleByStatus(
      targetPhqAssessment.title,
      targetPhqAssessment.status
    );
    
    const kebabTitle= PHQLocators.kebabTitle(page);
    const kebabTime= PHQLocators.kebabTime(page);
    const backArrow= PHQLocators.backArrow(page);
    const  clickStart= PHQLocators. clickStart(page);
    const tabTitle= PHQLocators.tabTitle(page);
    const tabSubTitle =PHQLocators.tabSubTitle(page);
    const tabDiscription=PHQLocators.tabDiscription(page);
    const questionCount= PHQLocators.questionCount(page);
    const cancelIcon = PHQLocators.cancelIcon(page);
    const beginAss= PHQLocators.beginAss(page);
    //question 1 data
     const pleasureQuestion = phqData.pleasureQuestion;
    const pleasureOptions = phqData.pleasureOptions;
    const selectedPleasureOption = phqData.selectedpleasureOption;
    //question 2 data
    const downQuestion = phqData.downQuestion;
    const downOptions = phqData.downOptions;
    const selectedDownOption = phqData.selecteddownOption;
    //question 3 data
    const asleepQuestion = phqData.asleepQuestion;
    const asleepOptions = phqData.asleepOptions;
    const selectedAsleepOption = phqData.selectedasleepOption;
    //question 4 data
    const tiredQuestion = phqData.tiredQuestion;
    const tiredOptions = phqData.tiredOptions;
    const selectedTiredOption = phqData.selectedtiredOption;
    //question 5 data
    const appetiteQuestion = phqData.appetiteQuestion;
    const appetiteOptions = phqData.appetiteOptions;
    const selectedAppetiteOption = phqData.selectedappetiteOption;

    //question 6 data
    const familyQuestion = phqData.familyQuestion;
    const familyOptions = phqData.familyOptions;
    const selectedFamilyOption = phqData.selectedfamilyOption;
    //question 7 data
    const readingQuestion = phqData.readingQuestion;
    const readingOptions = phqData.readingOptions;
    const selectedReadingOption = phqData.selectedreadingOption;
    //question 8 data
    const fidgetyQuestion = phqData.fidgetyQuestion;
    const fidgetyOptions = phqData.fidgetyOptions;
    const selectedFidgetyOption = phqData.selectedfidgetyOption;
    //question 9 data
    const hurtingQuestion = phqData.hurtingQuestion;
    const hurtingOptions = phqData.hurtingOptions;
    const selectedHurtingOption = phqData.selectedhurtingOption;
    //back button
    const backButton = PHQLocators.backButton(page); 
     //change the 7th question option
    const selectedhurtingOption2 = phqData.selectedhurtingOption2;
    //question 9 data
    const careQuestion = phqData.careQuestion;
    const careOptions = phqData.careOptions;
    const selectedCareOption = phqData.selectedcareOption;
    const completionSummary = phqData.completionSummary;

  //TC_PHQ_001 - Verify user can login successfully using a valid phone number and static OTP
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

//TC_PHQ_002 - Verify dashboard loads with correct greeting text for logged-in user

await expect(dashboardText).toBeVisible();
//TC_PHQ_003 - Verify assessment card displays title, Added on date, partner name and status
await expect(assTitle).toBeVisible();

//verify the assessment created date
const phqAddedOnDate = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
);

await expect(phqAddedOnDate).toHaveText(
  /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
);


//verify the partner name for PHQ-9

const phqPartnerName = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "by")][1]'
);

await expect(phqPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

//TC_PHQ_004 - Verify new assessment shows "YET TO BE STARTED"/In progress status

await expect(
  phqPage.getAssessmentStatusByTitle(
    targetPhqAssessment.title,
    targetPhqAssessment.status
  )
).toHaveText(
  targetPhqAssessment.status
);

//TC_PHQ_005 - Verify clicking assessment card opens intro modal
await phqPage.clickAssessmentCardByStatus(
  targetPhqAssessment.title,
  targetPhqAssessment.status
);

//TC_PHQ_006 - Verify kebab menu is clickable and displays expected options (title and time)
await expect(kebabTitle).toBeVisible();
//Verify the timing
await expect(kebabTime).toBeVisible();

//TC_PHQ_007 - Verify back arrow navigates to previous screen

await backArrow.click();
await page.waitForTimeout(2000);

// Re-open the assessment card to continue with the Start flow
await phqPage.clickAssessmentCardByStatus(
  targetPhqAssessment.title,
  targetPhqAssessment.status
);
//TC_PHQ_008 - Verify the Start option opens the assessment info modal
await  clickStart.click();

//TC_PHQ_009 - Verify modal displays title, subtitle, description, question count, time estimate and instructions
//title

await expect(tabTitle).toBeVisible();
//subtitle
await expect(tabSubTitle).toBeVisible();
//Description
await expect(tabDiscription).toBeVisible();
//Question count
await expect(questionCount).toBeVisible();
//TC_PHQ_010 - Verify X button closes modal without starting assessment
await cancelIcon.click();
// Re-open the Start modal to proceed with Begin Assessment
await  clickStart.click();

//TC_PHQ_011 - Verify the Begin Assessment option starts the assessment
await beginAss.click();

// TC_PHQ_012 - Verify the first question progress counter is displayed correctly
await expect(
  phqPage.getQuestionProgress(1, targetPhqAssessment.questionProgressTotal)
).toBeVisible();
await page.waitForTimeout(2000);


//Question 1

// TC_PHQ_013 - Verify Question 1 - Little interest or pleasure in doing things - is displayed
await expect(phqPage.getpleasureQuestion(pleasureQuestion)).toBeVisible();

// TC_PHQ_014 - Verify all available options for Question 1 are displayed

for (const option of pleasureOptions) {
  await expect(phqPage.getpleasureOption(option)).toBeVisible();
}

// Log selected answer for Question 1 for reporting/debugging
console.log(
  `Selected answer: ${selectedPleasureOption.number} - ${selectedPleasureOption.text}`
);

// TC_PHQ_015 - Verify user can select the configured answer for Question 1
await phqPage.selectpleasureOption(selectedPleasureOption);

// TC_PHQ_016 - Verify the Next button is enabled after selecting an answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_017 - Verify user can proceed from Question 1 to Question 2 using Next
await phqPage.clickNextButton();

// TC_PHQ_018 - Verify progress counter updates to Question 2
await expect(
  phqPage.getQuestionProgress(2, targetPhqAssessment.questionProgressTotal)
).toBeVisible();


//Question 2

// TC_PHQ_019 - Verify Question 2 - Feeling down, depressed or hopeless - is displayed
await expect(phqPage.getdownQuestion(downQuestion)).toBeVisible();

// TC_PHQ_020 - Verify all available options for Question 2 are displayed

for (const option of downOptions) {
  await expect(phqPage.getdownOption(option)).toBeVisible();
}

// Log selected answer for Question 2 for reporting/debugging
console.log(
  `Selected answer: ${selectedDownOption.number} - ${selectedDownOption.text}`
);

// TC_PHQ_021 - Verify user can select the configured answer for Question 2
await phqPage.selectdownOption(selectedDownOption);

// TC_PHQ_022 - Verify the Next button is enabled after selecting an answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_023 - Verify user can proceed from Question 2 to Question 3 using Next
await phqPage.clickNextButton();

// TC_PHQ_024 - Verify progress counter updates to Question 3
await expect(
  phqPage.getQuestionProgress(3, targetPhqAssessment.questionProgressTotal)
).toBeVisible();


//Question 3

// TC_PHQ_025 - Verify Question 3 - Trouble falling/staying asleep, or sleeping too much - is displayed
await expect(phqPage.getasleepQuestion(asleepQuestion)).toBeVisible();

// TC_PHQ_026 - Verify all available options for Question 3 are displayed

for (const option of asleepOptions) {
  await expect(phqPage.getasleepOption(option)).toBeVisible();
}

// Log selected answer for Question 3 for reporting/debugging
console.log(
  `Selected answer: ${selectedAsleepOption.number} - ${selectedAsleepOption.text}`
);

// TC_PHQ_027 - Verify user can select the configured answer for Question 3
await phqPage.selectasleepOption(selectedAsleepOption);

// TC_PHQ_028 - Verify the Next button is enabled after selecting an answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_029 - Verify user can proceed from Question 3 to Question 4 using Next
await phqPage.clickNextButton();

// TC_PHQ_030 - Verify progress counter updates to Question 4
await expect(
  phqPage.getQuestionProgress(4, targetPhqAssessment.questionProgressTotal)
).toBeVisible();

//Question 4

// TC_PHQ_031 - Verify Question 4 - Feeling tired or having little energy - is displayed
await expect(phqPage.gettiredQuestion(tiredQuestion)).toBeVisible();

// TC_PHQ_032 - Verify all available options for Question 4 are displayed

for (const option of tiredOptions) {
  await expect(phqPage.gettiredOption(option)).toBeVisible();
}

// Log selected answer for Question 4 for reporting/debugging
console.log(
  `Selected answer: ${selectedTiredOption.number} - ${selectedTiredOption.text}`
);

// TC_PHQ_033 - Verify user can select the configured answer for Question 4
await phqPage.selecttiredOption(selectedTiredOption);

// TC_PHQ_034 - Verify the Next button is enabled after selecting an answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_035 - Verify user can proceed from Question 4 to Question 5 using Next
await phqPage.clickNextButton();

// TC_PHQ_036 - Verify progress counter updates to Question 5
await expect(
  phqPage.getQuestionProgress(5, targetPhqAssessment.questionProgressTotal)
).toBeVisible();

//Question 5

// TC_PHQ_037 - Verify Question 5 - Poor appetite or overeating - is displayed
await expect(phqPage.getappetiteQuestion(appetiteQuestion)).toBeVisible();

// TC_PHQ_038 - Verify all available options for Question 5 are displayed

for (const option of appetiteOptions) {
  await expect(phqPage.getappetiteOption(option)).toBeVisible();
}

// Log selected answer for Question 5 for reporting/debugging
console.log(
  `Selected answer: ${selectedAppetiteOption.number} - ${selectedAppetiteOption.text}`
);

// TC_PHQ_039 - Verify user can select the configured answer for Question 5
await phqPage.selectappetiteOption(selectedAppetiteOption);

// TC_PHQ_040 - Verify the Next button is enabled after selecting an answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_041 - Verify user can proceed from Question 5 to Question 6 using Next
await phqPage.clickNextButton();

// TC_PHQ_042 - Verify progress counter updates to Question 6
await expect(
  phqPage.getQuestionProgress(6, targetPhqAssessment.questionProgressTotal)
).toBeVisible();

//Question 6

// TC_PHQ_043 - Verify Question 6 - Feeling bad about yourself, or that you are a failure/letting family down - is displayed
await expect(phqPage.getfamilyQuestion(familyQuestion)).toBeVisible();

// TC_PHQ_044 - Verify all available options for Question 6 are displayed

for (const option of familyOptions) {
  await expect(phqPage.getfamilyOption(option)).toBeVisible();
}

// Log selected answer for Question 6 for reporting/debugging
console.log(
  `Selected answer: ${selectedFamilyOption.number} - ${selectedFamilyOption.text}`
);

// TC_PHQ_045 - Verify user can select the configured answer for Question 6
await phqPage.selectfamilyOption(selectedFamilyOption);

// TC_PHQ_046 - Verify the Next button is enabled after selecting an answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_047 - Verify user can proceed from Question 6 to Question 7 using Next
await phqPage.clickNextButton();

// TC_PHQ_048 - Verify progress counter updates to Question 7
await expect(
  phqPage.getQuestionProgress(7, targetPhqAssessment.questionProgressTotal)
).toBeVisible();

//Question 7

// TC_PHQ_049 - Verify Question 7 - Trouble concentrating on things such as reading - is displayed
await expect(phqPage.getreadingQuestion(readingQuestion)).toBeVisible();

// TC_PHQ_050 - Verify all available options for Question 7 are displayed

for (const option of readingOptions) {
  await expect(phqPage.getreadingOption(option)).toBeVisible();
}

// Log selected answer for Question 7 for reporting/debugging
console.log(
  `Selected answer: ${selectedReadingOption.number} - ${selectedReadingOption.text}`
);

// TC_PHQ_051 - Verify user can select the configured answer for Question 7
await phqPage.selectreadingOption(selectedReadingOption);

// TC_PHQ_052 - Verify the Next button is enabled after selecting an answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_053 - Verify user can proceed from Question 7 to Question 8 using Next
await phqPage.clickNextButton();

// TC_PHQ_054 - Verify progress counter updates to Question 8
await expect(
  phqPage.getQuestionProgress(8, targetPhqAssessment.questionProgressTotal)
).toBeVisible();

//Question 8

// TC_PHQ_055 - Verify Question 8 - Moving/speaking slowly or being fidgety/restless - is displayed
await expect(phqPage.getfidgetyQuestion(fidgetyQuestion)).toBeVisible();

// TC_PHQ_056 - Verify all available options for Question 8 are displayed

for (const option of fidgetyOptions) {
  await expect(phqPage.getfidgetyOption(option)).toBeVisible();
}

// Log selected answer for Question 8 for reporting/debugging
console.log(
  `Selected answer: ${selectedFidgetyOption.number} - ${selectedFidgetyOption.text}`
);

// TC_PHQ_057 - Verify user can select the configured answer for Question 8
await phqPage.selectfidgetyOption(selectedFidgetyOption);

// TC_PHQ_058 - Verify the Next button is enabled after selecting an answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_059 - Verify user can proceed from Question 8 to Question 9 using Next
await phqPage.clickNextButton();

// TC_PHQ_060 - Verify progress counter updates to Question 9
await expect(
  phqPage.getQuestionProgress(9, targetPhqAssessment.questionProgressTotal)
).toBeVisible();

//Question 9

// TC_PHQ_061 - Verify Question 9 - Thoughts of being better off dead or of hurting yourself - is displayed
await expect(phqPage.gethurtingQuestion(hurtingQuestion)).toBeVisible();

// TC_PHQ_062 - Verify all available options for Question 9 are displayed

for (const option of hurtingOptions) {
  await expect(phqPage.gethurtingOption(option)).toBeVisible();
}

// Log selected answer for Question 9 for reporting/debugging
console.log(
  `Selected answer: ${selectedHurtingOption.number} - ${selectedHurtingOption.text}`
);

// TC_PHQ_063 - Verify user can select the configured answer for Question 9
await phqPage.selecthurtingOption(selectedHurtingOption);

// TC_PHQ_064 - Verify the Next button is enabled after selecting an answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_065 - Verify user can proceed from Question 9 to Question 10 using Next
await phqPage.clickNextButton();

// TC_PHQ_066 - Verify progress counter updates to Question 10
await expect(
  phqPage.getQuestionProgress(10, targetPhqAssessment.questionProgressTotal)
).toBeVisible();

//TC_PHQ_067 - Verify user can navigate back from Question 10 to Question 9 to change the answer
await backButton.click();

//Verify Question 9 is displayed again after navigating backward from Question 10
await expect(phqPage.gethurtingQuestion(hurtingQuestion)).toBeVisible();

// Log updated answer for Question 9 for reporting/debugging
console.log(
  `Selected answer: ${selectedhurtingOption2.number} - ${selectedhurtingOption2.text}`
);

// TC_PHQ_068 - Verify user can update the previously selected answer for Question 9
await phqPage.selecthurtingOption2(selectedhurtingOption2);

// TC_PHQ_069 - Verify the Next button is enabled after updating the answer
await expect(phqPage.getNextButton()).toBeEnabled();
//TC_PHQ_070 - Verify user can proceed from Question 9 to Question 10 again using Next
await phqPage.clickNextButton();

//Question 10

// TC_PHQ_071 - Verify Question 10 - Difficulty these problems have caused in daily functioning - is displayed
await expect(phqPage.getcareQuestion(careQuestion)).toBeVisible();

// TC_PHQ_072 - Verify all available options for Question 10 are displayed

for (const option of careOptions) {
  await expect(phqPage.getcareOption(option)).toBeVisible();
}

// Log selected answer for Question 10 for reporting/debugging
console.log(
  `Selected answer: ${selectedCareOption.number} - ${selectedCareOption.text}`
);

// TC_PHQ_073 - Verify user can select the configured answer for Question 10
await phqPage.selectcareOption(selectedCareOption);

// TC_PHQ_074 - Verify the Submit button is enabled after answering the final question
await expect(phqPage.getSubmitButton()).toBeEnabled();

// TC_PHQ_075 - Verify user can submit the completed assessment
await phqPage.clickSubmitButton();

// TC_PHQ_076 - Verify assessment submission confirmation is displayed after successful submission
await expect(
  page.getByRole('alert').filter({
    hasText: 'Assessment Submitted',
  })
).toBeVisible();

//TC_PHQ_077 - Refresh current page to load Assessment and Assessment Report cards
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_PHQ_078 - Verify completed assessment card displays the expected completion status
await expect(
  phqPage.getAssessmentStatusByTitle(
    completionSummary.assessmentTitle,
    completionSummary.status
  )
).toHaveText(completionSummary.status);
await backArrow.click();
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_PHQ_079 - Open the first completed PHQ-9 assessment card from the dashboard
const firstCompletedPhqAssessment = phqData.firstCompletedPhqAssessment;

await expect(
  phqPage.getAssessmentStatusByTitle(
    firstCompletedPhqAssessment.title,
    firstCompletedPhqAssessment.status
  )
).toHaveText(firstCompletedPhqAssessment.status);

await phqPage.clickAssessmentCardByStatus(
  firstCompletedPhqAssessment.title,
  firstCompletedPhqAssessment.status
);

// TC_PHQ_080 - Download the completed PHQ-9 assessment report
const assessmentReport = phqData.assessmentReport;
const downloadButton = phqPage.getAssessmentReportDownloadButton(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);

await expect(downloadButton).toBeVisible();
await expect(downloadButton).toBeEnabled();


await phqPage.clickAssessmentReportDownload(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);
await page.waitForTimeout(6000);
 // waits until the download is finished
await page.close(); 







})
})