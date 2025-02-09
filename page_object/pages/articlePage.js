export class ArticlePage {
	constructor(page) {
		this.page = page;
		this.commentTextArea = page.getByRole('textbox', { name: 'Write a comment...' });
		this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
	}
	async createNewComment(content) {
		await this.commentTextArea.click();
		await this.commentTextArea.fill(content);
		await this.postCommentButton.click();
	}
}
