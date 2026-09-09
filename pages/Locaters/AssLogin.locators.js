export const AssLoginLocators = {
    logoImage: (page) => page.getByRole('img', { name: /Ivory/i }),
    loginText: (page) => page.getByText('Sign in to access your assessments'),
    loginPhoneClick: (page) =>  page.getByRole('tab', { name: "Phone" }),
    loginEmailClick: (page) =>  page.getByRole('tab', { name: /Email/i }),
    loginCountryCodeClick: (page) => page.getByText('Phone Number').locator('..').getByRole('textbox').first(),
    loginCountryCodeDropdown: (page) => page.getByText('+91', { exact: true }),
    LoginPhoneInput: (page) => page.getByRole('textbox', { name: 'Enter 10-digit number' }),
    loginSendOtpButton: (page) => page.getByRole('button', { name: 'Send OTP' }),
    loginEmptyPhoneError: (page) =>page.getByText('Phone number is required', { exact: true }),
    loginInvalidPhoneError: (page) => page.getByText('Enter a valid phone number', { exact: true }),
    loginPinInputs: (page) => page.getByRole('textbox', { name: 'PinInput' }),
    
}


