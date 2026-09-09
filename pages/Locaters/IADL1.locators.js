export const IADL1Locators = {
  dashboardText: (page) => page.getByText(/^Hey\s+.+,\s*$/),
  assTitle: (page) =>  page.getByText('Instrumental Activities of Daily Living Scale (IADL)', { exact: true }),
  assCardClick: (page) => page.getByText(
  'Instrumental Activities of Daily Living Scale (IADL)',
  { exact: true }),

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page.locator('div')
      .filter({ has: page.getByText(title, { exact: true }) })
      .filter({ has: page.getByText(status, { exact: true }) })
      .last(),
  assessmentTitleByStatus: (page, title, status) =>
    IADL1Locators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    IADL1Locators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(status, { exact: true }),
  assessmentCardClickByStatus: (page, title, status) =>
    IADL1Locators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    IADL1Locators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),

  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) =>  page.getByText('2-3 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  tabTitle: (page)=> page.getByRole('heading', { name: 'IADL Assessment' }),
  clickStart: (page)=> page.getByText('Start', { exact: true }),
  tabSubTitle: (page)=> page.getByText('Instrumental Activities of Daily Living', { exact: true }),
  tabDiscription: (page) =>
    page.getByRole('dialog').getByText(
      "The IADL (Instrumental Activities of Daily Living) scale is a standard screening tool to assesses a person's ability to perform complex daily tasks for independent living.",
      { exact: true }
    ),
  questionCount: (page)=> page.getByText('8 quick questions', { exact: true }),
  questionProgress: (page, currentQuestion, totalQuestions) =>
    page.getByText(`Question ${currentQuestion} of ${totalQuestions}`, { exact: true }),
  cancelIcon: (page) =>
    page.getByRole('dialog').getByRole('button', { name: 'Close assessment' }),
  beginAss: (page) =>  page.getByRole('button', { name: 'Begin assessment' }),
   //question 1 
 telephoneQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByRole('heading', {
    name: questionText,
    exact: true,
  }),

telephoneAnswerButtonByText: (page, optionText) =>
  page.getByRole('dialog').getByRole('button', {
    name: optionText,
    exact: true,
  }),
nextButton: (page) => page.getByText('Next', { exact: true }),
    //question 2
shoppingQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByRole('heading', {
    name: questionText,
    exact: true,
  }),
shoppingAnswerButtonByText: (page, optionText) =>
  page.getByRole('dialog').getByRole('button', {
    name: optionText,
    exact: true,
  }),

   //question 3
foodPrepQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByRole('heading', {
    name: questionText,
    exact: true,
  }),
foodPrepAnswerButtonByText: (page, optionText) =>
  page.getByRole('dialog').getByRole('button', {
    name: optionText,
    exact: true,
  }),

   //question 4
housekeepingQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByRole('heading', {
    name: questionText,
    exact: true,
  }),
housekeepingAnswerButtonByText: (page, optionText) =>
  page.getByRole('dialog').getByRole('button', {
    name: optionText,
    exact: true,
  }),

   //question 5
laundryQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByRole('heading', {
    name: questionText,
    exact: true,
  }),
laundryAnswerButtonByText: (page, optionText) =>
  page.getByRole('dialog').getByRole('button', {
    name: optionText,
    exact: true,
  }),

   //question 6
transportationQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByRole('heading', {
    name: questionText,
    exact: true,
  }),
transportationAnswerButtonByText: (page, optionText) =>
  page.getByRole('dialog').getByRole('button', {
    name: optionText,
    exact: true,
  }),

   //question 7
medicationsQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByRole('heading', {
    name: questionText,
    exact: true,
  }),
medicationsAnswerButtonByText: (page, optionText) =>
  page.getByRole('dialog').getByRole('button', {
    name: optionText,
    exact: true,
  }),

   //question 8
financesQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByRole('heading', {
    name: questionText,
    exact: true,
  }),
financesAnswerButtonByText: (page, optionText) =>
  page.getByRole('dialog').getByRole('button', {
    name: optionText,
    exact: true,
  }),

  //in-assessment navigation
  questionBackButton: (page) => page.getByText('Back', { exact: true }),
  submitButton: (page) => page.getByRole('button', { name: 'Submit' }),

}