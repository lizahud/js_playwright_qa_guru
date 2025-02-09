import { faker } from '@faker-js/faker';


export class CommentBuilder {
	addContent() {
		this.commentContent = faker.lorem.paragraph(2);
		return this;
	}
	generateCommentData() {
		return {
            content: this.commentContent,
		};
	}
}
