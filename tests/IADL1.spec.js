import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { IADL1Locators } from '../pages/Locaters/IADL1.locators';
import { IADL1Page } from '../pages/Pages/IADL1.Page';
import loginData from '../testdata/AssloginData.json';
import iadlData from '../testdata/IADLData.json';
const LOGIN_URL =loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });


  test('Cognitive Failure Check (CFQ 2.0)', async ({ page }) => {
    test.setTimeout(120_000)
    const iadl1Page = new IADL1Page(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText =IADL1Locators.dashboardText(page);
    const targetIadlAssessment = iadlData.iadlAssessment;
    const assTitle = iadl1Page.getAssessmentTitleByStatus(
      targetIadlAssessment.title,
      targetIadlAssessment.status
    );
    
    const kebabTitle= IADL1Locators.kebabTitle(page);
    const kebabTime= IADL1Locators.kebabTime(page);
    const backArrow= IADL1Locators.backArrow(page);
    const  clickStart= IADL1Locators.clickStart(page);
    const tabTitle= IADL1Locators.tabTitle(page);
    const tabSubTitle =IADL1Locators.tabSubTitle(page);
    const tabDiscription=IADL1Locators.tabDiscription(page);
    const questionCount= IADL1Locators.questionCount(page);
    const cancelIcon = IADL1Locators.cancelIcon(page);
    const beginAss= IADL1Locators.beginAss(page); 
    //question1 data
    const question = iadlData.telephoneQuestion;
    const options = iadlData.telephoneOptions;
    const selectedOption = iadlData.selectedTelephoneOption;  
    const nextButton= IADL1Locators.nextButton(page);
        //question2 data
    const shoppingQuestion = iadlData.shoppingQuestion;
    const shoppingOptions = iadlData.shoppingOptions;
    const selectedShoppingOption = iadlData.selectedShoppingOption;
    //question3 data
    const foodPrepQuestion = iadlData.foodPrepQuestion;
    const foodPrepOptions = iadlData.foodPrepOptions;
    const selectedFoodPrepOption = iadlData.selectedFoodPrepOption;
    //question4 data
    const housekeepingQuestion = iadlData.housekeepingQuestion;
    const housekeepingOptions = iadlData.housekeepingOptions;
    const selectedHousekeepingOption = iadlData.selectedHousekeepingOption;
    //question5 data
    const laundryQuestion = iadlData.laundryQuestion;
    const laundryOptions = iadlData.laundryOptions;
    const selectedLaundryOption = iadlData.selectedLaundryOption;
    //question6 data
    const transportationQuestion = iadlData.transportationQuestion;
    const transportationOptions = iadlData.transportationOptions;
    const selectedTransportationOption = iadlData.selectedTransportationOption;
    //question7 data
    const medicationsQuestion = iadlData.medicationsQuestion;
    const medicationsOptions = iadlData.medicationsOptions;
    const selectedMedicationsOption = iadlData.selectedMedicationsOption;
    const updatedMedicationsOption = iadlData.updatedMedicationsOption;
    //question8 data
    const financesQuestion = iadlData.financesQuestion;
    const financesOptions = iadlData.financesOptions;
    const selectedFinancesOption = iadlData.selectedFinancesOption;
    const completionSummary = iadlData.completionSummary;

    //TC_IADL_001 - Verify user can login successfully using a valid phone number and static OTP
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

//TC_IADL_002 - Verify dashboard loads with correct greeting text for logged-in user

await expect(dashboardText).toBeVisible();
//TC_IADL_003 - Verify assessment card displays title, Added on date, partner name and status
await expect(assTitle).toBeVisible();

//verify the assessment created date
const iadlAddedOnDate = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
);

await expect(iadlAddedOnDate).toHaveText(
  /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
);


//verify the partner name for IADL

const iadlPartnerName = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "by")][1]'
);

