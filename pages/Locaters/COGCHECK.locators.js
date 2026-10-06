const buildStatusXPath = (status) => {
  const statuses = Array.isArray(status) ? status : [status];

  return statuses
    .map((value) => `normalize-space() = "${value}"`)
    .join(' or ');
};

export const COGCHECKLocators = {
  dashboardText: (page) => page.getByText(/^Hey\s+.+,\s*$/),
  assTitle: (page) => page.getByText('COGCHECK Assessment', { exact: true }).first(),
  assCardClick: (page) => page.getByText('COGCHECK Assessment', { exact: true }),

  assessmentCardByTitleAndStatus: (page, title, status) => {
    const statusXPath = buildStatusXPath(status);

    return page
      .getByText(title, { exact: true })
      .locator(`xpath=ancestor::div[.//*[${statusXPath}]][1]`)
      .first();
  },
  assessmentTitleByStatus: (page, title, status) =>
    COGCHECKLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    COGCHECKLocators.assessmentCardByTitleAndStatus(page, title, status)
      .locator(`xpath=.//span[${buildStatusXPath(status)}]`)
      .first(),
  assessmentCardClickByStatus: (page, title, status) =>
    COGCHECKLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),

  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    COGCHECKLocators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),

  
  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) => page.getByText('5 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  clickStart: (page)=> page.getByRole('button', { name: 'Start' }),
  assessmentIntroDialog: (page) => page.getByRole('dialog'),
  tabTitle: (page)=>  page.locator('h1:has-text("COGCHECK")'),
  tabSubTitle: (page) =>
    COGCHECKLocators.assessmentIntroDialog(page).getByText(
      'Cognitive Lapses Assessment',
      { exact: true }
    ),
  tabDiscription: (page) =>
    COGCHECKLocators.assessmentIntroDialog(page).getByText(
      'A quick screener to assess everyday cognitive lapses with an objective cognitive test.',
      { exact: true }
    ),
  questionCount: (page)=>  page.getByText('15 quick questions', { exact: true }),
  questionDescription:(page)=> page.getByText('These are minor mistakes everyone makes. Answer based on the past six months.', { exact: true }),
  task2Title:(page)=> page.getByText('Digit Symbol Substitution Task (DSST)', { exact: true }),
  task2Description:(page)=> page.getByText('Tests Processing speed, Memory, Attention and Motor skills.', { exact: true }),
  taskTime:(page)=> page.getByText('5 minutes', { exact: true }), 
  taskTimeDescription:(page)=>page.getByText('No prep needed, please ensure you are in a quiet environment free from distractions.', { exact: true }), 
  questionProgress: (page, currentQuestion, totalQuestions) =>
    page.getByText(`Question ${currentQuestion} of ${totalQuestions}`, { exact: true }),
  cancelIcon: (page) =>
    page.getByRole('dialog').getByRole('button', { name: 'Close assessment' }),
  beginAss: (page) =>  page.getByRole('button', { name: 'Begin assessment' }),
  readyContinueButton: (page) =>
    page.getByRole('dialog').getByRole('button', {
      name: /i'm ready, continue|continue/i
    }),

   //question 1
forgetQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
forgetNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
nextButton: (page) => page.getByText('Next', { exact: true }),
questionBackButton: (page) =>
  page.getByRole('dialog').getByRole('button', { name: /^Back$/ }),
submitButton: (page) =>
  page.getByRole('dialog').getByRole('button', { name: /^Submit$/ }),

//Assessment 2
profileTitle:(page)=>page.getByRole('heading', { name: 'Your Profile Details' }),
profileDescription:(page)=>page.getByText('Your actual age and gender are required for accurate assessment results', { exact: true }),
//click cancel icon
cancelSymbol:(page)=>page.locator("//button[@class='mantine-focus-auto mantine-active m_86a44da5 mantine-CloseButton-root m_87cf2631 mantine-UnstyledButton-root']//*[name()='svg']"),
resumeButton:(page)=>page.getByRole('button', { name: 'Resume' }),
profileField: (page, label) =>
  page
    .getByRole('dialog')
    .locator('div')
    .filter({ has: page.getByText(label, { exact: true }) })
    .first(),
fullName:(page)=>page.getByRole('dialog').getByText('Full Name', { exact: true }).locator('xpath=following::p[1]'),
dateofBirth:(page)=>page.getByRole('dialog').getByText('Date of Birth', { exact: true }).locator('xpath=following::p[1]'),
genderDetail:(page)=>page.getByRole('dialog').getByText('Gender', { exact: true }).locator('xpath=following::p[1]'),
levelEducation:(page)=> page.getByRole('dialog').getByText('Level of Education', { exact: true }).locator('xpath=following::p[1]'),
preferedLan:(page)=> page.getByText('Preferred Language', { exact: true }),
continueButton:(page)=>page.getByRole('button', { name: 'Continue' }),
//select score option
completeWithMixedScores: (page) =>
  page
    .frameLocator('iframe')
    .getByRole('button', {
      name: 'Complete with mixed scores',
      exact: true
    }),
//
 downloadButton:(page)=> page.getByText('Download', { exact: true })

}