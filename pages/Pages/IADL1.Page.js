import { IADL1Locators } from '../Locaters/IADL1.locators';
export class IADL1Page {
    constructor(page) {
        this.page = page;
    this.dashboardText = IADL1Locators.dashboardText(page);
    this.assTitle = IADL1Locators.assTitle(page);
    this.assCardClick = IADL1Locators.assCardClick(page);
    this.kebabTitle = IADL1Locators.kebabTitle(page);
    this.kebabTime = IADL1Locators.kebabTime(page);
    this.backArrow = IADL1Locators.backArrow(page);    
    this.clickStart = IADL1Locators.clickStart(page);
    this.tabTitle = IADL1Locators.tabTitle(page);
    this.tabSubTitle = IADL1Locators.tabSubTitle(page);
    this.tabDescription = IADL1Locators.tabDiscription(page);
    this.questionCount = IADL1Locators.questionCount(page);
    this.cancelIcon = IADL1Locators.cancelIcon(page);
    this.beginAss = IADL1Locators.beginAss(page);
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
        return IADL1Locators.assessmentTitleByStatus(this.page, title, status);
          }
         
        getAssessmentStatusByTitle(title, status) {
        return IADL1Locators.assessmentStatusByTitle(this.page, title, status);
          }
          
        async clickAssessmentCardByStatus(title, status) {
            await IADL1Locators.assessmentCardClickByStatus(this.page, title, status).click();
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
          return IADL1Locators.questionProgress(this.page, currentQuestion, totalQuestions);
        }
        
        //question 1
        getTelephoneQuestion(questionText) {
          return IADL1Locators.telephoneQuestionByText(this.page, questionText);
        }
        
        getTelephoneOption(optionText) {
          return IADL1Locators.telephoneAnswerButtonByText(this.page, optionText);
        }
        
        async selectTelephoneOption(optionText) {
          await this.getTelephoneOption(optionText).click();
        }
        async clickNextQuestion() 
        {
          await this.nextQuestionButton.click();
        }
         //question 2
        getShoppingQuestion(questionText) {
          return IADL1Locators.shoppingQuestionByText(this.page, questionText);
        }

        getShoppingOption(optionText) {
          return IADL1Locators.shoppingAnswerButtonByText(this.page, optionText);
        }

        async selectShoppingOption(optionText) {
          await this.getShoppingOption(optionText).click();
        }

        //question 3
        getFoodPrepQuestion(questionText) {
          return IADL1Locators.foodPrepQuestionByText(this.page, questionText);
        }

        getFoodPrepOption(optionText) {
          return IADL1Locators.foodPrepAnswerButtonByText(this.page, optionText);
        }

        async selectFoodPrepOption(optionText) {
          await this.getFoodPrepOption(optionText).click();
        }

        //question 4
        getHousekeepingQuestion(questionText) {
          return IADL1Locators.housekeepingQuestionByText(this.page, questionText);
        }

        getHousekeepingOption(optionText) {
          return IADL1Locators.housekeepingAnswerButtonByText(this.page, optionText);
        }

        async selectHousekeepingOption(optionText) {
          await this.getHousekeepingOption(optionText).click();
        }

        //question 5
        getLaundryQuestion(questionText) {
          return IADL1Locators.laundryQuestionByText(this.page, questionText);
        }

        getLaundryOption(optionText) {
          return IADL1Locators.laundryAnswerButtonByText(this.page, optionText);
        }

        async selectLaundryOption(optionText) {
          await this.getLaundryOption(optionText).click();
        }

        //question 6
        getTransportationQuestion(questionText) {
          return IADL1Locators.transportationQuestionByText(this.page, questionText);
        }

        getTransportationOption(optionText) {
          return IADL1Locators.transportationAnswerButtonByText(this.page, optionText);
        }

        async selectTransportationOption(optionText) {
          await this.getTransportationOption(optionText).click();
        }

        //question 7
        getMedicationsQuestion(questionText) {
          return IADL1Locators.medicationsQuestionByText(this.page, questionText);
        }

        getMedicationsOption(optionText) {
          return IADL1Locators.medicationsAnswerButtonByText(this.page, optionText);
        }

        async selectMedicationsOption(optionText) {
          await this.getMedicationsOption(optionText).click();
        }

        //question 8
        getFinancesQuestion(questionText) {
          return IADL1Locators.financesQuestionByText(this.page, questionText);
        }

        getFinancesOption(optionText) {
          return IADL1Locators.financesAnswerButtonByText(this.page, optionText);
        }

        async selectFinancesOption(optionText) {
          await this.getFinancesOption(optionText).click();
        }

        //in-assessment navigation
        getQuestionBackButton() {
          return IADL1Locators.questionBackButton(this.page);
        }

        async clickQuestionBackButton() {
          await this.getQuestionBackButton().click();
        }

        getSubmitButton() {
          return IADL1Locators.submitButton(this.page);
        }

        async clickSubmitButton() {
          await this.getSubmitButton().click();
        }   

        getAssessmentReportDownloadButton(reportTitle, buttonName) {
          return IADL1Locators.assessmentReportDownloadButton(
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

    