import { CFQLocators } from '../Locaters/CFQ.locators';
export class CFQPage {
    constructor(page) {
        this.page = page;
    this.dashboardText = CFQLocators.dashboardText(page);
        this.assTitle = CFQLocators.assTitle(page);
        this.assCardClick = CFQLocators.assCardClick(page);
        this.kebabTitle = CFQLocators.kebabTitle(page);
        this.kebabTime = CFQLocators.kebabTime(page);
        this.backArrow = CFQLocators.backArrow(page);    
        this.clickStart = CFQLocators.clickStart(page);
        this.tabTitle = CFQLocators.tabTitle(page);
        this.tabSubTitle = CFQLocators.tabSubTitle(page);
        this.tabDescription = CFQLocators.tabDiscription(page);
        this.questionCount = CFQLocators.questionCount(page);
        this.cancelIcon = CFQLocators.cancelIcon(page);
        this.beginAss = CFQLocators.beginAss(page);
        this.backButton=CFQLocators.backButton(page);
        this.submitButton = CFQLocators.submitButton(page); 
        this.downloadButton= CFQLocators.downloadButton(page);
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
    return CFQLocators.assessmentTitleByStatus(this.page, title, status);
      }
     
    getAssessmentStatusByTitle(title, status) {
    return CFQLocators.assessmentStatusByTitle(this.page, title, status);
      }
      
    async clickAssessmentCardByStatus(title, status) {
        await CFQLocators.assessmentCardClickByStatus(this.page, title, status).click();
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
      return CFQLocators.questionProgress(this.page, currentQuestion, totalQuestions);
    }

    //question 1
    getforgetQuestion(questionText) {
      return CFQLocators.forgetQuestionByText(this.page, questionText);
    }
    
    getforgetOption(option) {
      return CFQLocators.forgetNumberOption(this.page, option.number);
    }
    
    async selectforgetOption(option) {
      await this.getforgetOption(option).click();
    }

    getNextButton() {
      return CFQLocators.nextButton(this.page);
    }
    
    async clickNextButton() {
      await this.getNextButton().click();
    }
    //question 2
    getdoorQuestion(questionText) {
      return CFQLocators.doorQuestionByText(this.page, questionText);
    }
    
    getdoorOption(option) {
      return CFQLocators.doorNumberOption(this.page, option.number);
    }
    
    async selectdoorOption(option) {
      await this.getdoorOption(option).click();
    }

        //question 3
    gethearQuestion(questionText) {
      return CFQLocators.hearQuestionByText(this.page, questionText);
    }

    gethearOption(option) {
      return CFQLocators.hearNumberOption(this.page, option.number);
    }

    async selecthearOption(option) {
      await this.gethearOption(option).click();
    }

    //question 4
    getappointmentQuestion(questionText) {
      return CFQLocators.appointmentQuestionByText(this.page, questionText);
    }

    getappointmentOption(option) {
      return CFQLocators.appointmentNumberOption(this.page, option.number);
    }

    async selectappointmentOption(option) {
      await this.getappointmentOption(option).click();
    }

    //question 5
    getthrowQuestion(questionText) {
      return CFQLocators.throwQuestionByText(this.page, questionText);
    }

    getthrowOption(option) {
      return CFQLocators.throwNumberOption(this.page, option.number);
    }

    async selectthrowOption(option) {
      await this.getthrowOption(option).click();
    }

    //question 6
    getshopsQuestion(questionText) {
      return CFQLocators.shopsQuestionByText(this.page, questionText);
    }

    getshopsOption(option) {
      return CFQLocators.shopsNumberOption(this.page, option.number);
    }

    async selectshopsOption(option) {
      await this.getshopsOption(option).click();
    }

    //question 7
    getkeysQuestion(questionText) {
      return CFQLocators.keysQuestionByText(this.page, questionText);
    }

    getkeysOption(option) {
      return CFQLocators.keysNumberOption(this.page, option.number);
    }

    async selectkeysOption(option) {
      await this.getkeysOption(option).click();
    }

    //question 8
    getpasswordsQuestion(questionText) {
      return CFQLocators.passwordsQuestionByText(this.page, questionText);
    }

    getpasswordsOption(option) {
      return CFQLocators.passwordsNumberOption(this.page, option.number);
    }

    async selectpasswordsOption(option) {
      await this.getpasswordsOption(option).click();
    }

    //question 9
    getdeliveryQuestion(questionText) {
      return CFQLocators.deliveryQuestionByText(this.page, questionText);
    }

    getdeliveryOption(option) {
      return CFQLocators.deliveryNumberOption(this.page, option.number);
    }

    async selectdeliveryOption(option) {
      await this.getdeliveryOption(option).click();
    }

    //question 10
    getnameQuestion(questionText) {
      return CFQLocators.nameQuestionByText(this.page, questionText);
    }

    getnameOption(option) {
      return CFQLocators.nameNumberOption(this.page, option.number);
    }

    async selectnameOption(option) {
      await this.getnameOption(option).click();
    }

        //question 11
    getnamesInConvoQuestion(questionText) {
      return CFQLocators.namesInConvoQuestionByText(this.page, questionText);
    }

    getnamesInConvoOption(option) {
      return CFQLocators.namesInConvoNumberOption(this.page, option.number);
    }

    async selectnamesInConvoOption(option) {
      await this.getnamesInConvoOption(option).click();
    }

    //question 12
    getdatesQuestion(questionText) {
      return CFQLocators.datesQuestionByText(this.page, questionText);
    }

    getdatesOption(option) {
      return CFQLocators.datesNumberOption(this.page, option.number);
    }

    async selectdatesOption(option) {
      await this.getdatesOption(option).click();
    }

    //question 13
    getwrongPlaceQuestion(questionText) {
      return CFQLocators.wrongPlaceQuestionByText(this.page, questionText);
    }

    getwrongPlaceOption(option) {
      return CFQLocators.wrongPlaceNumberOption(this.page, option.number);
    }

    async selectwrongPlaceOption(option) {
      await this.getwrongPlaceOption(option).click();
    }

    //question 14
    getleaveHomeQuestion(questionText) {
      return CFQLocators.leaveHomeQuestionByText(this.page, questionText);
    }

    getleaveHomeOption(option) {
      return CFQLocators.leaveHomeNumberOption(this.page, option.number);
    }

    async selectleaveHomeOption(option) {
      await this.getleaveHomeOption(option).click();
    }

    //back button
    async clickBackButton() {
    await this.backButton.click();
    }
 // Question 14 — revisit/change answer
    getleaveHomeOption2(option) {
      return CFQLocators.leaveHomeNumberOption2(this.page, option.number);
    }
    
    async selectleaveHomeOption2(option) {
      await this.getleaveHomeOption2(option).click();
    }

    //question 15
    getmissingQuestion(questionText) {
      return CFQLocators.missingQuestionByText(this.page, questionText);
    }

    getmissingOption(option) {
      return CFQLocators.missingNumberOption(this.page, option.number);
    }

    async selectmissingOption(option) {
      await this.getmissingOption(option).click();
    }
    getSubmitButton() {
  return this.submitButton;
}

async clickSubmitButton() {
  await this.submitButton.click({ force: true });
}

async clickDownloadButton() {
    await this.downloadClick.click();
    }
    getAssessmentReportDownloadButton(reportTitle, buttonName) {
  return CFQLocators.assessmentReportDownloadButton(
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
