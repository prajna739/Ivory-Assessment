const buildStatusXPath = (status) => {
  const statuses = Array.isArray(status) ? status : [status];

  return statuses
    .map((value) => `normalize-space() = "${value}"`)
    .join(' or ');
};

export const DIYLocators = {
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
      'Cognitive Assessment (DIY)',
      { exact: true }
    ),

  assCardClick: (page) =>
    page.getByText(
      'Cognitive Assessment (DIY)',
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
    DIYLocators
      .assessmentCardByTitleAndStatus(
        page,
        title,
        status
      )
      .getByText(title, { exact: true }),

  assessmentStatusByTitle: (page, title, status) =>
    DIYLocators
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
    DIYLocators
      .assessmentCardByTitleAndStatus(
        page,
        title,
        status
      )
      .getByText(title, { exact: true }),
//======================================
//Youtube VideoPlay
//======================================
youtubePlay:(page)=> page.locator(':text-is("Watch this video before you start")'),

  // =====================================================
  // NEW - Video modal ("Watch Before You Start")
  // =====================================================

  // The modal that opens after clicking the video banner
  videoDialog: (page, modalTitle) =>
    page.getByRole('dialog').filter({ hasText: modalTitle }),

  // Modal header text
  videoModalTitle: (page, modalTitle) =>
    page.getByRole('dialog').getByText(modalTitle, { exact: true }),

  // YouTube player embedded inside the modal
  videoFrame: (page, modalTitle) =>
    DIYLocators.videoDialog(page, modalTitle).locator('iframe').first(),

  // X (cancel) icon at the top-right of the modal.
  // Buttons inside the YouTube iframe are not part of this DOM, so the
  // only main-page button in the dialog is the X.
  videoCloseIcon: (page, modalTitle) => {
    const dialog = DIYLocators.videoDialog(page, modalTitle);

    return dialog
      .locator('button.mantine-Modal-close, button[aria-label*="close" i]')
      .or(dialog.getByRole('button'))
      .first();
  },

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