export const ProfileLocators = {
    dottedMenuClick: (page) =>
    page.getByRole('button', { name: /menu/i }),
    ProfileMenu:(page) => page.getByText('Profile', { exact: true })
    
}