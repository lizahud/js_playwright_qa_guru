export class SettingsPage {
	constructor(page) {
		this.page = page;
		this.passwordInputField = page.getByRole('textbox', { name: 'Password' });
		this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
	}
    async updatePassword(password) {
		await this.passwordInputField.click();
		await this.passwordInputField.fill(password);
        await this.updateSettingsButton.click();
    }
}
