import { expect } from '@playwright/test';
import { K12Locators } from '../Locaters/K12.locators';

export class K12Page {
  constructor(page) {
    this.page = page;

    // Dashboard
    this.dashboardText = K12Locators.dashboardText(page);

    // Assessment
    this.assTitle = K12Locators.assTitle(page);
    this.assCardClick = K12Locators.assCardClick(page);

    // Buttons
    this.startOrResumeButton = K12Locators.startOrResumeButton(page);
    this.continueButton = K12Locators.continueButton(page);

    // Profile
    this.profileTitle = K12Locators.profileTitle(page);
    this.profileDescription = K12Locators.profileDescription(page);
    this.fullName = K12Locators.fullName(page);
    this.dateofBirth = K12Locators.dateofBirth(page);
    this.genderDetail = K12Locators.genderDetail(page);

    // Results
    this.Mixedscore = K12Locators.Mixedscore(page);
    this.downloadButton = K12Locators.downloadButton(page);
  }

  // =====================================================
  // Assessment
  // =====================================================

  getAssessmentTitleByStatus(title, status) {
    return K12Locators.assessmentTitleByStatus(this.page, title, status);
  }

  getAssessmentStatusByTitle(title, status) {
    return K12Locators.assessmentStatusByTitle(this.page, title, status);
  }

  async clickAssessmentCardByStatus(title, status) {
    await K12Locators.assessmentCardClickByStatus(
      this.page,
      title,
      status
    ).click();
  }

  // =====================================================
  // Start or Resume
  // =====================================================

  // Start (Yet to be Started) or Resume (In Progress), whichever is shown
  async clickStartOrResume() {
    await this.startOrResumeButton.click();
  }

  // =====================================================
  // Continue
  // =====================================================

  async clickContinue() {
    await this.continueButton.click();
  }

  // =====================================================
  // Results
  // =====================================================

  // Mixed score option using the name from test data
  getMixedscore(optionName) {
    return K12Locators.Mixedscore(this.page, optionName);
  }

  async clickMixedscore() {
    await this.Mixedscore.click();
  }

  async clickDownloadButton() {
    await this.downloadButton.click();
  }

  getAssessmentReportDownloadButton(reportTitle, buttonName) {
    return K12Locators.assessmentReportDownloadButton(
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