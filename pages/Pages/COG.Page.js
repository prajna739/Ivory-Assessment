import { COGLocators } from '../Locaters/COG.locators';

export class COGPage {

  constructor(page) {

    this.page = page;


    // =====================================================
    // Dashboard / Assessment
    // =====================================================

    this.dashboardText =
      COGLocators.dashboardText(page);

    this.assTitle =
      COGLocators.assTitle(page);

    this.assCardClick =
      COGLocators.assCardClick(page);

    this.resumeButton =
      COGLocators.resumeButton(page);

    this.continueButton =
      COGLocators.continueButton(page);


    // =====================================================
    // COG Game
    // =====================================================

    this.startButton =
      COGLocators.startButton(page);

    this.practiceDialog =
      COGLocators.practiceDialog(page);

    this.practiceStartButton =
      COGLocators.practiceStartButton(page);

    this.practiceGameButton =
      COGLocators.practiceGameButton(page);

    this.readyDialog =
      COGLocators.readyDialog(page);

    this.yesStartTestButton =
      COGLocators.yesStartTestButton(page);

    this.rememberDialog =
      COGLocators.rememberDialog(page);

    this.rememberStartButton =
      COGLocators.rememberStartButton(page);

    this.mainGameButton =
      COGLocators.mainGameButton(page);

    this.mainGameText =
      COGLocators.mainGameText(page);

    this.countdownText =
      COGLocators.countdownText(page);

    this.dexterityText =
      COGLocators.dexterityText(page);

    this.taskIndicator =
      COGLocators.taskIndicator(page);
  }


  // =====================================================
  // Assessment Methods
  // =====================================================

  getAssessmentTitleByStatus(title, status) {

    return COGLocators.assessmentTitleByStatus(
      this.page,
      title,
      status
    );
  }


  getAssessmentStatusByTitle(title, status) {

    return COGLocators.assessmentStatusByTitle(
      this.page,
      title,
      status
    );
  }


  async clickAssessmentCardByStatus(title, status) {

    await COGLocators
      .assessmentCardClickByStatus(
        this.page,
        title,
        status
      )
      .click();
  }


  async clickResume() {

    await this.resumeButton.waitFor({
      state: 'visible',
      timeout: 30_000
    });

    await this.resumeButton.click();
  }


  async clickContinue() {

    await this.continueButton.waitFor({
      state: 'visible',
      timeout: 30_000
    });

    await this.continueButton.click();
  }

//GAME 1
  // =====================================================
  // STEP 1
  // Click first Start
  // =====================================================

  async clickStart() {

    console.log(
      'STEP 1: Clicking first Start button'
    );

    await this.startButton.waitFor({
      state: 'visible',
      timeout: 10_000
    });

    await this.startButton.click();

    console.log(
      'First Start clicked'
    );
  }


  // =====================================================
  // STEP 2
  // Practice popup -> Start
  // =====================================================

  async clickPracticeStart() {

    console.log(
      'STEP 2: Waiting for Practice popup'
    );

    await this.practiceDialog.waitFor({
      state: 'visible',
      timeout: 10_000
    });

    console.log(
      'Practice popup displayed'
    );

    await this.practiceStartButton.click();

    console.log(
      'Practice Start clicked'
    );
  }


  // =====================================================
  // Get center of game button
  // =====================================================

  async getGameButtonCenter(locator) {

    const box =
      await locator.boundingBox();

    if (!box) {
      throw new Error(
        'Game button bounding box was not found.'
      );
    }

    return {
      x: box.x + box.width / 2,
      y: box.y + box.height / 2
    };
  }


  // =====================================================
  // STEP 3
  // Click center of "CLICK HERE 5 MORE TIMES"
  // exactly 5 times
  // =====================================================

  async clickPracticeBox(
    clickCount
  ) {

    console.log(
      `STEP 3: Clicking practice box ${clickCount} times`
    );

    await this.practiceGameButton.waitFor({
      state: 'visible',
      timeout: 10_000
    });


    const center =
      await this.getGameButtonCenter(
        this.practiceGameButton
      );


    console.log(
      `Practice box center: X=${center.x}, Y=${center.y}`
    );


    for (
      let i = 1;
      i <= clickCount;
      i++
    ) {

      // Normal mouse LEFT click at center
      await this.page.mouse.click(
        center.x,
        center.y
      );

      console.log(
        `Practice click: ${i}/${clickCount}`
      );
    }


    console.log(
      'Practice 5 clicks completed'
    );
  }


  // =====================================================
  // STEP 4
  // Yes, start the test
  // =====================================================

