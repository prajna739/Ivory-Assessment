import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { ADHDLocators } from '../pages/Locaters/ADHD.locators';
import { ADHDPage } from '../pages/Pages/ADHD.Page';
import loginData from '../testdata/AssloginData.json';
import adhdData from '../testdata/ADHDData.json';
const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });


  test('ADHD Assessment (Kids and Teens)', async ({ page }) => {
    test.setTimeout(120_000)
    const adhdPage = new ADHDPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText =ADHDLocators.dashboardText(page);
    const targetAdhdAssessment = adhdData.adhdAssessment;
    const assTitle = adhdPage.getAssessmentTitleByStatus(
      targetAdhdAssessment.title,
      targetAdhdAssessment.status
    );
    
    const kebabTitle= ADHDLocators.kebabTitle(page);
    const kebabTime= ADHDLocators.kebabTime(page);
    const backArrow= ADHDLocators.backArrow(page);
    const  clickStart= ADHDLocators.clickStart(page);
    const tabTitle= ADHDLocators.tabTitle(page);
    const tabSubTitle =ADHDLocators.tabSubTitle(page);
    const tabDiscription=ADHDLocators.tabDiscription(page);
    const questionCount= ADHDLocators.questionCount(page);
    const cancelIcon = ADHDLocators.cancelIcon(page);
    const beginAss= ADHDLocators.beginAss(page);
    // question 1 data
    const childQuestion = adhdData.childQuestion;
    const childOptions = adhdData.childOptions;
    const selectedChildOption = adhdData.selectedChildOption ?? childOptions[0];
    const nextButton = ADHDLocators.nextButton(page);
    // ---------- profile----------
    const profileTitle = adhdPage.profileTitle;
    const profileDescription = adhdPage.profileDescription;
    const fullName = adhdPage.fullName;
    const dateofBirth = adhdPage.dateofBirth;
    const genderDetail = adhdPage.genderDetail;

    // ---------- results----------
    const Mixedscore = adhdPage.getMixedscore(adhdData.resultActions.Mixedscore);
    const assessmentReport = adhdData.assessmentReport;

    


  //TC_ADHD_001 - Verify user can login successfully using a valid phone number and static OTP
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

//TC_ADHD_002 - Verify dashboard loads with correct greeting text for logged-in user

await expect(dashboardText).toBeVisible();
//TC_ADHD_003 - Verify assessment card displays title, Added on date, partner name and status
await expect(assTitle).toBeVisible();

//verify the assessment created date
const adhdAddedOnDate = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
);

await expect(adhdAddedOnDate).toHaveText(
  /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
);


//verify the partner name for ISI

const adhdPartnerName = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "by")][1]'
);

