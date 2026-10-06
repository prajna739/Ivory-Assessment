import { expect } from '@playwright/test';
import { COGCHECKLocators } from '../Locaters/COGCHECK.locators';
export class COGCHECKPage {
    constructor(page) {
        this.page = page;
    this.dashboardText = COGCHECKLocators.dashboardText(page);
    this.assTitle = COGCHECKLocators.assTitle(page);
    this.assCardClick = COGCHECKLocators.assCardClick(page);
    this.kebabTitle = COGCHECKLocators.kebabTitle(page);
    this.kebabTime = COGCHECKLocators.kebabTime(page);
    this.backArrow = COGCHECKLocators.backArrow(page);    
    this.clickStart = COGCHECKLocators.clickStart(page);
    this.tabTitle = COGCHECKLocators.tabTitle(page);
    this.tabSubTitle = COGCHECKLocators.tabSubTitle(page);
    this.tabDescription = COGCHECKLocators.tabDiscription(page);
    this.questionCount = COGCHECKLocators.questionCount(page);
    this.questionDescription=COGCHECKLocators.questionDescription(page);
    this.task2Title=COGCHECKLocators.task2Title(page);
    this.task2Description=COGCHECKLocators.task2Description(page);
    this.taskTime=COGCHECKLocators.taskTime(page);
    this.taskTimeDescription=COGCHECKLocators.taskTimeDescription(page);
    this.cancelIcon = COGCHECKLocators.cancelIcon(page);
    this.beginAss = COGCHECKLocators.beginAss(page);
    this.readyContinueButton = COGCHECKLocators.readyContinueButton(page);
    // inside constructor, alongside this.beginAss
    this.questionBackButton = COGCHECKLocators.questionBackButton(page);
    this.submitButton = COGCHECKLocators.submitButton(page);
    //cancelSymbol
    this.cancelSymbol=COGCHECKLocators.cancelSymbol(page);
    this.resumeButton=COGCHECKLocators.resumeButton(page);
    this.profileTitle=COGCHECKLocators.profileTitle(page);
    this.profileDescription=COGCHECKLocators.profileDescription(page);
    this.fullName=COGCHECKLocators.fullName(page);
    this.dateofBirth=COGCHECKLocators.dateofBirth(page);
    this.genderDetail=COGCHECKLocators.genderDetail(page);
    this.levelEducation=COGCHECKLocators.levelEducation(page);
    this.preferedLan=COGCHECKLocators.preferedLan(page);
    this.continueButton=COGCHECKLocators.continueButton(page);
    // FIX: was missing (page), so it stored the function instead of a locator
    this.completeWithMixedScores=COGCHECKLocators.completeWithMixedScores(page);
    this.downloadButton=COGCHECKLocators.downloadButton(page);
  }

    getProfileFieldRow(label) {
      return COGCHECKLocators.profileFieldRow(this.page, label);
    }

    getProfileFieldValue(label) {
      return COGCHECKLocators.profileFieldValue(this.page, label);
    }

    async expectProfileFieldVisible(label) {
      const row = this.getProfileFieldRow(label);
      await row.waitFor({ state: 'visible', timeout: 10_000 });
      await this.page.getByText(label, { exact: true }).waitFor({ state: 'visible', timeout: 10_000 });
      const value = this.getProfileFieldValue(label);
      await expect(value).not.toHaveText('');
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
    return COGCHECKLocators.assessmentTitleByStatus(this.page, title, status);
      }
     
    getAssessmentStatusByTitle(title, status) {
    return COGCHECKLocators.assessmentStatusByTitle(this.page, title, status);
      }
      
    async clickAssessmentCardByStatus(title, status) {
        await COGCHECKLocators.assessmentCardClickByStatus(this.page, title, status).click();
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
    async VerifyquestionDescription(){
      return this.questionDescription.isVisible();
    }
     async Verifytask2Title(){
      return this.task2Title.isVisible();
    }
    async Verifytask2Description(){
      return this.task2Title.isVisible();
    }
    async VerifytaskTime(){
      return this.task2Title.isVisible();
    }
    async VerifytaskTimeDescription(){
      return this.task2Title.isVisible();
    }
    
    
    async ClickcancelIcon(){
      await this.cancelIcon.click();
      
    }
    
    async ClickbeginAss(){
      await this.beginAss.click();
    }

    async clickReadyContinue() {
      await this.readyContinueButton.waitFor({
        state: 'visible',
        timeout: 10_000
      });

      await this.readyContinueButton.click();
    }
    
    getQuestionProgress(currentQuestion, totalQuestions) {
      return COGCHECKLocators.questionProgress(this.page, currentQuestion, totalQuestions);
    }
     //question 1
     getForgetQuestion(questionText) {
       return COGCHECKLocators.forgetQuestionByText(this.page, questionText);
     }
     
     getForgetOption(option) {
       return COGCHECKLocators.forgetNumberOption(this.page, option.number);
     }
     
     async selectForgetOption(option) {
       await this.getForgetOption(option).click();
     }
 
 
     getNextButton() {
       return COGCHECKLocators.nextButton(this.page);
     }
     
     async clickNextButton() {
       await this.getNextButton().click();
     }
     
     // new methods, alongside getNextButton/clickNextButton
    getQuestionBackButton() {
    return this.questionBackButton;
    }
    async clickQuestionBackButton() {
    await this.questionBackButton.click();
    }

   getSubmitButton() {
   return this.submitButton;
   }
  async clickSubmitButton() {
  await this.submitButton.click();
}

async VerifycancelSymbol(){
      return this.cancelSymbol.isVisible();
    }

async VerifyresumeButton(){
      return this.resumeButton.isVisible();
    }
async VerifyprofileTitle(){
      return this.profileTitle.isVisible();
    }
async VerifyprofileDescription(){
      return this.profileDescription.isVisible();
    }
async VerifyfullName(){
      return this.fullName.isVisible();
    }
async VerifydateofBirth(){
      return this.dateofBirth.isVisible();
    }
async VerifygenderDetail(){
      return this.genderDetail.isVisible();
    }
async VerifylevelEducation(){
      return this.levelEducation.isVisible();
    }
async VerifypreferedLan(){
      return this.preferedLan.isVisible();
    }
async clickcontinueButton() {
    await this.continueButton.click();
    }
async clickcompleteWithMixedScores() {
    await this.completeWithMixedScores.click();
    }


    async clickDownloadButton() {
    await this.downloadClick.click();
    }
    getAssessmentReportDownloadButton(reportTitle, buttonName) {
  return COGCHECKLocators.assessmentReportDownloadButton(
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