await expect(iadlPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

//TC_IADL_004 - Verify new assessment shows "YET TO BE STARTED"/In progress status

await expect(
  iadl1Page.getAssessmentStatusByTitle(
    targetIadlAssessment.title,
    targetIadlAssessment.status
  )
).toHaveText(
  targetIadlAssessment.status
);

//TC_IADL_005 - Verify clicking assessment card opens intro modal
await iadl1Page.clickAssessmentCardByStatus(
  targetIadlAssessment.title,
  targetIadlAssessment.status
);

//TC_IADL_006 - Verify kebab menu is clickable and displays expected options (title and time)
await expect(kebabTitle).toBeVisible();
//Verify the timing
await expect(kebabTime).toBeVisible();

//TC_IADL_007 - Verify back arrow navigates to previous screen

await backArrow.click();
await page.waitForTimeout(2000);

// Re-open the assessment card to continue with the Start flow
await iadl1Page.clickAssessmentCardByStatus(
  targetIadlAssessment.title,
  targetIadlAssessment.status
);
//TC_IADL_008 - Verify the Start option opens the assessment info modal
await  clickStart.click();

//TC_IADL_009 - Verify modal displays title, subtitle, description, question count, time estimate and instructions
//title

await expect(tabTitle).toBeVisible();
//subtitle
await expect(tabSubTitle).toBeVisible();
//Description
await expect(tabDiscription).toBeVisible();
//Question count
await expect(questionCount).toBeVisible();
//TC_IADL_010 - Verify X button closes modal without starting assessment
await cancelIcon.click();
// Re-open the Start modal to proceed with Begin Assessment
await  clickStart.click();

//TC_IADL_011 - Verify the Begin Assessment option starts the assessment
await beginAss.click();

// TC_IADL_012 - Verify the first question progress counter is displayed correctly
await expect(
  iadl1Page.getQuestionProgress(1, targetIadlAssessment.questionProgressTotal)
).toBeVisible();

//question 1
// TC_IADL_013 - Verify Question 1 - Ability to use telephone - is displayed
await expect(iadl1Page.getTelephoneQuestion(question)).toBeVisible();

// TC_IADL_014 - Verify all available options for Question 1 are displayed
for (const option of options) {
  await expect(iadl1Page.getTelephoneOption(option)).toBeVisible();
}

// TC_IADL_015 - Verify user can select the configured answer for Question 1
await iadl1Page.selectTelephoneOption(selectedOption);

// TC_IADL_016 - Verify selected option for Question 1 is reflected (aria-pressed = true)
await expect(iadl1Page.getTelephoneOption(selectedOption))
  .toHaveAttribute('aria-pressed', 'true');

//TC_IADL_017 - Verify user can proceed from Question 1 to Question 2 using Next
await nextButton.click();

//question 2
//TC_IADL_018 - Verify Question 2 - Shopping - is displayed
await expect(iadl1Page.getShoppingQuestion(shoppingQuestion)).toBeVisible();

//TC_IADL_019 - Verify all available options for Question 2 are displayed
for (const option of shoppingOptions) {
  await expect(iadl1Page.getShoppingOption(option)).toBeVisible();
}

//TC_IADL_020 - Verify user can select the configured answer for Question 2
await iadl1Page.selectShoppingOption(selectedShoppingOption);

//TC_IADL_021 - Verify user can proceed from Question 2 to Question 3 and progress counter updates
await nextButton.click();
await expect(
  iadl1Page.getQuestionProgress(3, targetIadlAssessment.questionProgressTotal)
).toBeVisible();

//question 3
//TC_IADL_022 - Verify Question 3 - Food Preparation - is displayed
await expect(iadl1Page.getFoodPrepQuestion(foodPrepQuestion)).toBeVisible();

//TC_IADL_023 - Verify all available options for Question 3 are displayed
for (const option of foodPrepOptions) {
  await expect(iadl1Page.getFoodPrepOption(option)).toBeVisible();
}

//TC_IADL_024 - Verify user can select the configured answer for Question 3
await iadl1Page.selectFoodPrepOption(selectedFoodPrepOption);

//TC_IADL_025 - Verify user can proceed from Question 3 to Question 4 and progress counter updates
await nextButton.click();
await expect(
  iadl1Page.getQuestionProgress(4, targetIadlAssessment.questionProgressTotal)
).toBeVisible();

//question 4
//TC_IADL_026 - Verify Question 4 - Housekeeping - is displayed
await expect(iadl1Page.getHousekeepingQuestion(housekeepingQuestion)).toBeVisible();

//TC_IADL_027 - Verify all available options for Question 4 are displayed
for (const option of housekeepingOptions) {
  await expect(iadl1Page.getHousekeepingOption(option)).toBeVisible();
}

//TC_IADL_028 - Verify user can select the configured answer for Question 4
await iadl1Page.selectHousekeepingOption(selectedHousekeepingOption);

//TC_IADL_029 - Verify user can proceed from Question 4 to Question 5 and progress counter updates
await nextButton.click();
await expect(
  iadl1Page.getQuestionProgress(5, targetIadlAssessment.questionProgressTotal)
).toBeVisible();

//question 5
//TC_IADL_030 - Verify Question 5 - Laundry - is displayed
await expect(iadl1Page.getLaundryQuestion(laundryQuestion)).toBeVisible();

//TC_IADL_031 - Verify all available options for Question 5 are displayed
for (const option of laundryOptions) {
  await expect(iadl1Page.getLaundryOption(option)).toBeVisible();
}

//TC_IADL_032 - Verify user can select the configured answer for Question 5
await iadl1Page.selectLaundryOption(selectedLaundryOption);

//TC_IADL_033 - Verify user can proceed from Question 5 to Question 6 and progress counter updates
await nextButton.click();
await expect(
  iadl1Page.getQuestionProgress(6, targetIadlAssessment.questionProgressTotal)
).toBeVisible();

//question 6
//TC_IADL_034 - Verify Question 6 - Transportation - is displayed
await expect(iadl1Page.getTransportationQuestion(transportationQuestion)).toBeVisible();

//TC_IADL_035 - Verify all available options for Question 6 are displayed
for (const option of transportationOptions) {
  await expect(iadl1Page.getTransportationOption(option)).toBeVisible();
}

//TC_IADL_036 - Verify user can select the configured answer for Question 6
await iadl1Page.selectTransportationOption(selectedTransportationOption);

//TC_IADL_037 - Verify user can proceed from Question 6 to Question 7 and progress counter updates
await nextButton.click();
await expect(
  iadl1Page.getQuestionProgress(7, targetIadlAssessment.questionProgressTotal)
).toBeVisible();

//question 7
//TC_IADL_038 - Verify Question 7 - Managing Medications - is displayed
await expect(iadl1Page.getMedicationsQuestion(medicationsQuestion)).toBeVisible();

//TC_IADL_039 - Verify all available options for Question 7 are displayed
for (const option of medicationsOptions) {
  await expect(iadl1Page.getMedicationsOption(option)).toBeVisible();
}

//TC_IADL_040 - Verify user can select the configured answer for Question 7
await iadl1Page.selectMedicationsOption(selectedMedicationsOption);

//TC_IADL_041 - Verify user can proceed from Question 7 to Question 8 and progress counter updates
await nextButton.click();
await expect(
  iadl1Page.getQuestionProgress(8, targetIadlAssessment.questionProgressTotal)
).toBeVisible();

//question 8
//TC_IADL_042 - Verify Question 8 - Managing Finances - is displayed
await expect(iadl1Page.getFinancesQuestion(financesQuestion)).toBeVisible();

//TC_IADL_043 - Verify all available options for Question 8 are displayed
for (const option of financesOptions) {
  await expect(iadl1Page.getFinancesOption(option)).toBeVisible();
}

//TC_IADL_044 - Verify user can select the configured answer for Question 8 and Submit button becomes enabled
await iadl1Page.selectFinancesOption(selectedFinancesOption);

await expect(iadl1Page.getSubmitButton()).toBeEnabled();

//TC_IADL_045 - Verify user can navigate back from Question 8 to Question 7 and change the answer

await iadl1Page.clickQuestionBackButton();

await expect(
  iadl1Page.getQuestionProgress(7, targetIadlAssessment.questionProgressTotal)
).toBeVisible();

await expect(iadl1Page.getMedicationsQuestion(medicationsQuestion)).toBeVisible();

await iadl1Page.selectMedicationsOption(updatedMedicationsOption);

// Proceed back to Question 8 after updating the Question 7 answer
await nextButton.click();
await expect(
  iadl1Page.getQuestionProgress(8, targetIadlAssessment.questionProgressTotal)
).toBeVisible();

//TC_IADL_046 - Verify user can select the answer for Question 8 and submit the assessment

await expect(iadl1Page.getFinancesQuestion(financesQuestion)).toBeVisible();

await iadl1Page.selectFinancesOption(selectedFinancesOption);

await expect(iadl1Page.getSubmitButton()).toBeEnabled();
await iadl1Page.clickSubmitButton();
// TC_IADL_047 - Verify assessment submission confirmation is displayed after successful submission
await expect(
  page.getByRole('alert').filter({
    hasText: 'Assessment Submitted',
  })
).toBeVisible();

//TC_IADL_048 - Refresh current page to load Assessment and Assessment Report cards
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_IADL_049 - Verify completed assessment card displays the expected completion status
await expect(
  iadl1Page.getAssessmentStatusByTitle(
    completionSummary.assessmentTitle,
    completionSummary.status
  )
).toHaveText(completionSummary.status);
await backArrow.click();
await page.reload({ waitUntil: 'domcontentloaded' });

// TC_IADL_050 - On the dashboard, open the first IADL card with Completed status
const firstCompletedIadlAssessment = iadlData.firstCompletedIadlAssessment;

await expect(
  iadl1Page.getAssessmentStatusByTitle(
    firstCompletedIadlAssessment.title,
    firstCompletedIadlAssessment.status
  )
).toHaveText(firstCompletedIadlAssessment.status);

await iadl1Page.clickAssessmentCardByStatus(
  firstCompletedIadlAssessment.title,
  firstCompletedIadlAssessment.status
);

// TC_IADL_051 - Download the report from the completed IADL assessment page
const assessmentReport = iadlData.assessmentReport;
const downloadButton = iadl1Page.getAssessmentReportDownloadButton(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);

await expect(downloadButton).toBeVisible();
await expect(downloadButton).toBeEnabled();

await iadl1Page.clickAssessmentReportDownload(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);
await page.waitForTimeout(6000);
 // waits until the download is finished
await page.close();







})
})