import { test, expect } from '@playwright/test';
import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { COGCHECKLocators } from '../pages/Locaters/COGCHECK.locators';
import { COGCHECKPage } from '../pages/Pages/COGCHECK.Page';
import loginData from '../testdata/AssloginData.json';
import cogcheckData from '../testdata/COGCHECKData.json';
import { COGLocators } from '../pages/Locaters/COG.locators';
const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
  });

  test('COGCHECK login flow', async ({ page }) => {
    test.setTimeout(120_000);

    const cogcheckPage = new COGCHECKPage(page);
    const loginPhoneInput = AssLoginLocators.LoginPhoneInput(page);
    const loginSendOtpButton = AssLoginLocators.loginSendOtpButton(page);
    const loginPinInputs = AssLoginLocators.loginPinInputs(page);
    const dashboardText =COGCHECKLocators.dashboardText(page);
    const targetCogcheckAssessment = cogcheckData.cogcheckAssessment;
    const assTitle = cogcheckPage.getAssessmentTitleByStatus(
      targetCogcheckAssessment.title,
      targetCogcheckAssessment.status
    );
    
    const kebabTitle= COGCHECKLocators.kebabTitle(page);
    const kebabTime= COGCHECKLocators.kebabTime(page);
    const backArrow= COGCHECKLocators.backArrow(page);
    const  clickStart= COGCHECKLocators.clickStart(page);
    const tabTitle= COGCHECKLocators.tabTitle(page);
    const tabSubTitle =COGCHECKLocators.tabSubTitle(page);
    const tabDiscription=COGCHECKLocators.tabDiscription(page);
    const questionCount= COGCHECKLocators.questionCount(page);
    const questionDescription=COGCHECKLocators.questionDescription(page);
    const task2Title=COGCHECKLocators.task2Title(page);
    const task2Description=COGCHECKLocators.task2Description(page);
    const taskTime=COGCHECKLocators.taskTime(page);
    const taskTimeDescription=COGCHECKLocators.taskTimeDescription(page);
    const cancelIcon = COGCHECKLocators.cancelIcon(page);
    const beginAss= COGCHECKLocators.beginAss(page);
    //question 1 data
    const forgetQuestion = cogcheckData.forgetQuestion;
    const forgetOptions = cogcheckData.forgetOptions;
    const selectedForgetOption =
      forgetOptions.find((option) => option.number === 1) ?? forgetOptions[0];

    if (!selectedForgetOption) {
      throw new Error('COGCHECK question 1 option data is missing.');
    }
    const totalQuestions = targetCogcheckAssessment.questionProgressTotal;
    const assessmentQuestions = Array.isArray(cogcheckData.assessmentQuestions)
      ? cogcheckData.assessmentQuestions
      : [];

    if (!assessmentQuestions.length) {
      throw new Error('COGCHECK assessmentQuestions is missing or empty in testdata/COGCHECKData.json.');
    }
    const cancelSymbol=COGCHECKLocators.cancelSymbol(page);
    const resumeButton=COGCHECKLocators.resumeButton(page);
    const profileTitle=COGCHECKLocators.profileTitle(page);
    const profileDescription=COGCHECKLocators.profileDescription(page);
    const fullName=COGCHECKLocators.fullName(page);
    const dateofBirth=COGCHECKLocators.dateofBirth(page);
    const genderDetail=COGCHECKLocators.genderDetail(page);
    const levelEducation=COGCHECKLocators.levelEducation(page);
    const preferedLan=COGCHECKLocators.preferedLan(page);
    const continueButton=COGCHECKLocators.continueButton(page);
    const completeWithMixedScores=COGCHECKLocators.completeWithMixedScores(page);
    
    
    await loginPhoneInput.fill(loginData.phoneNumbers.valid);
    await loginSendOtpButton.click();

    await expect(
      page.getByRole('heading', { name: /verify phone/i })
    ).toBeVisible();

    await expect(loginPinInputs).toHaveCount(6);

    for (const [index, digit] of [...loginData.otp.staticOtp].entries()) {
      await loginPinInputs.nth(index).fill(digit);
    }
    //TC_Cogcheck_001 - Verify dashboard loads with correct greeting text for logged-in user

await expect(dashboardText).toBeVisible();
//TC_Cogcheck_002 - Verify assessment card displays title, Added on date, partner name and status
await expect(assTitle).toBeVisible();

//TC_Cogcheck_003-verify the assessment created date
const cogcheckAddedOnDate = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
);

await expect(cogcheckAddedOnDate).toHaveText(
  /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
);


//TC_Cogcheck_004-verify the partner name 

const cogcheckPartnerName = assTitle.locator(
  'xpath=following::p[starts-with(normalize-space(), "by")][1]'
);

await expect(cogcheckPartnerName).toHaveText(/^\s*by\s+\S[\s\S]*$/);

//TC_Cogcheck_005 - Verify new assessment shows "YET TO BE STARTED"/In progress status

await expect(
  cogcheckPage.getAssessmentStatusByTitle(
    targetCogcheckAssessment.title,
    targetCogcheckAssessment.status
  )
).toHaveText(
  targetCogcheckAssessment.status
);

//TC_Cogcheck_006 - Verify clicking assessment card opens intro modal
await cogcheckPage.clickAssessmentCardByStatus(
  targetCogcheckAssessment.title,
  targetCogcheckAssessment.status
);

//TC_Cogcheck_007 - Verify kebab menu is clickable and displays expected options (title and time)
await expect(kebabTitle).toBeVisible();
//TC_Cogcheck_008-Verify the timing
await expect(kebabTime).toBeVisible();

//TC_Cogcheck_009 - Verify back arrow navigates to previous screen

await backArrow.click();
await page.waitForTimeout(2000);

//TC_Cogcheck_010 Re-open the assessment card to continue with the Start flow
await cogcheckPage.clickAssessmentCardByStatus(
  targetCogcheckAssessment.title,
  targetCogcheckAssessment.status
);
//TC_Cogcheck_011 - Verify the Start option opens the assessment info modal
await  clickStart.click();

//TC_Cogcheck_012 - Verify modal displays title, subtitle, description, question count, time estimate and instructions
//title

await expect(tabTitle).toBeVisible();
//subtitle
await expect(tabSubTitle).toBeVisible();
//Description
await expect(tabDiscription).toBeVisible();
//Question count
await expect(questionCount).toBeVisible();
await expect(questionDescription).toBeVisible();
await expect(task2Title).toBeVisible();
await expect(task2Description).toBeVisible();
await expect(taskTime).toBeVisible();
await expect(taskTimeDescription).toBeVisible();
//TC_Cogcheck_013 - Verify X button closes modal without starting assessment
await cancelIcon.click();
// TC_Cogcheck_014-Re-open the Start modal to proceed with Begin Assessment
await  clickStart.click();

//TC_Cogcheck_015 - Verify the Begin Assessment option starts the assessment
await beginAss.click();

//TC_Cogcheck_016 - Verify the first question progress counter is displayed correctly
await expect(
  cogcheckPage.getQuestionProgress(1, targetCogcheckAssessment.questionProgressTotal)
).toBeVisible();
//Question 1

// TC_Cogcheck_017 - Verify Question 1 - Difficulty falling asleep - is displayed
await expect(cogcheckPage.getForgetQuestion(forgetQuestion)).toBeVisible();

// TC_Cogcheck_018 - Verify all available options for Question 1 are displayed
for (const option of forgetOptions) {
  await expect(cogcheckPage.getForgetOption(option)).toBeVisible();
}

//TC_Cogcheck_019- Log selected answer for Question 1 for reporting/debugging
console.log(
  `Selected answer: ${selectedForgetOption.number} - ${selectedForgetOption.text}`
);

// TC_Cogcheck_020 - Verify user can select the configured answer for Question 1
await cogcheckPage.selectForgetOption(selectedForgetOption);

// // TC_Cogcheck_021 - Verify the Next button is enabled after selecting an answer
await expect(cogcheckPage.getNextButton()).toBeEnabled();
//// TC_Cogcheck_022 - Verify user can proceed from Question 1 to Question 2 using Next
await cogcheckPage.clickNextButton();

// // TC_Cogcheck_025- Verify progress counter updates to Question 2
await expect(
  cogcheckPage.getQuestionProgress(2, targetCogcheckAssessment.questionProgressTotal)
).toBeVisible();


    // // TC_Cogcheck_026 - Verify and answer Questions 2 through 15
    for (const q of assessmentQuestions) {
      const isLastQuestion = q.number === totalQuestions;
      const selectedOption =
        cogcheckData.forgetOptions.find((o) => o.number === q.answer) ??
        cogcheckData.forgetOptions[0];

      // // TC_Cogcheck_027-Verify question text is displayed
      await expect(cogcheckPage.getForgetQuestion(q.text)).toBeVisible();

      // // TC_Cogcheck_028-Verify all options for this question are displayed
      for (const opt of cogcheckData.forgetOptions) {
        await expect(cogcheckPage.getForgetOption(opt)).toBeVisible();
      }

      //// TC_Cogcheck_029- Log and select the configured answer
      console.log(`Selected answer: ${selectedOption.number} - ${selectedOption.text}`);
      await cogcheckPage.selectForgetOption(selectedOption);

      if (!isLastQuestion) {
        await expect(cogcheckPage.getNextButton()).toBeEnabled();
        await cogcheckPage.clickNextButton();

        await expect(
          cogcheckPage.getQuestionProgress(q.number + 1, totalQuestions)
        ).toBeVisible();
      } else {
        //TC_Cogcheck_030-On Question 15 the Next button is replaced by Submit - don't submit yet
        await expect(cogcheckPage.getSubmitButton()).toBeEnabled();
      }
    }

    // TC_Cogcheck_031 - Verify Back navigates from Question 15 to Question 14
    await cogcheckPage.clickQuestionBackButton();
    await expect(
      cogcheckPage.getQuestionProgress(14, totalQuestions)
    ).toBeVisible();

    const question14 = assessmentQuestions.find((q) => q.number === 14);
    const revisedOption =
      cogcheckData.forgetOptions.find(
        (o) => o.number === cogcheckData.question14RevisedAnswer
      ) ?? cogcheckData.forgetOptions[0];

    await expect(cogcheckPage.getForgetQuestion(question14.text)).toBeVisible();

    // TC_Cogcheck_032 - Verify user can change the previously selected answer for Question 14
    console.log(`Revised answer: ${revisedOption.number} - ${revisedOption.text}`);
    await cogcheckPage.selectForgetOption(revisedOption);
    await expect(cogcheckPage.getNextButton()).toBeEnabled();
    await cogcheckPage.clickNextButton();

    // TC_Cogcheck_033 - Verify progress returns to Question 15 after re-confirming Question 14
    await expect(
      cogcheckPage.getQuestionProgress(15, totalQuestions)
    ).toBeVisible();

    const question15 = assessmentQuestions.find((q) => q.number === 15);
    const finalOption =
      cogcheckData.forgetOptions.find((o) => o.number === question15.answer) ??
      cogcheckData.forgetOptions[0];

    await expect(cogcheckPage.getForgetQuestion(question15.text)).toBeVisible();
    await cogcheckPage.selectForgetOption(finalOption);

    // TC_Cogcheck_034 - Verify Submit completes the assessment
    await expect(cogcheckPage.getSubmitButton()).toBeEnabled();
    await cogcheckPage.clickSubmitButton();
    await page.waitForTimeout(2000);
    await cancelSymbol.click();
    await resumeButton.click();
    await page.waitForTimeout(4000);
    await cogcheckPage.clickReadyContinue();
    await page.waitForTimeout(2000);
    await expect(profileTitle).toBeVisible();
    await expect(profileDescription).toBeVisible();
    await expect(fullName).toBeVisible(); 
    await expect(dateofBirth).toBeVisible();
    await expect(genderDetail).toBeVisible();
    await expect(levelEducation).toBeVisible();
    await expect(preferedLan).toBeVisible();
    await continueButton.click();

    await expect(completeWithMixedScores).toBeVisible({ timeout: 20_000 });
    await completeWithMixedScores.click();
    await page.waitForTimeout(15000);
   
    // TC_Cogcheck_035 - Download the report from the completed ISI assessment page
const assessmentReport = cogcheckData.assessmentReport;
const downloadButton = cogcheckPage.getAssessmentReportDownloadButton(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);

await expect(downloadButton).toBeVisible();
await expect(downloadButton).toBeEnabled();

await cogcheckPage.clickAssessmentReportDownload(
  assessmentReport.title,
  assessmentReport.downloadButtonName
);
await page.waitForTimeout(10000);
 // waits until the download is finished
await page.close();    // closes the website tab

    
  });
});