await expect(adhdPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

//TC_ADHD_004 - Verify new assessment shows "YET TO BE STARTED"/In progress status

await expect(
  adhdPage.getAssessmentStatusByTitle(
    targetAdhdAssessment.title,
    targetAdhdAssessment.status
  )
).toHaveText(
  targetAdhdAssessment.status
);

//TC_ADHD_005 - Verify clicking assessment card opens intro modal
await adhdPage.clickAssessmentCardByStatus(
  targetAdhdAssessment.title,
  targetAdhdAssessment.status
);

//TC_ADHD_006 - Verify kebab menu is clickable and displays expected options (title and time)
await expect(kebabTitle).toBeVisible();
//Verify the timing
await expect(kebabTime).toBeVisible();

//TC_ADHD_007 - Verify back arrow navigates to previous screen

await backArrow.click();
await page.waitForTimeout(2000);

//TC_ADHD_008- Re-open the assessment card to continue with the Start flow
await adhdPage.clickAssessmentCardByStatus(
  targetAdhdAssessment.title,
  targetAdhdAssessment.status
);
//TC_ADHD_009- Verify the Start option opens the assessment info modal
await  clickStart.click();

//TC_ADHD_010- Verify modal displays title, subtitle, description, question count, time estimate and instructions
//title

await expect(tabTitle).toBeVisible();
//subtitle
await expect(tabSubTitle).toBeVisible();
//Description
await expect(tabDiscription).toBeVisible();
//Question count
await expect(questionCount).toBeVisible();
//TC_ADHD_011 - Verify X button closes modal without starting assessment
await cancelIcon.click();
// Re-open the Start modal to proceed with Begin Assessment
await  clickStart.click();

//TC_ADHD_012 - Verify the Begin Assessment option starts the assessment
await beginAss.click();

// TC_ADHD_013 - Verify the first question progress counter is displayed correctly
await expect(
  adhdPage.getQuestionProgress(1, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

// question 1
//TC_ADHD_014 - Verify Question 1 
await expect(adhdPage.getChildQuestion(childQuestion)).toBeVisible();

//TC_ADHD_015 - Verify all available options for Question 2 are displayed
for (const option of childOptions) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}

//TC_ADHD_016 - Verify user can select the configured answer for Question 2
await adhdPage.selectChildOption(selectedChildOption);

//TC_ADHD_017 - Verify user can proceed from Question 1 to Question 2 and progress counter updates
await nextButton.click();
await expect(
  adhdPage.getQuestionProgress(2, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();
await page.waitForTimeout(2000);
//TC_ADHD_018-question 2
await expect(adhdPage.getChildQuestion(adhdData.q2Question)).toBeVisible();
//TC_ADHD_019 - Verify user can select the configured answer for Question 2
for (const option of adhdData.q2Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
//TC_ADHD_020 - Verify user can proceed from Question 2 to Question 3 and progress counter updates
await adhdPage.selectChildOption(adhdData.selectedQ2Option);
await nextButton.click();
await expect(
  adhdPage.getQuestionProgress(3, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_021-question 3
await expect(adhdPage.getChildQuestion(adhdData.q3Question)).toBeVisible();
//TC_ADHD_022 - Verify user can select the configured answer for Question 3
for (const option of adhdData.q3Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
//TC_ADHD_023 - Verify user can proceed from Question 3 to Question 4 and progress counter updates
await adhdPage.selectChildOption(adhdData.selectedQ3Option);
await nextButton.click();
await expect(
  adhdPage.getQuestionProgress(4, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_024-question 4
await expect(adhdPage.getChildQuestion(adhdData.q4Question)).toBeVisible();
//TC_ADHD_025 - Verify user can select the configured answer for Question 4
for (const option of adhdData.q4Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ4Option);
await nextButton.click();
//TC_ADHD_026 - Verify user can proceed from Question 4 to Question 5 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(5, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_027-question 5
await expect(adhdPage.getChildQuestion(adhdData.q5Question)).toBeVisible();
//TC_ADHD_028 - Verify user can select the configured answer for Question 5
for (const option of adhdData.q5Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ5Option);
await nextButton.click();
//TC_ADHD_029 - Verify user can proceed from Question 5 to Question 6 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(6, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_030-question 6
await expect(adhdPage.getChildQuestion(adhdData.q6Question)).toBeVisible();
//TC_ADHD_031 - Verify user can select the configured answer for Question 6
for (const option of adhdData.q6Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ6Option);
await nextButton.click();
//TC_ADHD_032 - Verify user can proceed from Question 6 to Question 7 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(7, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_033-question 7
await expect(adhdPage.getChildQuestion(adhdData.q7Question)).toBeVisible();
//TC_ADHD_034 - Verify user can select the configured answer for Question 7
for (const option of adhdData.q7Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ7Option);
await nextButton.click();
//TC_ADHD_035 - Verify user can proceed from Question 7 to Question 8 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(8, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_036-question 8
await expect(adhdPage.getChildQuestion(adhdData.q8Question)).toBeVisible();
//TC_ADHD_037 - Verify user can select the configured answer for Question 8
for (const option of adhdData.q8Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ8Option);
await nextButton.click();
//TC_ADHD_038 - Verify user can proceed from Question 8 to Question 9 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(9, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_039-question 9
await expect(adhdPage.getChildQuestion(adhdData.q9Question)).toBeVisible();
//TC_ADHD_040 - Verify user can select the configured answer for Question 9
for (const option of adhdData.q9Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ9Option);
await nextButton.click();
//TC_ADHD_041 - Verify user can proceed from Question 9 to Question 10 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(10, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_042-question 10
await expect(adhdPage.getChildQuestion(adhdData.q10Question)).toBeVisible();
//TC_ADHD_043 - Verify user can select the configured answer for Question 10
for (const option of adhdData.q10Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ10Option);
await nextButton.click();
//TC_ADHD_044 - Verify user can proceed from Question 10 to Question 11 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(11, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_045-question 11
await expect(adhdPage.getChildQuestion(adhdData.q11Question)).toBeVisible();
//TC_ADHD_046 - Verify user can select the configured answer for Question 11
for (const option of adhdData.q11Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ11Option);
await nextButton.click();
//TC_ADHD_047 - Verify user can proceed from Question 11 to Question 12 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(12, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_048-question 12
await expect(adhdPage.getChildQuestion(adhdData.q12Question)).toBeVisible();
//TC_ADHD_049 - Verify user can select the configured answer for Question 12
for (const option of adhdData.q12Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ12Option);
await nextButton.click();
//TC_ADHD_050 - Verify user can proceed from Question 12 to Question 13 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(13, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_051-question 13
await expect(adhdPage.getChildQuestion(adhdData.q13Question)).toBeVisible();
//TC_ADHD_052 - Verify user can select the configured answer for Question 13
for (const option of adhdData.q13Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ13Option);
await nextButton.click();
//TC_ADHD_053 - Verify user can proceed from Question 13 to Question 14 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(14, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_054-question 14
await expect(adhdPage.getChildQuestion(adhdData.q14Question)).toBeVisible();
//TC_ADHD_055 - Verify user can select the configured answer for Question 14
for (const option of adhdData.q14Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ14Option);
await nextButton.click();
//TC_ADHD_056 - Verify user can proceed from Question 14 to Question 15 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(15, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_057-question 15
await expect(adhdPage.getChildQuestion(adhdData.q15Question)).toBeVisible();
//TC_ADHD_058 - Verify user can select the configured answer for Question 15
for (const option of adhdData.q15Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ15Option);
await nextButton.click();
//TC_ADHD_059 - Verify user can proceed from Question 15 to Question 16 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(16, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_060-question 16
await expect(adhdPage.getChildQuestion(adhdData.q16Question)).toBeVisible();
//TC_ADHD_061 - Verify user can select the configured answer for Question 16
for (const option of adhdData.q16Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ16Option);
await nextButton.click();
//TC_ADHD_062 - Verify user can proceed from Question 16 to Question 17 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(17, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_063-question 17
await expect(adhdPage.getChildQuestion(adhdData.q17Question)).toBeVisible();
//TC_ADHD_064 - Verify user can select the configured answer for Question 17
for (const option of adhdData.q17Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ17Option);
await nextButton.click();
//TC_ADHD_065 - Verify user can proceed from Question 17 to Question 18 and progress counter updates
await expect(
  adhdPage.getQuestionProgress(18, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_066-question 18
await expect(adhdPage.getChildQuestion(adhdData.q18Question)).toBeVisible();
//TC_ADHD_067 - Verify user can select the configured answer for Question 18
for (const option of adhdData.q18Options) {
  await expect(adhdPage.getChildOption(option)).toBeVisible();
}
await adhdPage.selectChildOption(adhdData.selectedQ18Option);
//TC_ADHD_068 - Verify Submit button is enabled after answering Question 18
await expect(adhdPage.getSubmitButton()).toBeEnabled();

//TC_ADHD_069 - Verify user can navigate back from Question 18 to Question 17 and change the answer
await adhdPage.clickQuestionBackButton();

await expect(
  adhdPage.getQuestionProgress(17, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

await expect(adhdPage.getChildQuestion(adhdData.q17Question)).toBeVisible();

await adhdPage.selectChildOption(adhdData.updatedQ17Option);

await nextButton.click();
await expect(
  adhdPage.getQuestionProgress(18, targetAdhdAssessment.questionProgressTotal)
).toBeVisible();

//TC_ADHD_070 - Verify user can select the answer for Question 18 and submit the assessment
await expect(adhdPage.getChildQuestion(adhdData.q18Question)).toBeVisible();

await adhdPage.selectChildOption(adhdData.selectedQ18Option);

await expect(adhdPage.getSubmitButton()).toBeEnabled();
await adhdPage.clickSubmitButton();

await page.waitForTimeout(2000);
/*// =====================================================
// Continue
    // =====================================================

    await adhdPage.clickContinue();

    await page.waitForTimeout(2000);*/

  // =====================================================
  // TC_ADHD_071-Profile Details
  // =====================================================

    await expect(profileTitle).toBeVisible();

    await expect(profileDescription).toBeVisible();

    await expect(fullName).toBeVisible();

    await expect(dateofBirth).toBeVisible();

    await expect(genderDetail).toBeVisible();

    // =====================================================
    // TC_ADHD_072-Continue From Profile
    // =====================================================

    await adhdPage.clickContinue();

    await page.waitForTimeout(11_000);

    // =====================================================
    // TC_ADHD_073-Mixed Score
    // =====================================================

    await expect(Mixedscore).toBeVisible({ timeout: 30_000 });
    // FIX: was "Mixedscores.click()" (typo)
    await Mixedscore.click();
    
    // =====================================================
    // TC_ADHD_074-Report Download
    // =====================================================

    // "Generating Your Report..." screen appears first, so wait for the report button
    const reportDownloadButton = adhdPage.getAssessmentReportDownloadButton(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );
    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    const result = await adhdPage.downloadAssessmentReport(
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


  })
})