  async clickYesStartTest() {

    console.log(
      'STEP 4: Waiting for "Are you ready to start the test?"'
    );

    await this.readyDialog.waitFor({
      state: 'visible',
      timeout: 10_000
    });


    console.log(
      'Ready dialog displayed'
    );


    await this.yesStartTestButton.click();


    console.log(
      '"Yes, start the test" clicked'
    );
  }


  // =====================================================
  // STEP 5
  // Remember popup -> Start
  // =====================================================

  async clickRememberStart() {

    console.log(
      'STEP 5: Waiting for Remember popup'
    );

    await this.rememberDialog.waitFor({
      state: 'visible',
      timeout: 10_000
    });


    console.log(
      'Remember popup displayed'
    );


    await this.rememberStartButton.click();


    console.log(
      'Remember Start clicked'
    );
  }


  // =====================================================
  // STEP 6
  // Wait for measurement to start
  //
  // Video shows:
  // "5 second(s) left before starting measuring"
  //
  // Then:
  // "Dexterity: XX%"
  // =====================================================

  async waitForMeasurementToStart() {

    console.log(
      'STEP 6: Waiting for measurement to start'
    );


    await this.dexterityText.waitFor({
      state: 'visible',
      timeout: 10_000
    });


    console.log(
      'Measurement has started'
    );
  }


  // =====================================================
  // STEP 7
  // Click main game box center 10 times
  // =====================================================

  async clickMainGameBox(
    clickCount
  ) {

    console.log(
      `STEP 7: Clicking main game box ${clickCount} times`
    );


    await this.mainGameButton.waitFor({
      state: 'visible',
      timeout: 10_000
    });


    const center =
      await this.getGameButtonCenter(
        this.mainGameButton
      );


    console.log(
      `Main game box center: X=${center.x}, Y=${center.y}`
    );


    for (
      let i = 1;
      i <= clickCount;
      i++
    ) {

      // Normal mouse LEFT click at center
      await this.page.mouse.click(
        center.x,
        center.y
      );

      console.log(
        `Main game click: ${i}/${clickCount}`
      );
    }


    console.log(
      'Main game 10 clicks completed'
    );
  }


  // =====================================================
  // Verify Dexterity
  // =====================================================

  async getDexterity() {

    await this.dexterityText.waitFor({
      state: 'visible',
      timeout: 10_000
    });


    const text =
      await this.dexterityText.innerText();


    console.log(
      `Dexterity: ${text}`
    );


    return text;
  }


  // =====================================================
  // Verify Task
  // =====================================================

  async getCurrentTask() {

    await this.taskIndicator.waitFor({
      state: 'visible',
      timeout: 10_000
    });


    const task =
      await this.taskIndicator.innerText();


    console.log(
      `Current Task: ${task}`
    );


    return task;
    
  }

  // ==================== GAME 2 METHODS ====================

async getCircleButtonCenter(circleLocator) {
  const buttons = circleLocator;
  const count = await buttons.count();

  for (let i = 0; i < count; i++) {
    const button = buttons.nth(i);

    if (await button.isVisible()) {
      const box = await button.boundingBox();

      if (
        box &&
        box.width >= 40 &&
        box.width <= 100 &&
        box.height >= 40 &&
        box.height <= 100 &&
        Math.abs(box.width - box.height) <= 20
      ) {
        return {
          x: box.x + box.width / 2,
          y: box.y + box.height / 2
        };
      }
    }
  }

  throw new Error('Game 2 circle was not found.');
}


// Step 1 + Step 2
// Click the Start button on Practice popup,
// then right-click the center of the circle 3 times.
async clickGame2PracticeCircle(clickCount) {
  const circleLocator = COGLocators.game2PracticeCircle(this.page);

  await circleLocator.first().waitFor({
    state: 'visible',
    timeout: 10000
  });

  for (let i = 1; i <= clickCount; i++) {
    const center = await this.getCircleButtonCenter(circleLocator);

    await this.page.mouse.click(center.x, center.y, {
      button: 'right'
    });

    console.log(`Game 2 practice circle right-click: ${i}/${clickCount}`);
  }
}


// Step 5
// Click the center of the circle 23 times.
async clickGame2MainCircle(clickCount) {
  const circleLocator = COGLocators.game2MainCircle(this.page);

  await circleLocator.first().waitFor({
    state: 'visible',
    timeout: 10000
  });

  for (let i = 1; i <= clickCount; i++) {
    const center = await this.getCircleButtonCenter(circleLocator);

    await this.page.mouse.click(center.x, center.y);

    console.log(`Game 2 main circle click: ${i}/${clickCount}`);
  }
}
}