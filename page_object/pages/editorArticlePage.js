export class EditorArticlePage {
	constructor(page) {
		this.page = page;
		this.titleArticleInputField = page.getByRole('textbox', { name: 'Article Title' });
		this.descriptionArticleInputField = page.getByRole('textbox', { name: 'What\'s this article about?' });
		this.contentArticleTextareaField = page.getByRole('textbox', { name: 'Write your article (in' });
		this.tagsArticleInputField = page.getByRole('textbox', { name: 'Enter tags' });
		this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
	}
	async createArticle(title, description, content, tags) {
		await this.titleArticleInputField.click();
		await this.titleArticleInputField.fill(title);
		await this.descriptionArticleInputField.click();
		await this.descriptionArticleInputField.fill(description);
		await this.contentArticleTextareaField.click();
		await this.contentArticleTextareaField.fill(content);
		await this.tagsArticleInputField.click();
		await this.tagsArticleInputField.fill(tags);
		await this.publishArticleButton.click();
	}
}
