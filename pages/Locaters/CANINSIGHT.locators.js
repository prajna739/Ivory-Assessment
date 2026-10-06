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

export const CANINSIGHTLocators = {
  // =====================================================
  // Dashboard
  // =====================================================

  dashboardText: (page) =>
    page.getByText(/^Hey\s+.+,\s*$/),

  // =====================================================
  // Assessment
  // =====================================================

  assTitle: (page) =>
    page.getByText('CANTAB® One', { exact: true }),

  assCardClick: (page) =>
    page.getByText('CANTAB® One', { exact: true }),

  // First card with the given title AND one of the given statuses
  assessmentCardByTitleAndStatus: (page, title, status) =>
    page
      .getByText(title, { exact: true })
      .locator(CARD_XPATH)
      .filter({ hasText: statusInCardRegex(status) }) // FIX: unanchored
      .first(),

  assessmentTitleByStatus: (page, title, status) =>
    CANINSIGHTLocators
      .assessmentCardByTitleAndStatus(page, title, status)
      .getByText(title, { exact: true }),

  assessmentStatusByTitle: (page, title, status) =>
    CANINSIGHTLocators
      .assessmentCardByTitleAndStatus(page, title, status)
      .getByText(statusLabelRegex(status)) // anchored is correct here
      .first(),

  assessmentCardClickByStatus: (page, title, status) =>
    CANINSIGHTLocators
      .assessmentCardByTitleAndStatus(page, title, status)
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
    CANINSIGHTLocators.videoDialog(page, modalTitle).locator('iframe').first(),

  videoCloseIcon: (page, modalTitle) => {
    const dialog = CANINSIGHTLocators.videoDialog(page, modalTitle);

    return dialog
      .locator('button.mantine-Modal-close, button[aria-label*="close" i]')
      .or(dialog.getByRole('button'))
      .first();
  },


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
};