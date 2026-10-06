import { expect } from '@playwright/test';
import { CANINSIGHTLocators } from '../Locaters/CANINSIGHT.locators';

export class CANINSIGHTPage {
  constructor(page) {
    this.page = page;

    // Dashboard / Assessment
    this.dashboardText = CANINSIGHTLocators.dashboardText(page);
    this.assTitle = CANINSIGHTLocators.assTitle(page);
    this.assCardClick = CANINSIGHTLocators.assCardClick(page);
    this.startOrResumeButton = CANINSIGHTLocators.startOrResumeButton(page);
    this.continueButton = CANINSIGHTLocators.continueButton(page);
    // Video banner (NEW - locator already existed, now wired in)
    this.youtubePlay = CANINSIGHTLocators.youtubePlay(page);
    
    // Profile
    this.profileTitle = CANINSIGHTLocators.profileTitle(page);
    this.profileDescription = CANINSIGHTLocators.profileDescription(page);
    this.fullName = CANINSIGHTLocators.fullName(page);
    this.dateofBirth = CANINSIGHTLocators.dateofBirth(page);
    this.genderDetail = CANINSIGHTLocators.genderDetail(page);
    this.levelEducation = CANINSIGHTLocators.levelEducation(page);
    this.preferedLan = CANINSIGHTLocators.preferedLan(page);

    // Results
    this.completeWithMixedScores = CANINSIGHTLocators.completeWithMixedScores(page);
    this.downloadButton = CANINSIGHTLocators.downloadButton(page);
  }

  getAssessmentTitleByStatus(title, status) {
    return CANINSIGHTLocators.assessmentTitleByStatus(this.page, title, status);
  }

  getAssessmentStatusByTitle(title, status) {
    return CANINSIGHTLocators.assessmentStatusByTitle(this.page, title, status);
  }

  async clickAssessmentCardByStatus(title, status) {
    await CANINSIGHTLocators
      .assessmentCardClickByStatus(this.page, title, status)
      .click();
  }
  // =====================================================
    // NEW - Video modal ("Watch Before You Start")
    // =====================================================
  
    async clickYoutubePlay() {
      await this.youtubePlay.click();
    }
  
    getVideoDialog(modalTitle) {
      return CANINSIGHTLocators.videoDialog(this.page, modalTitle);
    }
  
    getVideoModalTitle(modalTitle) {
      return CANINSIGHTLocators.videoModalTitle(this.page, modalTitle);
    }
  
    getVideoFrame(modalTitle) {
      return CANINSIGHTLocators.videoFrame(this.page, modalTitle);
    }
  
    getVideoCloseIcon(modalTitle) {
      return CANINSIGHTLocators.videoCloseIcon(this.page, modalTitle);
    }
  
    async clickVideoCloseIcon(modalTitle) {
      await this.getVideoCloseIcon(modalTitle).click();
    }
  

  async clickStartOrResume() {
    await expect(this.startOrResumeButton).toBeVisible({ timeout: 30_000 });
    await this.startOrResumeButton.click();
  }

  async VerifyprofileTitle() {
    return this.profileTitle.isVisible();
  }

  async VerifyprofileDescription() {
    return this.profileDescription.isVisible();
  }

  async VerifyfullName() {
    return this.fullName.isVisible();
  }

  async VerifydateofBirth() {
    return this.dateofBirth.isVisible();
  }

  async VerifygenderDetail() {
    return this.genderDetail.isVisible();
  }

  async VerifylevelEducation() {
    return this.levelEducation.isVisible();
  }

  async VerifypreferedLan() {
    return this.preferedLan.isVisible();
  }

  async clickContinue() {
    await this.continueButton.waitFor({ state: 'visible', timeout: 30_000 });
    await this.continueButton.click();
  }

  async clickcompleteWithMixedScores() {
    await this.completeWithMixedScores.click();
  }

  async clickDownloadButton() {
    await this.downloadButton.click();
  }

  getAssessmentReportDownloadButton(reportTitle, buttonName) {
    return CANINSIGHTLocators.assessmentReportDownloadButton(
      this.page,
      reportTitle,
      buttonName
    );
  }

  async clickAssessmentReportDownload(reportTitle, buttonName) {
    await this.getAssessmentReportDownloadButton(reportTitle, buttonName).click();
  }

  /**
   * Clicks the report Download button and waits for whichever happens first:
   *  - a browser download          -> { kind: 'download', download }
   *  - the report opening in a tab -> { kind: 'popup', page }
   * Listeners are registered BEFORE the click so no event is missed.
   */
  async downloadAssessmentReport(reportTitle, buttonName, timeout = 60_000) {
    const button = this.getAssessmentReportDownloadButton(reportTitle, buttonName);
    await expect(button).toBeVisible({ timeout: 90_000 });
    await expect(button).toBeEnabled();

    const downloadPromise = this.page
      .waitForEvent('download', { timeout })
      .then((download) => ({ kind: 'download', download }));

    const popupPromise = this.page
      .context()
      .waitForEvent('page', { timeout })
      .then((popup) => ({ kind: 'popup', page: popup }));

    // Avoid unhandled rejections from whichever promise loses
    downloadPromise.catch(() => {});
    popupPromise.catch(() => {});

    await button.click();

    let result;
    try {
      result = await Promise.any([downloadPromise, popupPromise]);
    } catch {
      throw new Error(
        `Clicking "${buttonName}" for "${reportTitle}" triggered neither a download nor a new tab within ${timeout}ms. ` +
        'Open the trace Network tab: the report API may be failing, or the file may open in the same tab.'
      );
    }

    if (result.kind === 'popup') {
      await result.page.waitForLoadState('domcontentloaded');
    }

    return result;
  }
}