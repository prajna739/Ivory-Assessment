export const ADHDLocators = {
 dashboardText: (page) => page.getByText(/^Hey\s+.+,\s*$/),
 assTitle: (page) => page.getByText('ADHD Assessment (Kids and Teens)', { exact: true }),
  assCardClick: (page) => page.getByText(
  'ADHD Assessment (Kids and Teens)',
  { exact: true }),
  

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page.getByText(title, { exact: true }).locator(
      `xpath=ancestor::div[.//*[normalize-space() = "${status}"]][1]`
    ).first(),
  assessmentTitleByStatus: (page, title, status) =>
    ADHDLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    ADHDLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(status, { exact: true }),
  assessmentCardClickByStatus: (page, title, status) =>
    ADHDLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),

  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    ADHDLocators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),

  
  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) =>  page.getByText('20 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  clickStart: (page)=> page.getByRole('button', { name: 'Start' }),
  assessmentIntroDialog: (page) => page.getByRole('dialog'),
  tabTitle: (page)=> page.getByText('ADHD Assessment', { exact: true }) ,
  tabSubTitle: (page) =>
    ADHDLocators.assessmentIntroDialog(page).getByText(
      'Child Behavior Questionnaire',
      { exact: true }
    ),
  tabDiscription: (page) =>
    ADHDLocators.assessmentIntroDialog(page).getByText(
      'Quick DSM-5 questionnaire and digital tasks to measure attention score for Kids/Teens',
      { exact: true }
    ),
  questionCount: (page)=> page.getByText('18 questions', { exact: true }),
  questionProgress: (page, currentQuestion, totalQuestions) =>
    page.getByText(`Question ${currentQuestion} of ${totalQuestions}`, { exact: true }),
  cancelIcon: (page) =>
    page.getByRole('dialog').getByRole('button', { name: 'Close assessment' }),
  beginAss: (page) =>  page.getByRole('button', { name: 'Begin assessment' }),
    //question 1 
 childQuestionByText: (page, questionText) =>
  page.getByRole('dialog').getByRole('heading', {
    name: questionText,
    exact: true,
  }),

childAnswerButtonByText: (page, optionText) =>
  page.getByRole('dialog').getByRole('button', {
    name: optionText,
    exact: true,
  }),
nextButton: (page) => page.getByText('Next', { exact: true }),
  

  //in-assessment navigation
  questionBackButton: (page) => page.getByText('Back', { exact: true }),
  submitButton: (page) => page.getByRole('button', { name: 'Submit' }),

  // =====================================================
  // Profile
  // =====================================================

  profileTitle: (page) =>
    page.getByRole('heading', {
      name: 'Your Profile Details',
    }),

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

  // =====================================================
  // Continue
  // =====================================================

  continueButton: (page) =>
    page.getByRole('button', {
      name: /i'm ready, continue|continue/i,
    }),
// =====================================================
  // Score option (Assessment simulator, on the main page - NOT in an iframe)
  // =====================================================
  Mixedscore: (page, optionName = 'Mixed score') =>
    page.getByRole('button', {
      name: new RegExp(
        optionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'i'
      ),
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