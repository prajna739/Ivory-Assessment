export const PSSLocators = {
 dashboardText: (page) => page.getByText(/^Hey\s+.+,\s*$/),
 assTitle: (page) => page.getByText('Perceived Stress Scale (PSS-10)', { exact: true }),
  assCardClick: (page) => page.getByText(
  'Perceived Stress Scale (PSS-10)',
  { exact: true }),
  

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page.locator('div')
      .filter({ has: page.getByText(title, { exact: true }) })
      .filter({ has: page.getByText(status, { exact: true }) })
      .last(),
  assessmentTitleByStatus: (page, title, status) =>
    PSSLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    PSSLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(status, { exact: true }),
  assessmentCardClickByStatus: (page, title, status) =>
    PSSLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    PSSLocators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),
  
  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) =>  page.getByText('3-5 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  clickStart: (page)=> page.getByRole('button', { name: 'Start' }),
  assessmentIntroDialog: (page) => page.getByRole('dialog'),
  tabTitle: (page)=>  page.getByRole('heading', { name: 'PSS-10 Stress Assessment' }) ,
  tabSubTitle: (page) =>
    PSSLocators.assessmentIntroDialog(page).getByText(
      'Perceived Stress Scale',
      { exact: true }
    ),
  tabDiscription: (page) =>
    PSSLocators.assessmentIntroDialog(page).getByText(
      "The PSS-10 is a screening tool that measures an individual's subjective perception of stress over the past month, evaluating how much an individual appraises recent life situations as stressful, unpredictable, and overloading.",
      { exact: true }
    ),
  questionCount: (page)=> page.getByText('10 quick questions', { exact: true }),
  questionProgress: (page, currentQuestion, totalQuestions) =>
    page.getByText(`Question ${currentQuestion} of ${totalQuestions}`, { exact: true }),
  cancelIcon: (page) =>
    page.getByRole('dialog').getByRole('button', { name: 'Close assessment' }),
  beginAss: (page) =>  page.getByRole('button', { name: 'Begin assessment' }),

  //question 1
unexpectedlyQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
unexpectedlyNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
nextButton: (page) => page.getByText('Next', { exact: true }),
   //question 2
controlQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
controlNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 3
nervousStressedQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
nervousStressedNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 4
confidentQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
confidentNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 5
goingYourWayQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
goingYourWayNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 6
copeQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
copeNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 7
irritationsQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
irritationsNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 8
topOfThingsQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
topOfThingsNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 9
angeredQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
angeredNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 10
pilingUpQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
pilingUpNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

  //in-assessment navigation
  questionBackButton: (page) => page.getByText('Back', { exact: true }),
  submitButton: (page) => page.getByRole('button', { name: 'Submit' }),
}