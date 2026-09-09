export const CFQLocators = {
 dashboardText: (page) => page.getByText(/^Hey\s+.+,\s*$/),
    assTitle: (page) => page.getByText('Cognitive Failure Check (CFQ 2.0)', { exact: true }),
  assCardClick: (page) => page.getByText(
  'Cognitive Failure Check (CFQ 2.0)',
  { exact: true }),
  

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page.getByText(title, { exact: true }).locator(
      `xpath=ancestor::div[.//*[normalize-space() = "${status}"]][1]`
    ).first(),
  assessmentTitleByStatus: (page, title, status) =>
    CFQLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    CFQLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(status, { exact: true }),
  assessmentCardClickByStatus: (page, title, status) =>
    CFQLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),

  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    CFQLocators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),
  
  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) =>  page.getByText('3-4 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  clickStart: (page)=> page.getByRole('button', { name: 'Start' }),
  assessmentIntroDialog: (page) => page.getByRole('dialog'),
  tabTitle: (page)=>  page.getByRole('heading', { name: 'CFQ 2.0 Cognitive Check' }) ,
  tabSubTitle: (page) =>
    CFQLocators.assessmentIntroDialog(page).getByText(
      'Cognitive Failures Questionnaire',
      { exact: true }
    ),
  tabDiscription: (page) =>
    CFQLocators.assessmentIntroDialog(page).getByText(
      'CFQ 2.0 is a measure of everyday mental slips, evaluating lapses in memory, attention, and action on a 0 to 100 scale over the past six months',
      { exact: true }
    ),
  questionCount: (page)=> page.getByText('15 quick questions', { exact: true }),
  questionProgress: (page, currentQuestion, totalQuestions) =>
    page.getByText(`Question ${currentQuestion} of ${totalQuestions}`, { exact: true }),
  cancelIcon: (page) =>
    page.getByRole('dialog').getByRole('button', { name: 'Close assessment' }),
  beginAss: (page) =>  page.getByRole('button', { name: 'Begin assessment' }),

   //question 1
forgetQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
forgetNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
nextButton: (page) => page.getByText('Next', { exact: true }),
   //question 2
doorQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
doorNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
   //question 3
hearQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
hearNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 4
appointmentQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
appointmentNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 5
throwQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
throwNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 6
shopsQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
shopsNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 7
keysQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
keysNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 8
passwordsQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
passwordsNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 9
deliveryQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
deliveryNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 10
nameQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
nameNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
   //question 11
namesInConvoQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
namesInConvoNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 12
datesQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
datesNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 13
wrongPlaceQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
wrongPlaceNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 14
leaveHomeQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
leaveHomeNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
//click back button
  backButton: (page) => page.locator('button:has-text("Back")'),
 // Question 14 — revisit/change answer
  leaveHomeNumberOption2: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 15
missingQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
missingNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),


submitButton: (page) => page.getByRole('button', { name: 'Submit', exact: true }),
downloadButton: (page) =>page.getByText('Download', { exact: true })
}