import { PHQLocators } from '../Locaters/PHQ.locators';
export class PHQPage {
	constructor(page) {
		this.page = page;
    this.dashboardText = PHQLocators.dashboardText(page);
    this.assTitle = PHQLocators.assTitle(page);
    this.assCardClick = PHQLocators.assCardClick(page);
    this.kebabTitle = PHQLocators.kebabTitle(page);
    this.kebabTime = PHQLocators.kebabTime(page);
    this.backArrow = PHQLocators.backArrow(page);    
    this.clickStart = PHQLocators.clickStart(page);
    this.tabTitle = PHQLocators.tabTitle(page);
    this.tabSubTitle = PHQLocators.tabSubTitle(page);
    this.tabDescription = PHQLocators.tabDiscription(page);
    this.questionCount = PHQLocators.questionCount(page);
    this.cancelIcon = PHQLocators.cancelIcon(page);
    this.beginAss = PHQLocators.beginAss(page);
    this.backButton=PHQLocators.backButton(page);  
    this.submitButton = PHQLocators.submitButton(page);  
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
    return PHQLocators.assessmentTitleByStatus(this.page, title, status);
      }
     
    getAssessmentStatusByTitle(title, status) {
    return PHQLocators.assessmentStatusByTitle(this.page, title, status);
      }
      
    async clickAssessmentCardByStatus(title, status) {
        await PHQLocators.assessmentCardClickByStatus(this.page, title, status).click();
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
      return PHQLocators.questionProgress(this.page, currentQuestion, totalQuestions);
    }


    //question 1
    getpleasureQuestion(questionText) {
      return PHQLocators.pleasureQuestionByText(this.page, questionText);
    }
    
    getpleasureOption(option) {
      return PHQLocators.pleasureNumberOption(this.page, option.number);
    }
    
    async selectpleasureOption(option) {
      await this.getpleasureOption(option).click();
    }


    getNextButton() {
      return PHQLocators.nextButton(this.page);
    }
    
    async clickNextButton() {
      await this.getNextButton().click();
    }

     //question 2
    getdownQuestion(questionText) {
      return PHQLocators.downQuestionByText(this.page, questionText);
    }
    
    getdownOption(option) {
      return PHQLocators.downNumberOption(this.page, option.number);
    }
    
    async selectdownOption(option) {
      await this.getdownOption(option).click();
    }

     //question 3
    getasleepQuestion(questionText) {
      return PHQLocators.asleepQuestionByText(this.page, questionText);
    }
    
    getasleepOption(option) {
      return PHQLocators.asleepNumberOption(this.page, option.number);
    }
    
    async selectasleepOption(option) {
      await this.getasleepOption(option).click();
    }

     //question 4
    gettiredQuestion(questionText) {
      return PHQLocators.tiredQuestionByText(this.page, questionText);
    }
    
    gettiredOption(option) {
      return PHQLocators.tiredNumberOption(this.page, option.number);
    }
    
    async selecttiredOption(option) {
      await this.getasleepOption(option).click();
    } 
    
     //question 5
    getappetiteQuestion(questionText) {
      return PHQLocators.appetiteQuestionByText(this.page, questionText);
    }
    
    getappetiteOption(option) {
      return PHQLocators.appetiteNumberOption(this.page, option.number);
    }
    
    async selectappetiteOption(option) {
      await this.getappetiteOption(option).click();
    } 
  

    //question 6
    getfamilyQuestion(questionText) {
      return PHQLocators.familyQuestionByText(this.page, questionText);
    }
    
    getfamilyOption(option) {
      return PHQLocators.familyNumberOption(this.page, option.number);
    }
    
    async selectfamilyOption(option) {
      await this.getfamilyOption(option).click();
    } 
    //question 7
    getreadingQuestion(questionText) {
      return PHQLocators.readingQuestionByText(this.page, questionText);
    }
    
    getreadingOption(option) {
      return PHQLocators.readingNumberOption(this.page, option.number);
    }
    
    async selectreadingOption(option) {
      await this.getreadingOption(option).click();
    }
   //question 8
    getfidgetyQuestion(questionText) {
      return PHQLocators.fidgetyQuestionByText(this.page, questionText);
    }
    
    getfidgetyOption(option) {
      return PHQLocators.fidgetyNumberOption(this.page, option.number);
    }
    
    async selectfidgetyOption(option) {
      await this.getfidgetyOption(option).click();
    }

   //question 9
    gethurtingQuestion(questionText) {
      return PHQLocators.hurtingQuestionByText(this.page, questionText);
    }
    
    gethurtingOption(option) {
      return PHQLocators.hurtingNumberOption(this.page, option.number);
    }
    
    async selecthurtingOption(option) {
      await this.gethurtingOption(option).click();
    }

    
    //back button
    async clickBackButton() {
    await this.backButton.click();
    }
    // Question 9 — revisit/change answer
    gethurtingOption2(option) {
      return PHQLocators.hurtingNumberOption2(this.page, option.number);
    }
    
    async selecthurtingOption2(option) {
      await this.gethurtingOption2(option).click();
    }

   //question 10
    getcareQuestion(questionText) {
      return PHQLocators.careQuestionByText(this.page, questionText);
    }
    
    getcareOption(option) {
      return PHQLocators.careNumberOption(this.page, option.number);
    }
    
    async selectcareOption(option) {
      await this.getcareOption(option).click();
    }

    getSubmitButton() {
  return this.submitButton;
}

async clickSubmitButton() {
  await this.submitButton.click({ force: true });
}

getAssessmentReportDownloadButton(reportTitle, buttonName) {
  return PHQLocators.assessmentReportDownloadButton(
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