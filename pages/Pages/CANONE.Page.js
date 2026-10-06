import { expect } from '@playwright/test';
import { CANONELocators } from '../Locaters/CANONE.locators';

export class CANONEPage {
  constructor(page) {
    this.page = page;

    // Dashboard / Assessment
    this.dashboardText = CANONELocators.dashboardText(page);
    this.assTitle = CANONELocators.assTitle(page);
    this.assCardClick = CANONELocators.assCardClick(page);
    this.startOrResumeButton = CANONELocators.startOrResumeButton(page);
    this.continueButton = CANONELocators.continueButton(page);

    // Profile
    this.profileTitle = CANONELocators.profileTitle(page);
    this.profileDescription = CANONELocators.profileDescription(page);
    this.fullName = CANONELocators.fullName(page);
    this.dateofBirth = CANONELocators.dateofBirth(page);
    this.genderDetail = CANONELocators.genderDetail(page);
    this.levelEducation = CANONELocators.levelEducation(page);
    this.preferedLan = CANONELocators.preferedLan(page);

    // Results
    this.completeWithMixedScores = CANONELocators.completeWithMixedScores(page);
    this.downloadButton = CANONELocators.downloadButton(page);
  }

  getAssessmentTitleByStatus(title, status) {
    return CANONELocators.assessmentTitleByStatus(this.page, title, status);
  }

  getAssessmentStatusByTitle(title, status) {
    return CANONELocators.assessmentStatusByTitle(this.page, title, status);
  }

  async clickAssessmentCardByStatus(title, status) {
    await CANONELocators
      .assessmentCardClickByStatus(this.page, title, status)
      .click();
  }

  async clickStartOrResume() {
    await expect(this.startOrResumeButton).toBeVisible({ timeout: 30_000 });
    await this.startOrResumeButton.click();
  }

  async VerifyprofileTitle() {
    return this.profileTitle.isVisible();
  }

  async VerifyprofileDescription() {
    return this.profileDescription.isVisible();
  }

  async VerifyfullName() {
    return this.fullName.isVisible();
  }

  async VerifydateofBirth() {
    return this.dateofBirth.isVisible();
  }

  async VerifygenderDetail() {
    return this.genderDetail.isVisible();
  }

  async VerifylevelEducation() {
    return this.levelEducation.isVisible();
  }

  async VerifypreferedLan() {
    return this.preferedLan.isVisible();
  }

  async clickContinue() {
    await this.continueButton.waitFor({ state: 'visible', timeout: 30_000 });
    await this.continueButton.click();
  }

  async clickcompleteWithMixedScores() {
    await this.completeWithMixedScores.click();
  }

  async clickDownloadButton() {
    await this.downloadButton.click();
  }

  getAssessmentReportDownloadButton(reportTitle, buttonName) {
    return CANONELocators.assessmentReportDownloadButton(
      this.page,
      reportTitle,
      buttonName
    );
  }

  async clickAssessmentReportDownload(reportTitle, buttonName) {
    await this.getAssessmentReportDownloadButton(reportTitle, buttonName).click();
  }

  /**
   * Clicks the report Download button and waits for whichever happens first:
   *  - a browser download          -> { kind: 'download', download }
   *  - the report opening in a tab -> { kind: 'popup', page }
   * Listeners are registered BEFORE the click so no event is missed.
   */
  async downloadAssessmentReport(reportTitle, buttonName, timeout = 60_000) {
    const button = this.getAssessmentReportDownloadButton(reportTitle, buttonName);
    await expect(button).toBeVisible({ timeout: 90_000 });
    await expect(button).toBeEnabled();

    const downloadPromise = this.page
      .waitForEvent('download', { timeout })
      .then((download) => ({ kind: 'download', download }));

    const popupPromise = this.page
      .context()
      .waitForEvent('page', { timeout })
      .then((popup) => ({ kind: 'popup', page: popup }));

    // Avoid unhandled rejections from whichever promise loses
    downloadPromise.catch(() => {});
    popupPromise.catch(() => {});

    await button.click();

    let result;
    try {
      result = await Promise.any([downloadPromise, popupPromise]);
    } catch {
      throw new Error(
        `Clicking "${buttonName}" for "${reportTitle}" triggered neither a download nor a new tab within ${timeout}ms. ` +
        'Open the trace Network tab: the report API may be failing, or the file may open in the same tab.'
      );
    }

    if (result.kind === 'popup') {
      await result.page.waitForLoadState('domcontentloaded');
    }

    return result;
  }
}