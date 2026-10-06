const buildStatusXPath = (status) => {
  const statuses = Array.isArray(status) ? status : [status];

  return statuses
    .map((value) => `normalize-space() = "${value}"`)
    .join(' or ');
};

export const BRAINFOGLocators = {
 dashboardText: (page) => page.getByText(/^Hey\s+.+,\s*$/),
 assTitle: (page) => page.getByText('Brain Fog Index', { exact: true }),
  assCardClick: (page) => page.getByText(
  'Brain Fog Index',
  { exact: true }),
  

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page.getByText(title, { exact: true }).locator(
      `xpath=ancestor::div[.//*[normalize-space() = "${status}"]][1]`
    ).first(),
  assessmentTitleByStatus: (page, title, status) =>
    BRAINFOGLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    BRAINFOGLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(status, { exact: true }),
  assessmentCardClickByStatus: (page, title, status) =>
    BRAINFOGLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),

  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    BRAINFOGLocators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),

  
  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) => page.getByText('4-5 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  clickStart: (page)=> page.getByRole('button', { name: 'Start' }),
  assessmentIntroDialog: (page) => page.getByRole('dialog'),
  tabTitle: (page)=>
  BRAINFOGLocators.assessmentIntroDialog(page)
    .getByRole('heading', { name: 'Brain Fog Index', exact: true }) ,
  tabSubTitle: (page) =>
    BRAINFOGLocators.assessmentIntroDialog(page).getByText(
      'Cognitive Clarity Assessment',
      { exact: true }
    ),
  tabDiscription: (page) =>
    BRAINFOGLocators.assessmentIntroDialog(page).getByText(
      'A quick screener to assess brain fog, combining a cognitive clarity scale with an objective cognitive test.',
      { exact: true }
    ),
  questionCount: (page)=> page.getByText('5 quick questions', { exact: true }),
  secondTask:(page)=> page.getByText('Digit Symbol Substitution Task (DSST)', { exact: true }),
  secondTaskTime:(page)=>page.getByText('4–5 minutes', { exact: true }),
  questionProgress: (page, currentQuestion, totalQuestions) =>
    page.getByText(`Question ${currentQuestion} of ${totalQuestions}`, { exact: true }),
  cancelIcon: (page) =>
    page.getByRole('dialog').getByRole('button', { name: 'Close assessment' }),
  beginAss: (page) =>  page.getByRole('button', { name: 'Begin assessment' }),


   //question 1
mentalQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByText(questionText, { exact: false }),
mentalNumberOption: (page, optionNumber) =>
  page
    .getByRole('dialog')
    .getByText(String(optionNumber), { exact: true }),
nextButton: (page) => page.getByText('Next', { exact: true }),
  // ---------- Questions 2 - 5 (generic, reusable) ----------
  questionTitleExact: (page, questionText) =>
    page.getByRole('dialog').getByText(questionText, { exact: true }),
  answerNumberOption: (page, optionNumber) =>
    page.getByRole('dialog').getByText(String(optionNumber), { exact: true }),
  answerTextLabel: (page, answerText) =>
    page.getByRole('dialog').getByText(answerText, { exact: true }).first(),
  questionBackButton: (page) =>
    page.getByRole('dialog').getByRole('button', { name: 'Back', exact: true }),
  submitButton: (page) =>
    page.getByRole('button', { name: 'Submit', exact: true }),
  chooseAnswerPrompt: (page) =>
    page.getByRole('dialog').getByText('Choose an answer', { exact: true }),
 
  // =====================================================
  // Start / Resume
  // =====================================================

  startOrResumeButton: (page) =>
    page.getByRole('button', { name: /^(start|resume)\b/i }),

  // =====================================================
  // Profile
  // =====================================================

  profileTitle: (page) =>
    page.getByRole('heading', { name: 'Your Profile Details' }),

  profileDescription: (page) =>
    page.getByText(
      'Your actual age and gender are required for accurate assessment results',
      { exact: true }
    ),

  fullName: (page) =>
    page
      .getByRole('dialog')
      .getByText('Full Name', { exact: true })
      .locator('xpath=following::p[1]'),

  dateofBirth: (page) =>
    page
      .getByRole('dialog')
      .getByText('Date of Birth', { exact: true })
      .locator('xpath=following::p[1]'),

  genderDetail: (page) =>
    page
      .getByRole('dialog')
      .getByText('Gender', { exact: true })
      .locator('xpath=following::p[1]'),

  levelEducation: (page) =>
    page
      .getByRole('dialog')
      .getByText('Level of Education', { exact: true })
      .locator('xpath=following::p[1]'),

  preferedLan: (page) =>
    page.getByText('Preferred Language', { exact: true }),

  // =====================================================
  // Continue
  // =====================================================

  continueButton: (page) =>
    page
      .getByRole('button', { name: /i'm ready, continue|^continue$/i })
      .first(),

  // =====================================================
  // Score option
  // =====================================================

  completeWithMixedScores: (page) =>
    page
      .frameLocator('iframe')
      .getByRole('button', {
        name: 'Complete with mixed scores',
        exact: true,
      }),

  // =====================================================
  // Report download
  // =====================================================

  downloadButton: (page) =>
    page.getByRole('button', { name: 'Download', exact: true }),

  // Download button inside the "Assessment Report" card only
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    page
      .getByText(reportTitle, { exact: true })
      .locator(
        `xpath=ancestor::div[.//button[normalize-space() = "${buttonName}"]][1]`
      )
      .getByRole('button', { name: buttonName, exact: true }),

}