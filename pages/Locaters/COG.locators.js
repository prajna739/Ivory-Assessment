export const COGLocators = {

  // =====================================================
  // Dashboard / Assessment
  // =====================================================

  dashboardText: (page) =>
    page.getByText(/^Hey\s+.+,\s*$/),

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

  assessmentCardByTitleAndStatus: (page, title, status) =>
    page
      .getByText(title, { exact: true })
      .locator(
        `xpath=ancestor::div[.//*[normalize-space() = "${status}"]][1]`
      )
      .first(),

  assessmentTitleByStatus: (page, title, status) =>
    COGLocators
      .assessmentCardByTitleAndStatus(
        page,
        title,
        status
      )
      .getByText(title, { exact: true }),

  assessmentStatusByTitle: (page, title, status) =>
    COGLocators
      .assessmentCardByTitleAndStatus(
        page,
        title,
        status
      )
      .getByText(status, { exact: true }),

  assessmentCardClickByStatus: (page, title, status) =>
    COGLocators
      .assessmentCardByTitleAndStatus(
        page,
        title,
        status
      )
      .getByText(title, { exact: true }),

  resumeButton: (page) =>
    page.getByRole('button', {
      name: /resume/i
    }),

  continueButton: (page) =>
    page.getByRole('button', {
      name: /i'm ready, continue|continue/i
    }),


  // =====================================================
  // COG GAME
  // =====================================================

  cogFrame: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame(),


  // =====================================================
  // STEP 1
  // First Start button
  // =====================================================

  startButton: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByRole('button', {
        name: /^Start$/i
      })
      .first(),


  // =====================================================
  // STEP 2
  // Practice popup
  // =====================================================

  practiceDialog: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByRole('dialog', {
        name: /Practice/i
      }),


  practiceStartButton: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByRole('dialog', {
        name: /Practice/i
      })
      .getByRole('button', {
        name: /^Start$/i
      }),


  // =====================================================
  // STEP 3
  // "CLICK HERE 5 MORE TIME(S)"
  //
  // The button has no accessible name.
  // We locate the button itself.
  // =====================================================

  practiceGameButton: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .locator('button')
      .first(),


  practiceGameText: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByText(
        /CLICK HERE.*MORE TIME/i
      ),


  // =====================================================
  // STEP 4
  // Are you ready to start the test?
  // =====================================================

  readyDialog: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByRole('dialog', {
        name: /Are you ready to start the test/i
      }),


  yesStartTestButton: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByRole('dialog', {
        name: /Are you ready to start the test/i
      })
      .getByRole('button', {
        name: /Yes, start the test/i
      }),


  // =====================================================
  // STEP 5
  // Remember popup
  // =====================================================

  rememberDialog: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByRole('dialog', {
        name: /Remember/i
      }),


  rememberStartButton: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByRole('dialog', {
        name: /Remember/i
      })
      .getByRole('button', {
        name: /^Start$/i
      }),


  // =====================================================
  // STEP 6
  // Main game button
  // =====================================================

  mainGameButton: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .locator('button')
      .first(),


  mainGameText: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByText(
        /CLICK AS MANY TIMES AS YOU CAN/i
      ),


  // =====================================================
  // STEP 7
  // Countdown
  // =====================================================

  countdownText: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByText(
        /\d+\s+second\(s\)\s+left\s+before\s+starting\s+measuring/i
      ),


  // =====================================================
  // STEP 8
  // Dexterity measurement
  // =====================================================

  dexterityText: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByText(
        /Dexterity:\s*\d+%/i
      ),


  // =====================================================
  // Task indicator
  // =====================================================

  taskIndicator: (page) =>
    page
      .locator('iframe')
      .first()
      .contentFrame()
      .getByText(
        /Task \d+ of \d+/i
      ),

      // ==================== GAME 2 LOCATORS ====================

game2PracticeCircle: (page) =>
  page.locator('iframe').first().contentFrame().locator('button'),

game2MainCircle: (page) =>
  page.locator('iframe').first().contentFrame().locator('button'),
};