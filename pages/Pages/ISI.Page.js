import { ISILocators } from '../Locaters/ISI.locators';
export class ISIPage {
    constructor(page) {
        this.page = page;
    this.dashboardText = ISILocators.dashboardText(page);
    this.assTitle = ISILocators.assTitle(page);
    this.assCardClick = ISILocators.assCardClick(page);
    this.kebabTitle = ISILocators.kebabTitle(page);
    this.kebabTime = ISILocators.kebabTime(page);
    this.backArrow = ISILocators.backArrow(page);    
    this.clickStart = ISILocators.clickStart(page);
    this.tabTitle = ISILocators.tabTitle(page);
    this.tabSubTitle = ISILocators.tabSubTitle(page);
    this.tabDescription = ISILocators.tabDiscription(page);
    this.questionCount = ISILocators.questionCount(page);
    this.cancelIcon = ISILocators.cancelIcon(page);
    this.beginAss = ISILocators.beginAss(page);    
    this.downloadButton= ISILocators.downloadButton(page);


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
    return ISILocators.assessmentTitleByStatus(this.page, title, status);
      }
     
    getAssessmentStatusByTitle(title, status) {
    return ISILocators.assessmentStatusByTitle(this.page, title, status);
      }
      
    async clickAssessmentCardByStatus(title, status) {
        await ISILocators.assessmentCardClickByStatus(this.page, title, status).click();
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
    
    async ClickcancelIcon(){
      await this.cancelIcon.click();
      
    }
    
    async ClickbeginAss(){
      await this.beginAss.click();
    }
    
    getQuestionProgress(currentQuestion, totalQuestions) {
      return ISILocators.questionProgress(this.page, currentQuestion, totalQuestions);
    }
    //question 1
    getasleepQuestion(questionText) {
      return ISILocators.asleepQuestionByText(this.page, questionText);
    }
    
    getasleepOption(option) {
      return ISILocators.asleepNumberOption(this.page, option.number);
    }
    
    async selectasleepOption(option) {
      await this.getasleepOption(option).click();
    }


    getNextButton() {
      return ISILocators.nextButton(this.page);
    }
    
    async clickNextButton() {
      await this.getNextButton().click();
    }
        //question 2
    getstayingAsleepQuestion(questionText) {
      return ISILocators.stayingAsleepQuestionByText(this.page, questionText);
    }

    getstayingAsleepOption(option) {
      return ISILocators.stayingAsleepNumberOption(this.page, option.number);
    }

    async selectstayingAsleepOption(option) {
      await this.getstayingAsleepOption(option).click();
    }

    //question 3
    getwakingEarlyQuestion(questionText) {
      return ISILocators.wakingEarlyQuestionByText(this.page, questionText);
    }

    getwakingEarlyOption(option) {
      return ISILocators.wakingEarlyNumberOption(this.page, option.number);
    }

    async selectwakingEarlyOption(option) {
      await this.getwakingEarlyOption(option).click();
    }

    //question 4
    getsatisfactionQuestion(questionText) {
      return ISILocators.satisfactionQuestionByText(this.page, questionText);
    }

    getsatisfactionOption(option) {
      return ISILocators.satisfactionNumberOption(this.page, option.number);
    }

    async selectsatisfactionOption(option) {
      await this.getsatisfactionOption(option).click();
    }

    //question 5
    getinterferenceQuestion(questionText) {
      return ISILocators.interferenceQuestionByText(this.page, questionText);
    }

    getinterferenceOption(option) {
      return ISILocators.interferenceNumberOption(this.page, option.number);
    }

    async selectinterferenceOption(option) {
      await this.getinterferenceOption(option).click();
    }

    //question 6
    getnoticeableQuestion(questionText) {
      return ISILocators.noticeableQuestionByText(this.page, questionText);
    }

    getnoticeableOption(option) {
      return ISILocators.noticeableNumberOption(this.page, option.number);
    }

    async selectnoticeableOption(option) {
      await this.getnoticeableOption(option).click();
    }

    //question 7
    getworriedQuestion(questionText) {
      return ISILocators.worriedQuestionByText(this.page, questionText);
    }

    getworriedOption(option) {
      return ISILocators.worriedNumberOption(this.page, option.number);
    }

    async selectworriedOption(option) {
      await this.getworriedOption(option).click();
    }

    //in-assessment navigation
    getQuestionBackButton() {
      return ISILocators.questionBackButton(this.page);
    }

    async clickQuestionBackButton() {
      await this.getQuestionBackButton().click();
    }

    getSubmitButton() {
      return ISILocators.submitButton(this.page);
    }

    async clickSubmitButton() {
      await this.getSubmitButton().click();
    }
  
    async clickDownloadButton() {
    await this.downloadClick.click();
    }
    getAssessmentReportDownloadButton(reportTitle, buttonName) {
  return ISILocators.assessmentReportDownloadButton(
    this.page,
    reportTitle,
    buttonName
  );
}

async clickAssessmentReportDownload(reportTitle, buttonName) {
  await this.getAssessmentReportDownloadButton(
    reportTitle,
    buttonName
  ).click();
}
  }


