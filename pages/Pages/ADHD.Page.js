import { expect } from '@playwright/test';
import { ADHDLocators } from '../Locaters/ADHD.locators';

export class ADHDPage {
  constructor(page) {
    this.page = page;
    this.dashboardText = ADHDLocators.dashboardText(page);
    this.assTitle = ADHDLocators.assTitle(page);
    this.assCardClick = ADHDLocators.assCardClick(page);
    this.kebabTitle = ADHDLocators.kebabTitle(page);
    this.kebabTime = ADHDLocators.kebabTime(page);
    this.backArrow = ADHDLocators.backArrow(page);
    this.clickStart = ADHDLocators.clickStart(page);
    this.tabTitle = ADHDLocators.tabTitle(page);
    this.tabSubTitle = ADHDLocators.tabSubTitle(page);
    this.tabDescription = ADHDLocators.tabDiscription(page);
    this.questionCount = ADHDLocators.questionCount(page);
    this.cancelIcon = ADHDLocators.cancelIcon(page);
    this.beginAss = ADHDLocators.beginAss(page);
    this.nextQuestionButton = ADHDLocators.nextButton(page);
    this.continueButton = ADHDLocators.continueButton(page);

    // Profile
    this.profileTitle = ADHDLocators.profileTitle(page);
    this.profileDescription = ADHDLocators.profileDescription(page);
    this.fullName = ADHDLocators.fullName(page);
    this.dateofBirth = ADHDLocators.dateofBirth(page);
    this.genderDetail = ADHDLocators.genderDetail(page);

    // Results
    this.Mixedscore = ADHDLocators.Mixedscore(page);
    this.downloadButton = ADHDLocators.downloadButton(page);
  }

  async VerifyDashboardText() {
    return this.dashboardText.isVisible();
  }

  async VerifyAssTitle() {
    return this.assTitle.isVisible();
  }

  async clickAssCard() {
    await this.assCardClick.click();
  }

  getAssessmentTitleByStatus(title, status) {
    return ADHDLocators.assessmentTitleByStatus(this.page, title, status);
  }

  getAssessmentStatusByTitle(title, status) {
    return ADHDLocators.assessmentStatusByTitle(this.page, title, status);
  }

  async clickAssessmentCardByStatus(title, status) {
    await ADHDLocators.assessmentCardClickByStatus(this.page, title, status).click();
  }

  async VerifyKebabTitle() {
    return this.kebabTitle.isVisible();
  }

  async VerifykebabTime() {
    return this.kebabTime.isVisible();
  }

  async ClickbackArrow() {
    await this.backArrow.click();
  }

  async ClickstartButton() {
    await this.clickStart.click();
  }

  async VerifytabTitle() {
    return this.tabTitle.isVisible();
  }

  async VerifytabSubTitle() {
    return this.tabSubTitle.isVisible();
  }

  async VerifytabDescription() {
    return this.tabDescription.isVisible();
  }

  async VerifyquestionCount() {
    return this.questionCount.isVisible();
  }

  async ClickcancelIcon() {
    await this.cancelIcon.click();
  }

  async ClickbeginAss() {
    await this.beginAss.click();
  }

  getQuestionProgress(currentQuestion, totalQuestions) {
    return ADHDLocators.questionProgress(this.page, currentQuestion, totalQuestions);
  }

  // question helpers
  getChildQuestion(questionText) {
    return ADHDLocators.childQuestionByText(this.page, questionText);
  }

  getChildOption(optionText) {
    return ADHDLocators.childAnswerButtonByText(this.page, optionText);
  }

  async selectChildOption(optionText) {
    await this.getChildOption(optionText).click();
  }

  async clickNextQuestion() {
    await this.nextQuestionButton.click();
  }

  // in-assessment navigation
  getQuestionBackButton() {
    return ADHDLocators.questionBackButton(this.page);
  }

  async clickQuestionBackButton() {
    await this.getQuestionBackButton().click();
  }

  getSubmitButton() {
    return ADHDLocators.submitButton(this.page);
  }

  async clickSubmitButton() {
    await this.getSubmitButton().click();
  }

  // Continue
  async clickContinue() {
    await this.continueButton.click();
  }

  // Results
  getMixedscore(optionName) {
    return ADHDLocators.Mixedscore(this.page, optionName);
  }

  async clickMixedscore() {
    await this.Mixedscore.click();
  }

  async clickDownloadButton() {
    await this.downloadButton.click();
  }

  getAssessmentReportDownloadButton(reportTitle, buttonName) {
    return ADHDLocators.assessmentReportDownloadButton(
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