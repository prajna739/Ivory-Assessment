import { expect } from '@playwright/test';
import { BRAINFOGLocators } from '../Locaters/BRAINFOG.locators';

export class BRAINFOGPage {
  constructor(page) {
    this.page = page;
    this.dashboardText = BRAINFOGLocators.dashboardText(page);
    this.assTitle = BRAINFOGLocators.assTitle(page);
    this.assCardClick = BRAINFOGLocators.assCardClick(page);
    this.kebabTitle = BRAINFOGLocators.kebabTitle(page);
    this.kebabTime = BRAINFOGLocators.kebabTime(page);
    this.backArrow = BRAINFOGLocators.backArrow(page);
    this.clickStart = BRAINFOGLocators.clickStart(page);
    this.tabTitle = BRAINFOGLocators.tabTitle(page);
    this.tabSubTitle = BRAINFOGLocators.tabSubTitle(page);
    this.tabDescription = BRAINFOGLocators.tabDiscription(page);
    this.questionCount = BRAINFOGLocators.questionCount(page);
    this.secondTask = BRAINFOGLocators.secondTask(page);
    this.secondTaskTime = BRAINFOGLocators.secondTaskTime(page);
    this.cancelIcon = BRAINFOGLocators.cancelIcon(page);
    this.beginAss = BRAINFOGLocators.beginAss(page);
    this.continueButton = BRAINFOGLocators.continueButton(page);
// Profile
    this.profileTitle = BRAINFOGLocators.profileTitle(page);
    this.profileDescription = BRAINFOGLocators.profileDescription(page);
    this.fullName = BRAINFOGLocators.fullName(page);
    this.dateofBirth = BRAINFOGLocators.dateofBirth(page);
    this.genderDetail = BRAINFOGLocators.genderDetail(page);
    this.levelEducation = BRAINFOGLocators.levelEducation(page);
    this.preferedLan = BRAINFOGLocators.preferedLan(page);

    // Results
    this.completeWithMixedScores = BRAINFOGLocators.completeWithMixedScores(page);
    this.downloadButton = BRAINFOGLocators.downloadButton(page);
 
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
    return BRAINFOGLocators.assessmentTitleByStatus(this.page, title, status);
  }

  getAssessmentStatusByTitle(title, status) {
    return BRAINFOGLocators.assessmentStatusByTitle(this.page, title, status);
  }

  async clickAssessmentCardByStatus(title, status) {
    await BRAINFOGLocators.assessmentCardClickByStatus(this.page, title, status).click();
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

  async VerifysecondTask() {
    return this.secondTask.isVisible();
  }

  async VerifysecondTaskTime() {
    return this.secondTaskTime.isVisible();
  }

  async ClickcancelIcon() {
    await this.cancelIcon.click();
  }

  async ClickbeginAss() {
    await this.beginAss.click();
  }

  getQuestionProgress(currentQuestion, totalQuestions) {
    return BRAINFOGLocators.questionProgress(this.page, currentQuestion, totalQuestions);
  }

  // ---------- Question 1 ----------

  // Renamed from mentalQuestion -> getmentalQuestion (matches spec usage)
  getmentalQuestion(questionText) {
    return BRAINFOGLocators.mentalQuestionByText(this.page, questionText);
  }

  // Renamed from mentalOption -> getmentalOption (matches spec usage
  // and the call inside selectmentalOption)
  getmentalOption(option) {
    return BRAINFOGLocators.mentalNumberOption(this.page, option.number);
  }

  async selectmentalOption(option) {
    await this.getmentalOption(option).click();
  }

  getNextButton() {
    return BRAINFOGLocators.nextButton(this.page);
  }

  async clickNextButton() {
    await this.getNextButton().click();
  }
    // ---------- Questions 2 - 5 (generic) ----------

  getQuestionTitle(questionText) {
    return BRAINFOGLocators.questionTitleExact(this.page, questionText);
  }

  getAnswerOption(option) {
    return BRAINFOGLocators.answerNumberOption(this.page, option.number);
  }

  getAnswerLabel(answerText) {
    return BRAINFOGLocators.answerTextLabel(this.page, answerText);
  }

  async selectAnswerOption(option) {
    await this.getAnswerOption(option).click();
  }

  getBackButton() {
    return BRAINFOGLocators.questionBackButton(this.page);
  }

  async clickBackButton() {
    await this.getBackButton().click();
  }

  getSubmitButton() {
    return BRAINFOGLocators.submitButton(this.page);
  }

  async clickSubmitButton() {
    await this.getSubmitButton().click();
  }
    getChooseAnswerPrompt() {
    return BRAINFOGLocators.chooseAnswerPrompt(this.page);
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
      return BRAINFOGLocators.assessmentReportDownloadButton(
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