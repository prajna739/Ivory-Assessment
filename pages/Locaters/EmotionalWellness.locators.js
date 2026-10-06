const buildStatusXPath = (status) => {
  const statuses = Array.isArray(status) ? status : [status];

  return statuses
    .map((value) => `normalize-space() = "${value}"`)
    .join(' or ');
};

export const EmotionalWellnessLocators = {
  // =====================================================
  // Dashboard
  // =====================================================

  dashboardText: (page) =>
    page.getByText(/^Hey\s+.+,\s*$/),

  // =====================================================
  // Assessment
  // =====================================================

  assTitle: (page) =>
    page.getByText(
      'Emotional Wellness Assessment',
      { exact: true }
    ),

  assCardClick: (page) =>
    page.getByText(
      'Emotional Wellness Assessment',
      { exact: true }
    ),

  assessmentCardByTitleAndStatus: (page, title, status) => {
    const statusXPath = buildStatusXPath(status);

    return page
      .getByText(title, { exact: true })
      .locator(
        `xpath=ancestor::div[.//*[${statusXPath}]][1]`
      )
      .first();
  },

  assessmentTitleByStatus: (page, title, status) =>
    EmotionalWellnessLocators
      .assessmentCardByTitleAndStatus(
        page,
        title,
        status
      )
      .getByText(title, { exact: true }),

  assessmentStatusByTitle: (page, title, status) =>
    EmotionalWellnessLocators
      .assessmentCardByTitleAndStatus(
        page,
        title,
        status
      )
      .locator(
        `xpath=.//span[${buildStatusXPath(status)}]`
      )
      .first(),

  assessmentCardClickByStatus: (page, title, status) =>
    EmotionalWellnessLocators
      .assessmentCardByTitleAndStatus(
        page,
        title,
        status
      )
      .getByText(title, { exact: true }),

  // =====================================================
  // Start / Resume
  // =====================================================

  // Works for both "Yet to be Started" (Start) and "In Progress" (Resume)
  startOrResumeButton: (page) =>
    page.getByRole('button', { name: /^(start|resume)$/i }),

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
  assessmentIntroDialog: (page) => page.getByRole('heading', { name: 'Emotional Wellness Assessment' }),
  tabTitle: (page) => page.getByText('A few quick questions', { exact: true }),
  secondAssessmentTitle: (page) => page.getByText('A short voice recording', { exact: true }),
  assessmentTime: (page) => page.getByText('A short voice recording', { exact: true }),
  startAssessment: (page) => page.getByRole('button', { name: 'Start assessment' }),
  backArrow: (page) => page.locator("//button[@aria-label='Back']//span[@class='m_8d3afb97 mantine-ActionIcon-icon']//*[name()='svg']"),

  // =====================================================
  // Exit Warning Popup
  // =====================================================

  exitPopupTitle: (page) =>
    page.getByText('Your progress may be lost', { exact: true }),

  exitPopupMessage: (page) =>
    page.getByText(/Are you sure you want to exit the Assessment/i),

  exitButton: (page) =>
    page.getByRole('button', { name: 'Exit', exact: true }),

  stayButton: (page) =>
    page.getByRole('button', { name: 'Stay', exact: true }),

  // Product page shown after Exit
  productPageTitle: (page) =>
    page.getByRole('heading', { name: 'Emotional Wellness Assessment' }),

  inProgressBadge: (page) =>
    page.getByText(/In Progress/i).first(),

  // =====================================================
  // Question 1
  // =====================================================

  anxiousQuestionByText: (page, questionText) =>
    page.getByRole('heading', { name: questionText }),

  anxiousNumberOption: (page, optionNumber) =>
    page.getByText(String(optionNumber), { exact: true }),

  nextButton: (page) =>
    page.getByRole('button', { name: 'Next', exact: true }),

  questionProgress: (page, current, total) =>
    page.getByText(new RegExp(`\\b${current}\\s*/\\s*${total}\\b`)).first(),

  // =====================================================
  // Question 2
  // =====================================================

  worryQuestionByText: (page, questionText) =>
    page.getByRole('heading', { name: questionText }),

  worryNumberOption: (page, optionNumber) =>
    page.getByText(String(optionNumber), { exact: true }),

  // =====================================================
  // Question 3
  // =====================================================

  interestQuestionByText: (page, questionText) =>
    page.getByRole('heading', { name: questionText }),

  interestNumberOption: (page, optionNumber) =>
    page.getByText(String(optionNumber), { exact: true }),

  // =====================================================
  // Question 4
  // =====================================================

  depressedQuestionByText: (page, questionText) =>
    page.getByRole('heading', { name: questionText }),

  depressedNumberOption: (page, optionNumber) =>
    page.getByText(String(optionNumber), { exact: true }),

  // Last question shows "Continue" instead of "Next"
  questionContinueButton: (page) =>
    page.getByRole('button', { name: 'Continue', exact: true }),
};