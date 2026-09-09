import { GAD7Locators } from '../Locaters/GAD7.locators';
export class GAD7Page {
	constructor(page) {
		this.page = page;
		this.dashboardText = GAD7Locators.dashboardText(page);
        this.assTitle = GAD7Locators.assTitle(page);
        this.assCardClick = GAD7Locators.assCardClick(page);
        this.kebabTitle = GAD7Locators.kebabTitle(page);
        this.kebabTime = GAD7Locators.kebabTime(page);
        this.backArrow = GAD7Locators.backArrow(page);    
        this.clickStart = GAD7Locators.clickStart(page);
        this.tabTitle = GAD7Locators.tabTitle(page);
        this.tabSubTitle = GAD7Locators.tabSubTitle(page);
        this.tabDescription = GAD7Locators.tabDiscription(page);
        this.questionCount = GAD7Locators.questionCount(page);
        this.cancelIcon = GAD7Locators.cancelIcon(page);
        this.beginAss = GAD7Locators.beginAss(page);
        this.backButton=GAD7Locators.backButton(page);
        this.submitButton = GAD7Locators.submitButton(page);
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
    return GAD7Locators.assessmentTitleByStatus(this.page, title, status);
  }
 
  getAssessmentStatusByTitle(title, status) {
    return GAD7Locators.assessmentStatusByTitle(this.page, title, status);
  }
  
  async clickAssessmentCardByStatus(title, status) {
    await GAD7Locators.assessmentCardClickByStatus(this.page, title, status).click();
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
  return GAD7Locators.questionProgress(this.page, currentQuestion, totalQuestions);
}

getnervousQuestion(questionText) {
  return GAD7Locators.nervousQuestionByText(this.page, questionText);
}

getnervousOption(option) {
  return GAD7Locators.nervousNumberOption(this.page, option.number);
}

async selectnervousOption(option) {
  await this.getnervousOption(option).click();
}

getNextButton() {
  return GAD7Locators.nextButton(this.page);
}

async clickNextButton() {
  await this.getNextButton().click();
}
//question 2
getcontrolQuestion(questionText) {
  return GAD7Locators.controlQuestionByText(this.page, questionText);
}

getcontrolOption(option) {
  return GAD7Locators.controlNumberOption(this.page, option.number);
}

async selectcontrolOption(option) {
  await this.getcontrolOption(option).click();
}

//question 3
getbotheredQuestion(questionText) {
  return GAD7Locators.botheredQuestionByText(this.page, questionText);
}

getbotheredOption(option) {
  return GAD7Locators.botheredNumberOption(this.page, option.number);
}

async selectbotheredOption(option) {
  await this.getbotheredOption(option).click();
}

//question 4
getrelaxingQuestion(questionText) {
  return GAD7Locators.relaxingQuestionByText(this.page, questionText);
}

getrelaxingOption(option) {
  return GAD7Locators.relaxingNumberOption(this.page, option.number);
}

async selectrelaxingOption(option) {
  await this.getrelaxingOption(option).click();
}

//question 5
getrestlessQuestion(questionText) {
  return GAD7Locators.restlessQuestionByText(this.page, questionText);
}

getrestlessOption(option) {
  return GAD7Locators.restlessNumberOption(this.page, option.number);
}

async selectrestlessOption(option) {
  await this.getrestlessOption(option).click();
}

//question 6
getirritableQuestion(questionText) {
  return GAD7Locators.irritableQuestionByText(this.page, questionText);
}

getirritableOption(option) {
  return GAD7Locators.irritableNumberOption(this.page, option.number);
}

async selectirritableOption(option) {
  await this.getirritableOption(option).click();
}

//question 7
getafraidQuestion(questionText) {
  return GAD7Locators.afraidQuestionByText(this.page, questionText);
}

getafraidOption(option) {
  return GAD7Locators.afraidNumberOption(this.page, option.number);
}

async selectafraidOption(option) {
  await this.getafraidOption(option).click();
}

//back button
 async clickBackButton() {
    await this.backButton.click();
  }

// Question 7 — revisit/change answer
getafraidOption2(option) {
  return GAD7Locators.afraidNumberOption2(this.page, option.number);
}

async selectafraidOption2(option) {
  await this.getafraidOption2(option).click();
}

//question 8
getdifficultQuestion(questionText) {
  return GAD7Locators.difficultQuestionByText(this.page, questionText);
}

getdifficultOption(option) {
  return GAD7Locators.difficultNumberOption(this.page, option.number);
}

async selectdifficultOption(option) {
  await this.getdifficultOption(option).click();
}

getSubmitButton() {
  return this.submitButton;
}

async clickSubmitButton() {
  await this.submitButton.click({ force: true });
}

getAssessmentReportDownloadButton(reportTitle, buttonName) {
  return GAD7Locators.assessmentReportDownloadButton(
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

