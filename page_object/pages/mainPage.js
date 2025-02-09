export class MainPage {
	constructor(page) {
		this.page = page;
		this.signupLinkButton = page.getByRole('link', { name: 'Sign up' });
		this.loginLinkButton = page.getByRole('link', { name: 'Login' });
	}
	async gotoRegister() {
		await this.signupLinkButton.click();
	}
	async gotoLogin() {
		await this.loginLinkButton.click();
	}
	async open(url) {
		await this.page.goto(url);
	}
}
