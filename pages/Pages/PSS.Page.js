import { PSSLocators } from '../Locaters/PSS.locators';
export class PSSPage {
    constructor(page) {
        this.page = page;
    this.dashboardText = PSSLocators.dashboardText(page);
    this.assTitle = PSSLocators.assTitle(page);
    this.assCardClick = PSSLocators.assCardClick(page);
    this.kebabTitle = PSSLocators.kebabTitle(page);
    this.kebabTime = PSSLocators.kebabTime(page);
    this.backArrow = PSSLocators.backArrow(page);    
    this.clickStart = PSSLocators.clickStart(page);
    this.tabTitle = PSSLocators.tabTitle(page);
    this.tabSubTitle = PSSLocators.tabSubTitle(page);
    this.tabDescription = PSSLocators.tabDiscription(page);
    this.questionCount = PSSLocators.questionCount(page);
    this.cancelIcon = PSSLocators.cancelIcon(page);
    this.beginAss = PSSLocators.beginAss(page);   
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
    return PSSLocators.assessmentTitleByStatus(this.page, title, status);
      }
     
    getAssessmentStatusByTitle(title, status) {
    return PSSLocators.assessmentStatusByTitle(this.page, title, status);
      }
      
    async clickAssessmentCardByStatus(title, status) {
        await PSSLocators.assessmentCardClickByStatus(this.page, title, status).click();
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
      return PSSLocators.questionProgress(this.page, currentQuestion, totalQuestions);
    }    

    //question 1
    getunexpectedlyQuestion(questionText) {
      return PSSLocators.unexpectedlyQuestionByText(this.page, questionText);
    }
    
    getunexpectedlyOption(option) {
      return PSSLocators.unexpectedlyNumberOption(this.page, option.number);
    }
    
    async selectunexpectedlyOption(option) {
      await this.getunexpectedlyOption(option).click();
    }


    getNextButton() {
      return PSSLocators.nextButton(this.page);
    }
    
    async clickNextButton() {
      await this.getNextButton().click();
    }  
    
        //question 2
    getcontrolQuestion(questionText) {
      return PSSLocators.controlQuestionByText(this.page, questionText);
    }

    getcontrolOption(option) {
      return PSSLocators.controlNumberOption(this.page, option.number);
    }

    async selectcontrolOption(option) {
      await this.getcontrolOption(option).click();
    }

    //question 3
    getnervousStressedQuestion(questionText) {
      return PSSLocators.nervousStressedQuestionByText(this.page, questionText);
    }

    getnervousStressedOption(option) {
      return PSSLocators.nervousStressedNumberOption(this.page, option.number);
    }

    async selectnervousStressedOption(option) {
      await this.getnervousStressedOption(option).click();
    }

    //question 4
    getconfidentQuestion(questionText) {
      return PSSLocators.confidentQuestionByText(this.page, questionText);
    }

    getconfidentOption(option) {
      return PSSLocators.confidentNumberOption(this.page, option.number);
    }

    async selectconfidentOption(option) {
      await this.getconfidentOption(option).click();
    }

    //question 5
    getgoingYourWayQuestion(questionText) {
      return PSSLocators.goingYourWayQuestionByText(this.page, questionText);
    }

    getgoingYourWayOption(option) {
      return PSSLocators.goingYourWayNumberOption(this.page, option.number);
    }

    async selectgoingYourWayOption(option) {
      await this.getgoingYourWayOption(option).click();
    }

    //question 6
    getcopeQuestion(questionText) {
      return PSSLocators.copeQuestionByText(this.page, questionText);
    }

    getcopeOption(option) {
      return PSSLocators.copeNumberOption(this.page, option.number);
    }

    async selectcopeOption(option) {
      await this.getcopeOption(option).click();
    }

    //question 7
    getirritationsQuestion(questionText) {
      return PSSLocators.irritationsQuestionByText(this.page, questionText);
    }

    getirritationsOption(option) {
      return PSSLocators.irritationsNumberOption(this.page, option.number);
    }

    async selectirritationsOption(option) {
      await this.getirritationsOption(option).click();
    }

    //question 8
    gettopOfThingsQuestion(questionText) {
      return PSSLocators.topOfThingsQuestionByText(this.page, questionText);
    }

    gettopOfThingsOption(option) {
      return PSSLocators.topOfThingsNumberOption(this.page, option.number);
    }

    async selecttopOfThingsOption(option) {
      await this.gettopOfThingsOption(option).click();
    }

    //question 9
    getangeredQuestion(questionText) {
      return PSSLocators.angeredQuestionByText(this.page, questionText);
    }

    getangeredOption(option) {
      return PSSLocators.angeredNumberOption(this.page, option.number);
    }

    async selectangeredOption(option) {
      await this.getangeredOption(option).click();
    }

    //question 10
    getpilingUpQuestion(questionText) {
      return PSSLocators.pilingUpQuestionByText(this.page, questionText);
    }

    getpilingUpOption(option) {
      return PSSLocators.pilingUpNumberOption(this.page, option.number);
    }

    async selectpilingUpOption(option) {
      await this.getpilingUpOption(option).click();
    }

    //in-assessment navigation
    getQuestionBackButton() {
      return PSSLocators.questionBackButton(this.page);
    }

    async clickQuestionBackButton() {
      await this.getQuestionBackButton().click();
    }

    getSubmitButton() {
      return PSSLocators.submitButton(this.page);
    }

    async clickSubmitButton() {
      await this.getSubmitButton().click();
    }

    getAssessmentReportDownloadButton(reportTitle, buttonName) {
      return PSSLocators.assessmentReportDownloadButton(
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