import { faker } from '@faker-js/faker';


export class ArticleBuilder {
	addTitle() {
		this.articleTitle = faker.lorem.sentence();
		return this;
	}
	addDescription() {
		this.articleDescription = faker.lorem.sentences(1);
		return this;
	}
	addContent() {
		this.articleContent = faker.lorem.paragraphs(2);
		return this;
	}
    addTags() {
		this.articleTags = faker.lorem.slug(3);
		return this;
	}
	generateArticleData() {
		return {
            title: this.articleTitle,
            description: this.articleDescription,
            content: this.articleContent,
            tags: this.articleTags,
		};
	}
}
