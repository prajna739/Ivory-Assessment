import { test, expect } from '@playwright/test';

import { AssLoginLocators } from '../pages/Locaters/AssLogin.locators';
import { TMTLocators } from '../pages/Locaters/TMT.locators';
import { TMTPage } from '../pages/Pages/TMT.Page';

import loginData from '../testdata/AssloginData.json';
import tmtData from '../testdata/TMTData.json';

// URL now comes from test data (testdata/AssloginData.json -> urls.login)
const LOGIN_URL = loginData.urls.login;

test.describe('Ivory-AssLogin', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('Trail Making Test (TMT)', async ({ page }) => {

    // Raised from 120s: fixed waits (16s) + report generation + download
    test.setTimeout(180_000);

    // =====================================================
    // Page Object
    // =====================================================

    const tmtPage = new TMTPage(page);

    // =====================================================
    // Login Locators
    // =====================================================

    const loginPhoneInput =
      AssLoginLocators.LoginPhoneInput(page);

    const loginSendOtpButton =
      AssLoginLocators.loginSendOtpButton(page);

    const loginPinInputs =
      AssLoginLocators.loginPinInputs(page);

    // =====================================================
    // DIY Locators
    // =====================================================

    const dashboardText =
      TMTLocators.dashboardText(page);

    const profileTitle =
      TMTLocators.profileTitle(page);

    const profileDescription =
      TMTLocators.profileDescription(page);

    const fullName =
      TMTLocators.fullName(page);

    const dateofBirth =
      TMTLocators.dateofBirth(page);

    const genderDetail =
      TMTLocators.genderDetail(page);

    // =====================================================
    // Test Data
    // =====================================================

    const targetTMTAssessment =
      tmtData.tmtAssessment;

    const validAssessmentStatuses =
      tmtData.assessmentStatuses;

    // FIX: these were used later in the test but never declared
    const resultActions =
      tmtData.resultActions;

    const assessmentReport =
      tmtData.assessmentReport;

    // Mixed score option (name comes from test data)
    const Mixedscore =
      tmtPage.getMixedscore(resultActions.Mixedscore);

    // =====================================================
    // Validate Test Data
    // =====================================================

    expect(
      targetTMTAssessment,
      'Missing diyAssessment in test data'
    ).toBeDefined();

    expect(
      targetTMTAssessment.title,
      'Missing assessment title in test data'
    ).toBeDefined();

    // =====================================================
    // Assessment Title
    // =====================================================

    const assTitle =
      tmtPage.getAssessmentTitleByStatus(
        targetTMTAssessment.title,
        validAssessmentStatuses
      );

    // =====================================================
    // Login
    // =====================================================

    await loginPhoneInput.fill(
      loginData.phoneNumbers.valid
    );

    await loginSendOtpButton.click();

    // Verify OTP screen
    await expect(
      page.getByRole('heading', {
        name: /verify phone/i,
      })
    ).toBeVisible();

    // Verify six OTP fields
    await expect(loginPinInputs).toHaveCount(6);

    // =====================================================
    // Enter OTP
    // =====================================================

    const otp = loginData.otp.staticOtp;

    expect(
      otp,
      'Static OTP must contain exactly 6 digits'
    ).toMatch(/^\d{6}$/);

    for (const [index, digit] of [...otp].entries()) {
      await loginPinInputs
        .nth(index)
        .fill(digit);
    }

    // =====================================================
    // Dashboard
    // =====================================================

    await expect(dashboardText).toBeVisible();

    // =====================================================
    // Assessment Card
    // =====================================================

    await expect(assTitle).toBeVisible();

    // =====================================================
    // Added On Date
    // =====================================================

    const diyAddedOnDate =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "Added on ")][1]'
      );

    await expect(diyAddedOnDate).toHaveText(
      /^Added on \d{1,2} [A-Za-z]+ \d{4}$/
    );

    // =====================================================
    // Partner Name
    // =====================================================

    const diyPartnerName =
      assTitle.locator(
        'xpath=following::p[starts-with(normalize-space(), "by")][1]'
      );

    await expect(diyPartnerName).toHaveText(
      /^\s*by\s+\S[\s\S]*$/
    );

    // =====================================================
    // Assessment Status
    // =====================================================

    await expect(
      tmtPage.getAssessmentStatusByTitle(
        targetTMTAssessment.title,
        validAssessmentStatuses
      )
    ).toContainText(
      /Yet to be Started|In Progress/
    );

    // =====================================================
    // Open Assessment
    // =====================================================

    await tmtPage.clickAssessmentCardByStatus(
      targetTMTAssessment.title,
      validAssessmentStatuses
    );


    // =====================================================
    // Resume
    // =====================================================

    // Start or Resume, whichever button is shown
    await tmtPage.clickStartOrResume();
    await page.waitForTimeout(3000);

    // =====================================================
    // Continue
    // =====================================================

    await tmtPage.clickContinue();

    await page.waitForTimeout(2000);

    // =====================================================
    // Profile Details
    // =====================================================

    await expect(profileTitle).toBeVisible();

    await expect(profileDescription).toBeVisible();

    await expect(fullName).toBeVisible();

    await expect(dateofBirth).toBeVisible();

    await expect(genderDetail).toBeVisible();

    // =====================================================
    // Continue From Profile
    // =====================================================

    await tmtPage.clickContinue();

    await page.waitForTimeout(11_000);

    // =====================================================
    // Mixed Score (Assessment simulator inside the iframe)
    // =====================================================

    await expect(Mixedscore).toBeVisible({ timeout: 30_000 });
    // FIX: was "Mixedscores.click()" (typo)
    await Mixedscore.click();

    // =====================================================
    // Report Download
    // =====================================================

    // "Generating Your Report..." screen appears first, so wait for the report button
    const reportDownloadButton = tmtPage.getAssessmentReportDownloadButton(
      assessmentReport.title,
      assessmentReport.downloadButtonName
    );
    await expect(reportDownloadButton).toBeVisible({ timeout: 90_000 });
    await expect(reportDownloadButton).toBeEnabled();

    const result = await tmtPage.downloadAssessmentReport(
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
  });
});