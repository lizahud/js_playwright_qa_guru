import { test, expect } from '@playwright/test';
import {MainPage, HomePage, LoginPage, ArticlePage, RegisterPage, SettingsPage, EditorArticlePage} from '../page_object/pages/index';
import { UserBuilder, ArticleBuilder, CommentBuilder } from '../page_object/helpers/builder/index';


const URL_UI = 'https://realworld.qa.guru/';
const USER_DATA = new UserBuilder()
.addUsername()
.addEmail()
.addPassword()
.generateUserData();


test.describe('Тесты в рамках ДЗ №1 по Page Object', () => {
	test.beforeEach(async ({ page }) => {
		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);
		const homePage = new HomePage(page);

		await mainPage.open(URL_UI);
		await mainPage.gotoRegister();
		await registerPage.register(
			USER_DATA.username,
			USER_DATA.email,
			USER_DATA.password,
		);

		await expect(homePage.profileName).toBeVisible();
		await expect(homePage.profileName).toContainText(USER_DATA.username);
	});

	test('Пользователь может опубликовать статью', async ({ page }) => {
		const homePage = new HomePage(page);
		const editorArticlePage = new EditorArticlePage(page);

		const articleData = new ArticleBuilder()
		.addTitle()
		.addDescription()
		.addContent()
		.addTags()
		.generateArticleData();

		await homePage.openNewArticlePage();
		await editorArticlePage.createArticle(articleData.title, articleData.description, articleData.content, articleData.tags);

		await expect(page.getByRole('heading')).toContainText(articleData.title);
		await expect(page.getByRole('paragraph')).toContainText(articleData.content);
		await expect(page.getByRole('main')).toContainText(articleData.tags);
	});

	test('Пользователь может оставить комментарий к статье', async ({ page }) => {
		const homePage = new HomePage(page);
		const articlePage = new ArticlePage(page);

		const commentData = new CommentBuilder()
		.addContent()
		.generateCommentData();

		await homePage.switchToGlobalFeedTab();
		await homePage.openFirstArticlePage();
		await articlePage.createNewComment(commentData.content);

		await expect(page.getByRole('main')).toContainText(commentData.content);
	});

	test('Пользователь может изменить пароль', async ({ page }) => {
		const mainPage = new MainPage(page);
		const homePage = new HomePage(page);
		const settingsPage = new SettingsPage(page);
		const loginPage = new LoginPage(page);
	
		const newPassword = new UserBuilder()
		.addPassword()
		.generateUserPassword();

		await homePage.goToSettings();
		await settingsPage.updatePassword(newPassword.password);
		await homePage.logout();
		await mainPage.gotoLogin();
		await loginPage.login(USER_DATA.email, newPassword.password);

		await expect(homePage.profileName).toBeVisible();
		await expect(homePage.profileName).toContainText(USER_DATA.username);
	});
});
