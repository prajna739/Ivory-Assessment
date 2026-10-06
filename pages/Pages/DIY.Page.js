import { expect } from '@playwright/test';
import { DIYLocators } from '../Locaters/DIY.locators';

export class DIYPage {
  constructor(page) {
    this.page = page;

    // Dashboard
    this.dashboardText = DIYLocators.dashboardText(page);

    // Assessment
    this.assTitle = DIYLocators.assTitle(page);
    this.assCardClick = DIYLocators.assCardClick(page);

    // Buttons
    this.startOrResumeButton = DIYLocators.startOrResumeButton(page);
    this.continueButton = DIYLocators.continueButton(page);

    // Video banner
    this.youtubePlay = DIYLocators.youtubePlay(page);

    // Profile
    this.profileTitle = DIYLocators.profileTitle(page);
    this.profileDescription = DIYLocators.profileDescription(page);
    this.fullName = DIYLocators.fullName(page);
    this.dateofBirth = DIYLocators.dateofBirth(page);
    this.genderDetail = DIYLocators.genderDetail(page);

    // Results
    this.Mixedscore = DIYLocators.Mixedscore(page);
    this.downloadButton = DIYLocators.downloadButton(page);
  }

  // =====================================================
  // Assessment
  // =====================================================

  getAssessmentTitleByStatus(title, status) {
    return DIYLocators.assessmentTitleByStatus(this.page, title, status);
  }

  getAssessmentStatusByTitle(title, status) {
    return DIYLocators.assessmentStatusByTitle(this.page, title, status);
  }

  async clickAssessmentCardByStatus(title, status) {
    await DIYLocators.assessmentCardClickByStatus(
      this.page,
      title,
      status
    ).click();
  }

  // =====================================================
  // Video modal ("Watch Before You Start")
  // =====================================================

  async clickYoutubePlay() {
    await this.youtubePlay.click();
  }

  getVideoDialog(modalTitle) {
    return DIYLocators.videoDialog(this.page, modalTitle);
  }

  getVideoModalTitle(modalTitle) {
    return DIYLocators.videoModalTitle(this.page, modalTitle);
  }

  getVideoFrame(modalTitle) {
    return DIYLocators.videoFrame(this.page, modalTitle);
  }

  getVideoCloseIcon(modalTitle) {
    return DIYLocators.videoCloseIcon(this.page, modalTitle);
  }

  async clickVideoCloseIcon(modalTitle) {
    await this.getVideoCloseIcon(modalTitle).click();
  }

  // =====================================================
  // Start / Resume
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
    return DIYLocators.Mixedscore(this.page, optionName);
  }

  async clickMixedscore() {
    await this.Mixedscore.click();
  }

  async clickDownloadButton() {
    await this.downloadButton.click();
  }

  getAssessmentReportDownloadButton(reportTitle, buttonName) {
    return DIYLocators.assessmentReportDownloadButton(
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