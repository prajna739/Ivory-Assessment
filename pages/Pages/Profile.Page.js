import { ProfileLocators } from '../Locaters/Profile.locators';
export class PHQPage {
	constructor(page) {
		this.page = page;
        this.dottedMenuClick = ProfileLocators.dottedMenuClick(page);
        this.ProfileMenu =ProfileLocators.ProfileMenu(page)
        
    }
    async clickdottedMenu() {
    await this.dottedMenuClick.click();
    }
    async clickprofileMenu() {
    await this.ProfileMenu.click();
    }

    }