import { test, expect } from '@playwright/test';

import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';

import { COGLocators } from '../pages/Locaters/COG.locators';

import { COGPage } from '../pages/Pages/COG.Page';

import loginData from '../testdata/AssloginData.json';

import cogData from '../testdata/COGData.json';


const LOGIN_URL =
  'https://test-assess.liveivory.com/login';


test.describe('Ivory-COG', () => {


  // =====================================================
  // Before Each
  // =====================================================

  test.beforeEach(async ({ page }) => {

    await page.goto(
      LOGIN_URL,
      {
        waitUntil: 'domcontentloaded',
        timeout: 60_000
      }
    );
  });


  // =====================================================
  // COG Assessment
  // =====================================================

  test(
    'COG Assessment',
    async ({ page }) => {

      test.setTimeout(120_000);


      // =================================================
      // Page Object
      // =================================================

      const cogPage =
        new COGPage(page);


      // =================================================
      // Login Locators
      // =================================================

      const loginPhoneInput =
        AssLoginLocators.LoginPhoneInput(page);

      const loginSendOtpButton =
        AssLoginLocators.loginSendOtpButton(page);

      const loginPinInputs =
        AssLoginLocators.loginPinInputs(page);


      // =================================================
      // Dashboard
      // =================================================

      const dashboardText =
        COGLocators.dashboardText(page);


      // =================================================
      // COG Assessment Data
      // =================================================

      const targetCogAssessment =
        cogData.cogAssessment;


      const assTitle =
        cogPage.getAssessmentTitleByStatus(
          targetCogAssessment.title,
          targetCogAssessment.status
        );


      // =================================================
      // TC_ISI_001
      // Login
      // =================================================

      await loginPhoneInput.fill(
        loginData.phoneNumbers.valid
      );


      await loginSendOtpButton.click();


      await expect(
        page.getByRole(
          'heading',
          {
            name: /verify phone/i
          }
        )
      ).toBeVisible();


      await expect(
        loginPinInputs
      ).toHaveCount(6);


      for (
        const [index, digit]
        of [...loginData.otp.staticOtp].entries()
      ) {

        await loginPinInputs
          .nth(index)
          .fill(digit);
      }


      // =================================================
      // TC_ISI_002
      // Dashboard
      // =================================================

      await expect(
        dashboardText
      ).toBeVisible();


      // =================================================
      // TC_ISI_003
      // Assessment Card
      // =================================================

      await expect(
        assTitle
      ).toBeVisible();


      const cogAddedOnDate =
        assTitle.locator(
          'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
        );


      await expect(
        cogAddedOnDate
      ).toHaveText(
        /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
      );


      const cogPartnerName =
        assTitle.locator(
          'xpath=following::p[starts-with(normalize-space(), "by")][1]'
        );


      await expect(
        cogPartnerName
      ).toHaveText(
        /^\s*by\s+\S[\s\S]*$/
      );


      // =================================================
      // TC_ISI_004
      // Assessment Status
      // =================================================

      await expect(
        cogPage.getAssessmentStatusByTitle(
          targetCogAssessment.title,
          targetCogAssessment.status
        )
      ).toHaveText(
        targetCogAssessment.status
      );


      // =================================================
      // TC_ISI_005
      // Open Assessment
      // =================================================

      await cogPage.clickAssessmentCardByStatus(
        targetCogAssessment.title,
        targetCogAssessment.status
      );


      // =================================================
      // Resume
      // =================================================

      await cogPage.clickResume();


      // =================================================
      // Continue
      // =================================================

      await cogPage.clickContinue();


      await page.waitForTimeout(2000);


      await cogPage.clickContinue();

      await page.waitForTimeout(11000);
      // =================================================
      // COG GAME
      // =================================================


      // -------------------------------------------------
      // STEP 1
      // Click first Start
      // -------------------------------------------------

      await cogPage.clickStart();


      // -------------------------------------------------
      // STEP 2
      // Practice popup -> Start
      // -------------------------------------------------

      await cogPage.clickPracticeStart();


      // -------------------------------------------------
      // STEP 3
      // Click center of practice box 5 times
      // -------------------------------------------------

      await cogPage.clickPracticeBox(
        cogData.game.practiceClicks
      );


      // -------------------------------------------------
      // STEP 4
      // "Are you ready to start the test?"
      // -> Yes, start the test
      // -------------------------------------------------

      await cogPage.clickYesStartTest();


      // -------------------------------------------------
      // STEP 5
      // Remember popup -> Start
      // -------------------------------------------------

      await cogPage.clickRememberStart();


      // -------------------------------------------------
      // STEP 6
      // Wait until measurement starts
      //
      // Video shows 5-second countdown.
      // We wait for "Dexterity: XX%" instead of using
      // a hard-coded wait.
      // -------------------------------------------------

      await cogPage.waitForMeasurementToStart();


      // -------------------------------------------------
      // STEP 7
      // Click center of main game box 10 times
      // -------------------------------------------------

      await cogPage.clickMainGameBox(
        cogData.game.mainGameClicks
      );


      // -------------------------------------------------
      // STEP 8
      // Capture Dexterity
      // -------------------------------------------------

      const dexterity =
        await cogPage.getDexterity();


      console.log(
        `Final Dexterity: ${dexterity}`
      );


      // -------------------------------------------------
      // Optional:
      // Verify Task 2 of 5
      // -------------------------------------------------

      const currentTask =
        await cogPage.getCurrentTask();


      console.log(
        `Current task after tapping: ${currentTask}`
      );
await page.waitForTimeout(5000);
await cogPage.clickStart();
await page.waitForTimeout(2000);

// ==================== GAME 2 ====================

// Step 1: Click Start on Practice popup
await cogPage.clickPracticeStart();

// Step 2: Right-click the center of the circle 3 times
await cogPage.clickGame2PracticeCircle(
  cogData.game2.practiceClicks
);

// Step 3: Click "Yes, start the test"
await cogPage.clickYesStartTest();

// Step 4: Click Start on Remember popup
await cogPage.clickRememberStart();

// Step 5: Click the center of the circle 23 times
await cogPage.clickGame2MainCircle(
  cogData.game2.mainGameClicks
);
    }
  );
});