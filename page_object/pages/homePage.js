export class HomePage {
	constructor(page) {
		this.page = page;
		this.newArticleLinkButton = page.getByRole('link', { name : 'New Article' });
		this.profileName = page.locator('.nav-link.dropdown-toggle');
		this.userMenu = page.locator('.nav-item.dropdown');
		this.globalFeedTab = page.getByRole('button', { name: 'Global Feed' });
		this.firstArticleLinkButton = page.locator('.preview-link').first();
		this.settingsLinkButton = page.getByRole('link', { name: 'Settings' })
		this.logoutLinkButton = page.getByRole('link', { name: 'Logout' })
	}
	async openNewArticlePage() {
		await this.newArticleLinkButton.click();
	}
	async switchToGlobalFeedTab() {
		await this.globalFeedTab.click();
	}
	async openFirstArticlePage() {
		await this.firstArticleLinkButton.click();
	}
	async goToSettings() {
		await this.userMenu.click();
		await this.settingsLinkButton.click();
	}
	async logout() {
		await this.userMenu.click();
		await this.logoutLinkButton.click();
	}
}
