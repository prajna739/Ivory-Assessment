const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const toList = (status) => (Array.isArray(status) ? status : [status]);

// Unanchored: matches the status anywhere in a card's text (used with .filter)
const statusInCardRegex = (status) =>
  new RegExp(toList(status).map(escapeRegex).join('|'));

// Anchored: matches an element whose whole text is the status (used with getByText)
const statusLabelRegex = (status) =>
  new RegExp(`^\\s*(${toList(status).map(escapeRegex).join('|')})\\s*$`);

// Outermost div that still contains exactly ONE "Added on" line = a single card
const CARD_XPATH =
  'xpath=ancestor::div[count(.//p[starts-with(normalize-space(), "Added on ")]) = 1][last()]';

export const STRESSLocators = {
 dashboardText: (page) => page.getByText(/^Hey\s+.+,\s*$/),
 assTitle: (page) => page.getByText('Cognitive Stress Index', { exact: true }),
  assCardClick: (page) => page.getByText(
  'Cognitive Stress Index',
  { exact: true }),
  

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page.getByText(title, { exact: true }).locator(
      `xpath=ancestor::div[.//*[normalize-space() = "${status}"]][1]`
    ).first(),
  assessmentTitleByStatus: (page, title, status) =>
    STRESSLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),
  assessmentStatusByTitle: (page, title, status) =>
    STRESSLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(status, { exact: true }),
  assessmentCardClickByStatus: (page, title, status) =>
    STRESSLocators.assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),

  assessmentReportCard: (page, reportTitle) =>
    page.getByText(reportTitle, { exact: true }).locator(
      'xpath=ancestor::div[.//button][1]'
    ).first(),
  assessmentReportDownloadButton: (page, reportTitle, buttonName) =>
    STRESSLocators.assessmentReportCard(page, reportTitle)
      .getByRole('button', { name: buttonName, exact: true }),

  
  kebabTitle: (page) => page.getByText('Assessment', { exact: true }),
  kebabTime: (page) =>  page.getByText('4-5 mins', { exact: true }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),
  clickStart: (page)=> page.getByText('Start', { exact: true }),
  assessmentIntroDialog: (page) => page.getByRole('dialog'),
  tabTitle: (page)=>  page.locator('h1:has-text("Cognitive Stress Index")') ,
  tabSubTitle: (page) => page.locator('p:has-text("STRESS SCALE QUESTIONNAIRE")'),
  tabDiscription: (page) =>
    STRESSLocators.assessmentIntroDialog(page).getByText(
      'A quick screener designed to assess ongoing stress levels and its impact on cognitive functioning',
      { exact: true }
    ),
  questionCount: (page)=> page.getByText('8 quick questions', { exact: true }),
  secondTask:(page)=> page.getByText('Digit Symbol Substitution Task (DSST)', { exact: true }),
  thirdTask:(page)=> page.getByText('4–5 minutes', { exact: true }),
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
  // questions 2 to 8 (generic)
  questionByText: (page, questionText) =>
    page.getByRole('dialog').getByText(questionText, { exact: false }),
  numberOption: (page, optionNumber) =>
    page
      .getByRole('dialog')
      .getByText(String(optionNumber), { exact: true }),
  questionBackButton: (page) =>
    page.getByRole('dialog').getByRole('button', { name: /back/i }),
  submitButton: (page) =>
    page.getByRole('dialog').getByRole('button', { name: /submit/i }),

  profileDialog: (page) =>
    page.getByRole('dialog').filter({
      has: page.getByRole('heading', { name: 'Your Profile Details' }),
    }),

  profileCloseIcon: (page) =>
    STRESSLocators.profileDialog(page)
      .locator('button.mantine-Modal-close, button[aria-label*="close" i]')
      .first(),

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