import { expect } from '@playwright/test';
import { EmotionalWellnessLocators } from '../Locaters/EmotionalWellness.locators';

export class EmotionalWellnessPage {
  constructor(page) {
    this.page = page;

    // Dashboard
    this.dashboardText = EmotionalWellnessLocators.dashboardText(page);

    // Assessment
    this.assTitle = EmotionalWellnessLocators.assTitle(page);
    this.assCardClick = EmotionalWellnessLocators.assCardClick(page);

    // Buttons
    this.startOrResumeButton = EmotionalWellnessLocators.startOrResumeButton(page);
    this.continueButton = EmotionalWellnessLocators.continueButton(page);

    // Profile
    this.profileTitle = EmotionalWellnessLocators.profileTitle(page);
    this.profileDescription = EmotionalWellnessLocators.profileDescription(page);
    this.fullName = EmotionalWellnessLocators.fullName(page);
    this.dateofBirth = EmotionalWellnessLocators.dateofBirth(page);
    this.genderDetail = EmotionalWellnessLocators.genderDetail(page);

    // Assessment
    this.assessmentIntroDialog = EmotionalWellnessLocators.assessmentIntroDialog(page);
    this.tabTitle = EmotionalWellnessLocators.tabTitle(page);
    this.secondAssessmentTitle = EmotionalWellnessLocators.secondAssessmentTitle(page);
    this.assessmentTime = EmotionalWellnessLocators.assessmentTime(page);
    this.startAssessment = EmotionalWellnessLocators.startAssessment(page);

    this.backArrow = EmotionalWellnessLocators.backArrow(page);
  }

  // =====================================================
  // Exit warning popup locators (lazy getters)
  // Resolved only when used, so a missing locator fails at the
  // step that needs it instead of breaking the constructor.
  // =====================================================

  get exitPopupTitle() {
    return EmotionalWellnessLocators.exitPopupTitle(this.page);
  }

  get exitPopupMessage() {
    return EmotionalWellnessLocators.exitPopupMessage(this.page);
  }

  get exitButton() {
    return EmotionalWellnessLocators.exitButton(this.page);
  }

  get stayButton() {
    return EmotionalWellnessLocators.stayButton(this.page);
  }

  get inProgressBadge() {
    return EmotionalWellnessLocators.inProgressBadge(this.page);
  }

  // =====================================================
  // Assessment
  // =====================================================

  getAssessmentTitleByStatus(title, status) {
    return EmotionalWellnessLocators.assessmentTitleByStatus(this.page, title, status);
  }

  getAssessmentStatusByTitle(title, status) {
    return EmotionalWellnessLocators.assessmentStatusByTitle(this.page, title, status);
  }

  async clickAssessmentCardByStatus(title, status) {
    await EmotionalWellnessLocators.assessmentCardClickByStatus(
      this.page,
      title,
      status
    ).click();
  }

  // =====================================================
  // Start or Resume
  // =====================================================

  // Start (Yet to be Started) or Resume (In Progress), whichever is shown
  async clickStartOrResume() {
    await this.startOrResumeButton.click();
  }

  // =====================================================
  // Continue
  // =====================================================

  async clickContinue() {
    await this.continueButton.click();
  }

  // =====================================================
  // Assessment detail
  // =====================================================

  async VerifyassessmentIntroDialog() {
    return this.assessmentIntroDialog.isVisible();
  }

  async VerifytabTitle() {
    return this.tabTitle.isVisible();
  }

  async VerifysecondAssessmentTitle() {
    return this.secondAssessmentTitle.isVisible();
  }

  async VerifyassessmentTime() {
    return this.assessmentTime.isVisible();
  }

  async ClickstartAssessment() {
    await this.startAssessment.click();
  }

  // =====================================================
  // Exit warning popup
  // =====================================================

  // Browser back arrow
  async clickBrowserBack() {
    await this.page.goBack({ waitUntil: 'commit' });
  }

  async verifyExitPopup() {
    await expect(this.exitPopupTitle).toBeVisible();
    await expect(this.exitPopupMessage).toBeVisible();
    await expect(this.exitButton).toBeVisible();
    await expect(this.stayButton).toBeVisible();
  }

  async clickExit() {
    await this.exitButton.click();
  }

  async clickStay() {
    await this.stayButton.click();
  }

//question 1
    getanxiousQuestion(questionText) {
      return EmotionalWellnessLocators.anxiousQuestionByText(this.page, questionText);
    }
    
    getanxiousOption(option) {
      return EmotionalWellnessLocators.anxiousNumberOption(this.page, option.number);
    }
    
    async selectanxiousOption(option) {
      await this.getanxiousOption(option).click();
    }


    getNextButton() {
      return EmotionalWellnessLocators.nextButton(this.page);
    }
    
    async clickNextButton() {
      await this.getNextButton().click();
    }
      getQuestionProgress(current, total) {
    return EmotionalWellnessLocators.questionProgress(this.page, current, total);
  }
    // question 2
  getworryQuestion(questionText) {
    return EmotionalWellnessLocators.worryQuestionByText(this.page, questionText);
  }

  getworryOption(option) {
    return EmotionalWellnessLocators.worryNumberOption(this.page, option.number);
  }

  async selectworryOption(option) {
    await this.getworryOption(option).click();
  }

  // question 3
  getinterestQuestion(questionText) {
    return EmotionalWellnessLocators.interestQuestionByText(this.page, questionText);
  }

  getinterestOption(option) {
    return EmotionalWellnessLocators.interestNumberOption(this.page, option.number);
  }

  async selectinterestOption(option) {
    await this.getinterestOption(option).click();
  }

  // question 4
  getdepressedQuestion(questionText) {
    return EmotionalWellnessLocators.depressedQuestionByText(this.page, questionText);
  }

  getdepressedOption(option) {
    return EmotionalWellnessLocators.depressedNumberOption(this.page, option.number);
  }

  async selectdepressedOption(option) {
    await this.getdepressedOption(option).click();
  }

  getQuestionContinueButton() {
    return EmotionalWellnessLocators.questionContinueButton(this.page);
  }

  async clickQuestionContinueButton() {
    await this.getQuestionContinueButton().click();
  }
}