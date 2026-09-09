export const GAD7Locators = {
  dashboardText: (page) => page.getByText('Hey Test123,', { exact: true }),
  assTitle: (page) => page.getByText('GAD-7 Anxiety Assessment', { exact: true }),
  assCardClick: (page) => page.getByText(
  'GAD-7 Anxiety Assessment',
  { exact: true }),
  

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page.getByText(title, { exact: true }).locator(
      `xpath=ancestor::div[.//*[normalize-space() = "${status}"]][1]`
    ).first(),
  assessmentTitleByStatus: (page, title, status) =>
    GAD7Locators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    GAD7Locators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(status, { exact: true }),
  assessmentCardClickByStatus: (page, title, status) =>
    GAD7Locators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    GAD7Locators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),
  
  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) =>  page.getByText('2-3 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  clickStart: (page)=> page.getByRole('button', { name: 'Start' }),
  assessmentIntroDialog: (page) => page.getByRole('dialog'),
  tabTitle: (page)=> page.getByRole('heading', { name: 'GAD-7 Assessment' }),
  tabSubTitle: (page)=> page.getByText('Generalized Anxiety Disorder Scale', { exact: true }),
  tabDiscription: (page) =>
    GAD7Locators.assessmentIntroDialog(page).getByText(
      'A validated 7-item questionnaire to screen for generalized anxiety disorder symptoms over the past 2 weeks.',
      { exact: true }
    ),
  questionCount: (page)=> page.getByText('7 quick questions', { exact: true }),
  questionProgress: (page, currentQuestion, totalQuestions) =>
    page.getByText(`Question ${currentQuestion} of ${totalQuestions}`, { exact: true }),
  cancelIcon: (page)=> page.getByRole('dialog').getByRole('button', { name: 'Close' }),
  beginAss: (page) =>  page.getByRole('button', { name: 'Begin assessment' }),
  
//question 1
nervousQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
nervousNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

nextButton: (page) => page.getByText('Next', { exact: true }),


//question2
controlQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
controlNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

nextButton: (page) => page.getByText('Next', { exact: true }),

//question 3

botheredQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
botheredNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

nextButton: (page) => page.getByText('Next', { exact: true }),

//question 4
relaxingQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
relaxingNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

//question 5
restlessQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
restlessNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

//question 6
irritableQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
irritableNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

//question 7
afraidQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
afraidNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

  //click back button
  backButton: (page) => page.locator('button:has-text("Back")'),
  // Question 7 — revisit/change answer
  afraidNumberOption2: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

  //question 8
  difficultQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
difficultNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),


  submitButton: (page) => page.getByRole('button', { name: 'Submit', exact: true }),


  }



