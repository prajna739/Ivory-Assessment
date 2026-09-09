export const PartnerLocators = {
 logininput: (page) =>  page.getByRole('textbox', { name: "Email Address or Phone Number" }),
 passwordinput: (page) =>  page.getByLabel('Password'),
 signinButton: (page) =>   page.getByRole('button', { name: 'Sign in' }),
 AssessmentButton: (page) => page.getByRole('button', { name: 'Assign Assessment' }),
 phoneInput: (page) =>  page.getByRole('textbox', { name: 'Phone Number' }),
 username: (page) => page.locator('dd').nth(0),
 pnumber: (page) => page.locator('dd').nth(1),
 combobox: (page) => page.getByRole('combobox', { name: 'Assessment' }),
 comboboxOption: (page) => page.getByText('Perceived Stress Scale (PSS-10)', { exact: true }),
 //ComboboxError: (page) =>page.getByText('User already has this assessment assigned and is not completed.', { exact: true }),
 assignButton: (page) => page.getByText('Assign', { exact: true }),
 //assignButton: (page) =>page.getByRole('button', { name: 'Assign', exact: true }),
 ComboboxError: (page, errorMessage) =>page.getByText(errorMessage, { exact: true }),
 cancelButton: (page) => page.getByRole('button', { name: 'Cancel' })
 
}
