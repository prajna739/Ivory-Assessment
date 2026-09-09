export const PHQLocators = {
 dashboardText: (page) => page.getByText(/^Hey\s+.+,\s*$/),
   assTitle: (page) => page.getByText('PHQ-9 Depression Assessment', { exact: true }),
  assCardClick: (page) => page.getByText(
  'PHQ-9 Depression Assessment',
  { exact: true }),
  

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page.locator('div')
      .filter({ hasText: title })
      .filter({ hasText: status })
      .last(),
  assessmentTitleByStatus: (page, title, status) =>
    PHQLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    PHQLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(status, { exact: true }),
  assessmentCardClickByStatus: (page, title, status) =>
    PHQLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    PHQLocators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),
  
  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) =>  page.getByText('2-3 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  clickStart: (page)=> page.getByRole('button', { name: 'Start' }),
  assessmentIntroDialog: (page) => page.getByRole('dialog'),
  tabTitle: (page)=> page.getByRole('heading', { name: 'PHQ-9 Assessment' }),
  tabSubTitle: (page) =>
    PHQLocators.assessmentIntroDialog(page).getByText(
      'Patient Health Questionnaire',
      { exact: true }
    ),
  tabDiscription: (page) =>
    PHQLocators.assessmentIntroDialog(page).getByText(
      'The PHQ-9 (Patient Health Questionnaire-9) is a validated screening tool used to assess the severity of depression symptoms over the past two weeks.',
      { exact: true }
    ),
  questionCount: (page)=> page.getByText('9 quick questions', { exact: true }),
  questionProgress: (page, currentQuestion, totalQuestions) =>
    page.getByText(`Question ${currentQuestion} of ${totalQuestions}`, { exact: true }),
  cancelIcon: (page) =>
    page.getByRole('dialog').getByRole('button', { name: 'Close assessment' }),
  beginAss: (page) =>  page.getByRole('button', { name: 'Begin assessment' }),

 //question 1
pleasureQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
pleasureNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
nextButton: (page) => page.getByText('Next', { exact: true }),

 //question 2
downQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
downNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

//question 3
asleepQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
asleepNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

//question 4
tiredQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
tiredNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
//question 5
appetiteQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
appetiteNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

//question 6
familyQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
familyNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

//question 7
readingQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
readingNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
//question 8
fidgetyQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
fidgetyNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

//question 9
hurtingQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
hurtingNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
//click back button
  backButton: (page) => page.locator('button:has-text("Back")'),
 // Question 9 — revisit/change answer
  hurtingNumberOption2: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

 //question 10
careQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
careNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),


submitButton: (page) => page.getByRole('button', { name: 'Submit', exact: true }),










  }
