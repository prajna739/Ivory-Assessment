import { expect } from '@playwright/test';
import { STRESSLocators } from '../Locaters/STRESS.locators';
export class STRESSPage {
    constructor(page) {
        this.page = page;
    this.dashboardText = STRESSLocators.dashboardText(page);
    this.assTitle = STRESSLocators.assTitle(page);
    this.assCardClick = STRESSLocators.assCardClick(page);
    this.kebabTitle = STRESSLocators.kebabTitle(page);
    this.kebabTime = STRESSLocators.kebabTime(page);
    this.backArrow = STRESSLocators.backArrow(page);    
    this.clickStart = STRESSLocators.clickStart(page);
    this.tabTitle = STRESSLocators.tabTitle(page);
    this.tabSubTitle = STRESSLocators.tabSubTitle(page);
    this.tabDescription = STRESSLocators.tabDiscription(page);
    this.questionCount = STRESSLocators.questionCount(page);
    this.secondTask= STRESSLocators.secondTask(page);
    this.thirdTask = STRESSLocators.thirdTask(page);
    this.cancelIcon = STRESSLocators.cancelIcon(page);
    this.beginAss = STRESSLocators.beginAss(page); 
    // Profile
    this.profileTitle = STRESSLocators.profileTitle(page);
    this.profileDescription = STRESSLocators.profileDescription(page);
    this.fullName = STRESSLocators.fullName(page);
    this.dateofBirth = STRESSLocators.dateofBirth(page);
    this.genderDetail = STRESSLocators.genderDetail(page);
    this.levelEducation = STRESSLocators.levelEducation(page);
    this.preferedLan = STRESSLocators.preferedLan(page); 
    this.continueButton = STRESSLocators.continueButton(page);
    
    // Results
    this.completeWithMixedScores = STRESSLocators.completeWithMixedScores(page);
    this.downloadButton = STRESSLocators.downloadButton(page);
    
}
    async VerifyDashboardText(){
    return this.dashboardText.isVisible();
    }
    async VerifyAssTitle(){
    return this.assTitle.isVisible();
    }
        
    async clickAssCard() {
    await this.assCardClick.click();
    }
       
    getAssessmentTitleByStatus(title, status) {
    return STRESSLocators.assessmentTitleByStatus(this.page, title, status);
      }
     
    getAssessmentStatusByTitle(title, status) {
    return STRESSLocators.assessmentStatusByTitle(this.page, title, status);
      }
      
    async clickAssessmentCardByStatus(title, status) {
        await STRESSLocators.assessmentCardClickByStatus(this.page, title, status).click();
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
    
    async VerifytabTitle(){
      return this.tabTitle.isVisible();
    }
    
    async VerifytabSubTitle(){
      return this.tabSubTitle.isVisible();
      }
    
    async VerifytabDescription(){
      return this.tabDescription.isVisible();
    }
    
    async VerifyquestionCount(){
      return this.questionCount.isVisible();
    }

    async VerifysecondTask(){
      return this.secondTask.isVisible();
    }
    async VerifythirdTask(){
      return this.thirdTask.isVisible();
    }

    
    async ClickcancelIcon(){
      await this.cancelIcon.click();
      
    }
    
    async ClickbeginAss(){
      await this.beginAss.click();
    }
    
    getQuestionProgress(currentQuestion, totalQuestions) {
      return STRESSLocators.questionProgress(this.page, currentQuestion, totalQuestions);
    }
    
    //question 1
    mentalQuestion(questionText) {
      return STRESSLocators.mentalQuestionByText(this.page, questionText);
    }

    getmentalQuestion(questionText) {
      return this.mentalQuestion(questionText);
    }
    
    mentalOption(option) {
      return STRESSLocators.mentalNumberOption(this.page, option.number);
    }

    getmentalOption(option) {
      return this.mentalOption(option);
    }
    
    async selectmentalOption(option) {
      await this.getmentalOption(option).click();
    }


    getNextButton() {
      return STRESSLocators.nextButton(this.page);
    }
    
    async clickNextButton() {
      await this.getNextButton().click();
    }
     // questions 2 to 8 (generic)
    getQuestion(questionText) {
      return STRESSLocators.questionByText(this.page, questionText);
    }

    getOption(option) {
      return STRESSLocators.numberOption(this.page, option.number);
    }

    async selectOption(option) {
      await this.getOption(option).click();
    }

    getQuestionBackButton() {
      return STRESSLocators.questionBackButton(this.page);
    }

    async clickQuestionBackButton() {
      await this.getQuestionBackButton().click();
    }

    getSubmitButton() {
      return STRESSLocators.submitButton(this.page);
    }

    async clickSubmitButton() {
      await this.getSubmitButton().click();
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
    return STRESSLocators.assessmentReportDownloadButton(
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
