import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { ISILocators } from '../pages/Locaters/ISI.locators';
import { ISIPage } from '../pages/Pages/ISI.Page';
import loginData from '../testdata/AssloginData.json';
import isiData from '../testdata/ISIData.json';
const LOGIN_URL = 'https://test-assess.liveivory.com/login';

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });


  test('Cognitive Failure Check (CFQ 2.0)', async ({ page }) => {
    test.setTimeout(120_000)
    const isiPage = new ISIPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText =ISILocators.dashboardText(page);
    const targetIsiAssessment = isiData.isiAssessment;
    const assTitle = isiPage.getAssessmentTitleByStatus(
      targetIsiAssessment.title,
      targetIsiAssessment.status
    );
    
    const kebabTitle= ISILocators.kebabTitle(page);
    const kebabTime= ISILocators.kebabTime(page);
    const backArrow= ISILocators.backArrow(page);
    const  clickStart= ISILocators.clickStart(page);
    const tabTitle= ISILocators.tabTitle(page);
    const tabSubTitle =ISILocators.tabSubTitle(page);
    const tabDiscription=ISILocators.tabDiscription(page);
    const questionCount= ISILocators.questionCount(page);
    const cancelIcon = ISILocators.cancelIcon(page);
    const beginAss= ISILocators.beginAss(page);    
    //question 1 data
    const asleepQuestion = isiData.asleepQuestion;
    const asleepOptions = isiData.asleepOptions;
    const selectedAsleepOption = isiData.selectedasleepOption;
    //question 2 data
    const stayingAsleepQuestion = isiData.stayingAsleepQuestion;
    const stayingAsleepOptions = isiData.stayingAsleepOptions;
    const selectedStayingAsleepOption = isiData.selectedstayingAsleepOption;
    //question 3 data
    const wakingEarlyQuestion = isiData.wakingEarlyQuestion;
    const wakingEarlyOptions = isiData.wakingEarlyOptions;
    const selectedWakingEarlyOption = isiData.selectedwakingEarlyOption;
    //question 4 data
    const satisfactionQuestion = isiData.satisfactionQuestion;
    const satisfactionOptions = isiData.satisfactionOptions;
    const selectedSatisfactionOption = isiData.selectedsatisfactionOption;
    //question 5 data
    const interferenceQuestion = isiData.interferenceQuestion;
    const interferenceOptions = isiData.interferenceOptions;
    const selectedInterferenceOption = isiData.selectedinterferenceOption;
    //question 6 data
    const noticeableQuestion = isiData.noticeableQuestion;
    const noticeableOptions = isiData.noticeableOptions;
    const selectedNoticeableOption = isiData.selectednoticeableOption;
    const updatedNoticeableOption = isiData.updatednoticeableOption;
    //question 7 data
    const worriedQuestion = isiData.worriedQuestion;
    const worriedOptions = isiData.worriedOptions;
    const selectedWorriedOption = isiData.selectedworriedOption;
    const completionSummary = isiData.completionSummary;




  //TC_ISI_001 - Verify user can login successfully using a valid phone number and static OTP
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

//TC_ISI_002 - Verify dashboard loads with correct greeting text for logged-in user

await expect(dashboardText).toBeVisible();
//TC_ISI_003 - Verify assessment card displays title, Added on date, partner name and status
await expect(assTitle).toBeVisible();

//verify the assessment created date
const isiAddedOnDate = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
);

await expect(isiAddedOnDate).toHaveText(
  /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
);


//verify the partner name for ISI

const isiPartnerName = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "by")][1]'
);

