export class RegisterPage {
	constructor(page) {
		this.page = page;
		this.signupButton = page.getByRole('button', { name: 'Sign up' });
		this.emailInputField = page.getByPlaceholder('Email');
		this.passwordInputField = page.getByPlaceholder('Password');
		this.usernameInputField = page.getByPlaceholder('Your Name');
	}
	async register(username, email, password) {
		await this.usernameInputField.click();
		await this.usernameInputField.fill(username);
		await this.emailInputField.click();
		await this.emailInputField.fill(email);
		await this.passwordInputField.click();
		await this.passwordInputField.fill(password);
		await this.signupButton.click();
	}
}
