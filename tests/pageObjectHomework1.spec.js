import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../page_object/pages/mainPage';
import { RegisterPage } from '../page_object/pages/registerPage';
import { HomePage } from '../page_object/pages/homePage';
import { EditorArticlePage } from '../page_object/pages/editorArticlePage';
import { ArticlePage } from '../page_object/pages/articlePage';
import { SettingsPage } from '../page_object/pages/settingsPage';
import { LoginPage } from '../page_object/pages/loginPage';


const URL_UI = 'https://realworld.qa.guru/';
const USER = {
	email: faker.internet.email(),
	password: faker.internet.password({ length: 10 }),
	username: faker.person.firstName(),
};


test.describe('Тесты в рамках ДЗ №1 по Page Object', () => {
	test.beforeEach(async ({ page }) => {
		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);
		const homePage = new HomePage(page);

		await mainPage.open(URL_UI);
		await mainPage.gotoRegister();
		await registerPage.register(USER.username, USER.email, USER.password);

		await expect(homePage.profileName).toBeVisible();
		await expect(homePage.profileName).toContainText(USER.username);
	});

	test('Пользователь может опубликовать статью', async ({ page }) => {
		const homePage = new HomePage(page);
		const editorArticlePage = new EditorArticlePage(page);

		const article = {
			title: faker.lorem.sentence(),
			description: faker.lorem.sentences(1),
			content: faker.lorem.paragraphs(2),
			tags: faker.lorem.slug(3),
		};

		await homePage.openNewArticlePage();
		await editorArticlePage.createArticle(article.title, article.description, article.content, article.tags);

		await expect(page.getByRole('heading')).toContainText(article.title);
		await expect(page.getByRole('paragraph')).toContainText(article.content);
		await expect(page.getByRole('main')).toContainText(article.tags);
	});

	test('Пользователь может оставить комментарий к статье', async ({ page }) => {
		const homePage = new HomePage(page);
		const articlePage = new ArticlePage(page);

		const comment = {
			content: faker.lorem.paragraph(2),
		};

		await homePage.switchToGlobalFeedTab();
		await homePage.openFirstArticlePage();
		await articlePage.createNewComment(comment.content);

		await expect(page.getByRole('main')).toContainText(comment.content);
	});

	test('Пользователь может изменить пароль', async ({ page }) => {
		const mainPage = new MainPage(page);
		const homePage = new HomePage(page);
		const settingsPage = new SettingsPage(page);
		const loginPage = new LoginPage(page);

		const newPassword = {
			password: faker.internet.password({ length: 10 })
		};

		await homePage.goToSettings();
		await settingsPage.updatePassword(newPassword.password);
		await homePage.logout();
		await mainPage.gotoLogin();
		await loginPage.login(USER.email, newPassword.password);

		await expect(homePage.profileName).toBeVisible();
		await expect(homePage.profileName).toContainText(USER.username);
	});
});
