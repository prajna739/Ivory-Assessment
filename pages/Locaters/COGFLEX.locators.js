const buildStatusXPath = (status) => {
  const statuses = Array.isArray(status) ? status : [status];

  return statuses
    .map((value) => `normalize-space() = "${value}"`)
    .join(' or ');
};

export const COGFLEXLocators = {
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
      'Cognitive Flexibility Test (COG_FLEX)',
      { exact: true }
    ),

  assCardClick: (page) =>
    page.getByText(
      'Cognitive Flexibility Test (COG_FLEX)',
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
    COGFLEXLocators
      .assessmentCardByTitleAndStatus(
        page,
        title,
        status
      )
      .getByText(title, { exact: true }),

  assessmentStatusByTitle: (page, title, status) =>
    COGFLEXLocators
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
    COGFLEXLocators
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

};