export class LoginPage {
	constructor(page) {
		this.page = page;
		this.loginButton = page.getByRole('button', { name: 'Login' });
		this.loginEmailInputField = page.getByRole('textbox', { name: 'Email' });
		this.loginPasswordInputField = page.getByRole('textbox', { name: 'Password' });
	}
	async login(email, password) {
		await this.loginEmailInputField.click();
		await this.loginEmailInputField.fill(email);
		await this.loginPasswordInputField.click();
		await this.loginPasswordInputField.fill(password);
		await this.loginButton.click();
	}
}
