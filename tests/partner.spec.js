import { test, expect } from '@playwright/test';
import { PartnerLocators } from '../pages/Locaters/Partner.locators';
import partnerData from '../testdata/PartnerData.json';

test.describe('Partner', () => {
  // Runs before every test, so each test starts logged in.
  test.beforeEach(async ({ page }) => {
    const loginInput = PartnerLocators.logininput(page);
    const passwordInput = PartnerLocators.passwordinput(page);
    const signinButton = PartnerLocators.signinButton(page);

    await page.goto('https://test-partner.liveivory.com/login', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    await loginInput.fill(partnerData.validUser.email);
    await passwordInput.fill(partnerData.validUser.password);
    await signinButton.click();

    await expect(PartnerLocators.AssessmentButton(page)).toBeVisible();
  });

  test('Perceived Stress Scale (PSS-10)', async ({ page }) => {
    const AssessmentButton = PartnerLocators.AssessmentButton(page);
    const phoneInput = PartnerLocators.phoneInput(page);
    const username = PartnerLocators.username(page);
    const pnumber = PartnerLocators.pnumber(page);
    const combobox = PartnerLocators.combobox(page);
    const comboboxError = PartnerLocators.ComboboxError(
      page,
      partnerData.assessment.alreadyAssignedError
    );
    const assignButton = PartnerLocators.assignButton(page);
    const cancelButton = PartnerLocators.cancelButton(page);

    await AssessmentButton.click();
    await phoneInput.fill(partnerData.Phonenumber.number);

    await expect(username).toBeVisible();
    await expect(username).toHaveText(/\S+/);
    await expect(pnumber).toBeVisible();
    await expect(pnumber).toHaveText(/\S+/);

    await combobox.selectOption({
      label: partnerData.assessment.name,
    });

    // Wait until the assessment is either available or already assigned.
    await expect
      .poll(
        async () => {
          if (await comboboxError.isVisible()) return 'already-assigned';
          if (await assignButton.isEnabled()) return 'new-assignment';
          return 'pending';
        },
        { timeout: 10_000 }
      )
      .toMatch(/already-assigned|new-assignment/);

    if (await comboboxError.isVisible()) {
      await expect(comboboxError).toHaveText(
        partnerData.assessment.alreadyAssignedError
      );
      await expect(assignButton).toBeDisabled();
      await cancelButton.click();
    } else {
      await page.waitForTimeout(2000)
      await expect(assignButton).toBeEnabled();
      await assignButton.click();
      await page.waitForTimeout(2000)
    }
  });

  
  
  test('GAD-7 Anxiety Assessment', async ({ page }) => {
    const AssessmentButton = PartnerLocators.AssessmentButton(page);
    const phoneInput = PartnerLocators.phoneInput(page);
    const username = PartnerLocators.username(page);
    const pnumber = PartnerLocators.pnumber(page);
    const combobox = PartnerLocators.combobox(page);
    const comboboxError = PartnerLocators.ComboboxError(
      page,
      partnerData.assessment.alreadyAssignedError);
    const assignButton = PartnerLocators.assignButton(page);
    const cancelButton = PartnerLocators.cancelButton(page);


    await AssessmentButton.click();
    await phoneInput.fill(partnerData.Phonenumber.number);

    await expect(username).toBeVisible();
    await expect(username).toHaveText(/\S+/);
    await expect(pnumber).toBeVisible();
    await expect(pnumber).toHaveText(/\S+/);
    await combobox.selectOption({
      label: partnerData.assessment.name2,
    });
    
    await expect
      .poll(
        async () => {
          if (await comboboxError.isVisible()) return 'already-assigned';
          if (await assignButton.isEnabled()) return 'new-assignment';
          return 'pending';
        },
        { timeout: 10_000 }
      )
      .toMatch(/already-assigned|new-assignment/);

    if (await comboboxError.isVisible()) {
      await expect(comboboxError).toHaveText(
        partnerData.assessment.alreadyAssignedError
      );
      await expect(assignButton).toBeDisabled();
      await cancelButton.click();
    } else {
      await page.waitForTimeout(2000)
      await expect(assignButton).toBeEnabled();
      await assignButton.click();
      await page.waitForTimeout(2000)
    }
  });


  test('PHQ-9 Depression Assessment', async ({ page }) => {

    const AssessmentButton = PartnerLocators.AssessmentButton(page);
    const phoneInput = PartnerLocators.phoneInput(page);
    const username = PartnerLocators.username(page);
    const pnumber = PartnerLocators.pnumber(page);
    const combobox = PartnerLocators.combobox(page);
    const comboboxError = PartnerLocators.ComboboxError(
      page,
      partnerData.assessment.alreadyAssignedError);
    const assignButton = PartnerLocators.assignButton(page);
    const cancelButton = PartnerLocators.cancelButton(page);


    await AssessmentButton.click();
    await phoneInput.fill(partnerData.Phonenumber.number);

    await expect(username).toBeVisible();
    await expect(username).toHaveText(/\S+/);
    await expect(pnumber).toBeVisible();
    await expect(pnumber).toHaveText(/\S+/);
    await combobox.selectOption({
      label: partnerData.assessment.name1,
    });
    await page.waitForTimeout(2000);
    await expect
      .poll(
        async () => {
          if (await comboboxError.isVisible()) return 'already-assigned';
          if (await assignButton.isEnabled()) return 'new1-assignment';
          return 'pending';
        },
        { timeout: 10_000 }
      )
      .toMatch(/already-assigned|new1-assignment/);

    if (await comboboxError.isVisible()) {
      await expect(comboboxError).toHaveText(
        partnerData.assessment.alreadyAssignedError
      );
      await expect(assignButton).toBeDisabled();
      await cancelButton.click();
    } else {
      await page.waitForTimeout(2000)
      await expect(assignButton).toBeEnabled();
      await assignButton.click();
      await page.waitForTimeout(2000)
    }
  });



test('Instrumental Activities of Daily Living Scale (IADL)', async ({ page }) => {

    const AssessmentButton = PartnerLocators.AssessmentButton(page);
    const phoneInput = PartnerLocators.phoneInput(page);
    const combobox = PartnerLocators.combobox(page);
    const comboboxError = PartnerLocators.ComboboxError(
      page,
      partnerData.assessment.alreadyAssignedError);
    const assignButton = PartnerLocators.assignButton(page);
    const cancelButton = PartnerLocators.cancelButton(page);


    await AssessmentButton.click();
    await phoneInput.fill(partnerData.Phonenumber.number1);

    await combobox.selectOption({
      label: partnerData.assessment.name3,
    });
    await page.waitForTimeout(5000);
    await expect
      .poll(
        async () => {
          if (await comboboxError.isVisible()) return 'already-assigned';
          if (await assignButton.isEnabled()) return 'new-assignment';
          return 'pending';
        },
        { timeout: 10_000 }
      )
      .toMatch(/already-assigned|new-assignment/);

    if (await comboboxError.isVisible()) {
      await expect(comboboxError).toHaveText(
        partnerData.assessment.alreadyAssignedError
      );
      await expect(assignButton).toBeDisabled();
      await cancelButton.click();
    } else {
      await page.waitForTimeout(2000)
      await expect(assignButton).toBeEnabled();
      await assignButton.click();
      await page.waitForTimeout(2000)
    }
  });


  test('Insomnia Severity Index (ISI)', async ({ page }) => {
    const AssessmentButton = PartnerLocators.AssessmentButton(page);
    const phoneInput = PartnerLocators.phoneInput(page);
    const combobox = PartnerLocators.combobox(page);
    const comboboxError = PartnerLocators.ComboboxError(
      page,
      partnerData.assessment.alreadyAssignedError
    );
    const assignButton = PartnerLocators.assignButton(page);
    const cancelButton = PartnerLocators.cancelButton(page);

    await AssessmentButton.click();
    await phoneInput.fill(partnerData.Phonenumber.number);

  

    await combobox.selectOption({
      label: partnerData.assessment.name4,
    });

    // Wait until the assessment is either available or already assigned.
    await expect
      .poll(
        async () => {
          if (await comboboxError.isVisible()) return 'already-assigned';
          if (await assignButton.isEnabled()) return 'new-assignment';
          return 'pending';
        },
        { timeout: 10_000 }
      )
      .toMatch(/already-assigned|new-assignment/);

    if (await comboboxError.isVisible()) {
      await expect(comboboxError).toHaveText(
        partnerData.assessment.alreadyAssignedError
      );
      await expect(assignButton).toBeDisabled();
      await cancelButton.click();
    } else {
      await page.waitForTimeout(2000)
      await expect(assignButton).toBeEnabled();
      await assignButton.click();
      await page.waitForTimeout(2000)
    }

 


  });






    

});