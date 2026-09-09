export const ISILocators = {
 dashboardText: (page) => page.getByText(/^Hey\s+.+,\s*$/),
 assTitle: (page) => page.getByText('Insomnia Severity Index (ISI)', { exact: true }),
  assCardClick: (page) => page.getByText(
  'Insomnia Severity Index (ISI)',
  { exact: true }),
  

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page.getByText(title, { exact: true }).locator(
      `xpath=ancestor::div[.//*[normalize-space() = "${status}"]][1]`
    ).first(),
  assessmentTitleByStatus: (page, title, status) =>
    ISILocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    ISILocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(status, { exact: true }),
  assessmentCardClickByStatus: (page, title, status) =>
    ISILocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),

  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    ISILocators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),

  
  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) =>  page.getByText('2-3 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  clickStart: (page)=> page.getByRole('button', { name: 'Start' }),
  assessmentIntroDialog: (page) => page.getByRole('dialog'),
  tabTitle: (page)=>  page.getByRole('heading', { name: 'ISI Sleep Assessment' }) ,
  tabSubTitle: (page) =>
    ISILocators.assessmentIntroDialog(page).getByText(
      'Insomnia Severity Index',
      { exact: true }
    ),
  tabDiscription: (page) =>
    ISILocators.assessmentIntroDialog(page).getByText(
      'The Insomnia Severity Index (ISI) is a brief 7-item screening tool that measures the nature, severity, and impact of insomnia symptoms over the previous two weeks.',
      { exact: true }
    ),
  questionCount: (page)=> page.getByText('7 quick questions', { exact: true }),
  questionProgress: (page, currentQuestion, totalQuestions) =>
    page.getByText(`Question ${currentQuestion} of ${totalQuestions}`, { exact: true }),
  cancelIcon: (page) =>
    page.getByRole('dialog').getByRole('button', { name: 'Close assessment' }),
  beginAss: (page) =>  page.getByRole('button', { name: 'Begin assessment' }),
 //question 1
asleepQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
asleepNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
nextButton: (page) => page.getByText('Next', { exact: true }),

   //question 2
stayingAsleepQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
stayingAsleepNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 3
wakingEarlyQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
wakingEarlyNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 4
satisfactionQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
satisfactionNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 5
interferenceQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
interferenceNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 6
noticeableQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
noticeableNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

   //question 7
worriedQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
worriedNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),

  //in-assessment navigation
  questionBackButton: (page) => page.getByText('Back', { exact: true }),
  submitButton: (page) => page.getByRole('button', { name: 'Submit' }),
 downloadButton: (page) =>page.getByText('Download', { exact: true })


}