await expect(isiPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

//TC_ISI_004 - Verify new assessment shows "YET TO BE STARTED"/In progress status

await expect(
  isiPage.getAssessmentStatusByTitle(
    targetIsiAssessment.title,
    targetIsiAssessment.status
  )
).toHaveText(
  targetIsiAssessment.status
);

//TC_ISI_005 - Verify clicking assessment card opens intro modal
await isiPage.clickAssessmentCardByStatus(
  targetIsiAssessment.title,
  targetIsiAssessment.status
);

//TC_ISI_006 - Verify kebab menu is clickable and displays expected options (title and time)
await expect(kebabTitle).toBeVisible();
//Verify the timing
await expect(kebabTime).toBeVisible();

//TC_ISI_007 - Verify back arrow navigates to previous screen

await backArrow.click();
await page.waitForTimeout(2000);

// Re-open the assessment card to continue with the Start flow
await isiPage.clickAssessmentCardByStatus(
  targetIsiAssessment.title,
  targetIsiAssessment.status
);
//TC_ISI_008 - Verify the Start option opens the assessment info modal
await  clickStart.click();

//TC_ISI_009 - Verify modal displays title, subtitle, description, question count, time estimate and instructions
//title

await expect(tabTitle).toBeVisible();
//subtitle
await expect(tabSubTitle).toBeVisible();
//Description
await expect(tabDiscription).toBeVisible();
//Question count
await expect(questionCount).toBeVisible();
//TC_ISI_010 - Verify X button closes modal without starting assessment
await cancelIcon.click();
// Re-open the Start modal to proceed with Begin Assessment
await  clickStart.click();

//TC_ISI_011 - Verify the Begin Assessment option starts the assessment
await beginAss.click();

// TC_ISI_012 - Verify the first question progress counter is displayed correctly
await expect(
  isiPage.getQuestionProgress(1, targetIsiAssessment.questionProgressTotal)
).toBeVisible();

//Question 1

// TC_ISI_013 - Verify Question 1 - Difficulty falling asleep - is displayed
await expect(isiPage.getasleepQuestion(asleepQuestion)).toBeVisible();

// TC_ISI_014 - Verify all available options for Question 1 are displayed

for (const option of asleepOptions) {
  await expect(isiPage.getasleepOption(option)).toBeVisible();
}

// Log selected answer for Question 1 for reporting/debugging
console.log(
  `Selected answer: ${selectedAsleepOption.number} - ${selectedAsleepOption.text}`
);

// TC_ISI_015 - Verify user can select the configured answer for Question 1
await isiPage.selectasleepOption(selectedAsleepOption);

// TC_ISI_016 - Verify the Next button is enabled after selecting an answer
await expect(isiPage.getNextButton()).toBeEnabled();
//TC_ISI_017 - Verify user can proceed from Question 1 to Question 2 using Next
await isiPage.clickNextButton();

// TC_ISI_018 - Verify progress counter updates to Question 2
await expect(
  isiPage.getQuestionProgress(2, targetIsiAssessment.questionProgressTotal)
).toBeVisible();

//Question 2

// TC_ISI_019 - Verify Question 2 - Difficulty staying asleep - is displayed
await expect(isiPage.getstayingAsleepQuestion(stayingAsleepQuestion)).toBeVisible();

// TC_ISI_020 - Verify all available options for Question 2 are displayed
for (const option of stayingAsleepOptions) {
  await expect(isiPage.getstayingAsleepOption(option)).toBeVisible();
}

// Log selected answer for Question 2 for reporting/debugging
console.log(`Selected answer: ${selectedStayingAsleepOption.number} - ${selectedStayingAsleepOption.text}`);

// TC_ISI_021 - Verify user can select the configured answer for Question 2
await isiPage.selectstayingAsleepOption(selectedStayingAsleepOption);

// TC_ISI_022 - Verify the Next button is enabled after selecting an answer
await expect(isiPage.getNextButton()).toBeEnabled();
//TC_ISI_023 - Verify user can proceed from Question 2 to Question 3 using Next
await isiPage.clickNextButton();

// TC_ISI_024 - Verify progress counter updates to Question 3
await expect(
  isiPage.getQuestionProgress(3, targetIsiAssessment.questionProgressTotal)
).toBeVisible();

//Question 3

// TC_ISI_025 - Verify Question 3 - Waking up too early - is displayed
await expect(isiPage.getwakingEarlyQuestion(wakingEarlyQuestion)).toBeVisible();

// TC_ISI_026 - Verify all available options for Question 3 are displayed
for (const option of wakingEarlyOptions) {
  await expect(isiPage.getwakingEarlyOption(option)).toBeVisible();
}

// Log selected answer for Question 3 for reporting/debugging
console.log(`Selected answer: ${selectedWakingEarlyOption.number} - ${selectedWakingEarlyOption.text}`);

// TC_ISI_027 - Verify user can select the configured answer for Question 3
await isiPage.selectwakingEarlyOption(selectedWakingEarlyOption);

// TC_ISI_028 - Verify the Next button is enabled after selecting an answer
await expect(isiPage.getNextButton()).toBeEnabled();
//TC_ISI_029 - Verify user can proceed from Question 3 to Question 4 using Next
await isiPage.clickNextButton();

// TC_ISI_030 - Verify progress counter updates to Question 4
await expect(
  isiPage.getQuestionProgress(4, targetIsiAssessment.questionProgressTotal)
).toBeVisible();

//Question 4

// TC_ISI_031 - Verify Question 4 - Satisfaction with current sleep pattern - is displayed
await expect(isiPage.getsatisfactionQuestion(satisfactionQuestion)).toBeVisible();

// TC_ISI_032 - Verify all available options for Question 4 are displayed
for (const option of satisfactionOptions) {
  await expect(isiPage.getsatisfactionOption(option)).toBeVisible();
}

// Log selected answer for Question 4 for reporting/debugging
console.log(`Selected answer: ${selectedSatisfactionOption.number} - ${selectedSatisfactionOption.text}`);

// TC_ISI_033 - Verify user can select the configured answer for Question 4
await isiPage.selectsatisfactionOption(selectedSatisfactionOption);

// TC_ISI_034 - Verify the Next button is enabled after selecting an answer
await expect(isiPage.getNextButton()).toBeEnabled();
//TC_ISI_035 - Verify user can proceed from Question 4 to Question 5 using Next
await isiPage.clickNextButton();

// TC_ISI_036 - Verify progress counter updates to Question 5
await expect(
  isiPage.getQuestionProgress(5, targetIsiAssessment.questionProgressTotal)
).toBeVisible();

//Question 5

// TC_ISI_037 - Verify Question 5 - Interference with daily functioning - is displayed
await expect(isiPage.getinterferenceQuestion(interferenceQuestion)).toBeVisible();

// TC_ISI_038 - Verify all available options for Question 5 are displayed
for (const option of interferenceOptions) {
  await expect(isiPage.getinterferenceOption(option)).toBeVisible();
}

// Log selected answer for Question 5 for reporting/debugging
console.log(`Selected answer: ${selectedInterferenceOption.number} - ${selectedInterferenceOption.text}`);

// TC_ISI_039 - Verify user can select the configured answer for Question 5
await isiPage.selectinterferenceOption(selectedInterferenceOption);

// TC_ISI_040 - Verify the Next button is enabled after selecting an answer
await expect(isiPage.getNextButton()).toBeEnabled();
//TC_ISI_041 - Verify user can proceed from Question 5 to Question 6 using Next
await isiPage.clickNextButton();

// TC_ISI_042 - Verify progress counter updates to Question 6
await expect(
  isiPage.getQuestionProgress(6, targetIsiAssessment.questionProgressTotal)
).toBeVisible();

//Question 6

// TC_ISI_043 - Verify Question 6 - Noticeability of sleep problem to others - is displayed
await expect(isiPage.getnoticeableQuestion(noticeableQuestion)).toBeVisible();

// TC_ISI_044 - Verify all available options for Question 6 are displayed
for (const option of noticeableOptions) {
  await expect(isiPage.getnoticeableOption(option)).toBeVisible();
}

// Log selected answer for Question 6 for reporting/debugging
console.log(`Selected answer: ${selectedNoticeableOption.number} - ${selectedNoticeableOption.text}`);

// TC_ISI_045 - Verify user can select the configured answer for Question 6
await isiPage.selectnoticeableOption(selectedNoticeableOption);

// TC_ISI_046 - Verify the Next button is enabled after selecting an answer
await expect(isiPage.getNextButton()).toBeEnabled();
//TC_ISI_047 - Verify user can proceed from Question 6 to Question 7 using Next
await isiPage.clickNextButton();

// TC_ISI_048 - Verify progress counter updates to Question 7
await expect(
  isiPage.getQuestionProgress(7, targetIsiAssessment.questionProgressTotal)
).toBeVisible();

//Question 7

// TC_ISI_049 - Verify Question 7 - Worry/distress caused by the sleep problem - is displayed
await expect(isiPage.getworriedQuestion(worriedQuestion)).toBeVisible();

// TC_ISI_050 - Verify all available options for Question 7 are displayed
for (const option of worriedOptions) {
  await expect(isiPage.getworriedOption(option)).toBeVisible();
}

// Log selected answer for Question 7 for reporting/debugging
console.log(`Selected answer: ${selectedWorriedOption.number} - ${selectedWorriedOption.text}`);

// TC_ISI_051 - Verify user can select the configured answer for Question 7
await isiPage.selectworriedOption(selectedWorriedOption);

// TC_ISI_052 - Verify Submit button is enabled after answering the final question
await expect(isiPage.getSubmitButton()).toBeEnabled();

//TC_ISI_053 - Verify user can navigate back from Question 7 to Question 6 and change the answer

await isiPage.clickQuestionBackButton();

await expect(
  isiPage.getQuestionProgress(6, targetIsiAssessment.questionProgressTotal)
).toBeVisible();

await expect(isiPage.getnoticeableQuestion(noticeableQuestion)).toBeVisible();

console.log(`Updated answer: ${updatedNoticeableOption.number} - ${updatedNoticeableOption.text}`);

await isiPage.selectnoticeableOption(updatedNoticeableOption);

await expect(isiPage.getNextButton()).toBeEnabled();
// Proceed back to Question 7 after updating the Question 6 answer
await isiPage.clickNextButton();

await expect(
  isiPage.getQuestionProgress(7, targetIsiAssessment.questionProgressTotal)
).toBeVisible();

//TC_ISI_054 - Verify user can re-select the answer for Question 7 and submit the assessment

await expect(isiPage.getworriedQuestion(worriedQuestion)).toBeVisible();

await isiPage.selectworriedOption(selectedWorriedOption);

await expect(isiPage.getSubmitButton()).toBeEnabled();
await isiPage.clickSubmitButton();
// TC_ISI_055 - Verify assessment submission confirmation is displayed after successful submission
await expect(
  page.getByRole('alert').filter({
    hasText: 'Assessment Submitted',
  })
).toBeVisible();

//TC_ISI_056 - Refresh current page to load Assessment and Assessment Report cards
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_ISI_057 - Verify completed assessment card displays the expected completion status
await expect(
  isiPage.getAssessmentStatusByTitle(
    completionSummary.assessmentTitle,
    completionSummary.status
  )
).toHaveText(completionSummary.status);
await page.waitForTimeout(6000);
await backArrow.click();
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_ISI_058 - On the dashboard, open the first ISI card with Completed status
// The existing title-and-status locator uses .first(), so date is intentionally
// not used and later completed ISI cards are ignored.
const firstCompletedIsiAssessment = isiData.firstCompletedIsiAssessment;

await expect(
  isiPage.getAssessmentStatusByTitle(
    firstCompletedIsiAssessment.title,
    firstCompletedIsiAssessment.status
  )
).toHaveText(firstCompletedIsiAssessment.status);

await isiPage.clickAssessmentCardByStatus(
  firstCompletedIsiAssessment.title,
  firstCompletedIsiAssessment.status
);

// TC_ISI_059 - Download the report from the completed ISI assessment page
const assessmentReport = isiData.assessmentReport;
const downloadButton = isiPage.getAssessmentReportDownloadButton(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);

await expect(downloadButton).toBeVisible();
await expect(downloadButton).toBeEnabled();

await isiPage.clickAssessmentReportDownload(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);
await page.waitForTimeout(6000);
 // waits until the download is finished
await page.close();    // closes the website tab






})
})