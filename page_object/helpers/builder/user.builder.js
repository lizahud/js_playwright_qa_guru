import { faker } from '@faker-js/faker';


export class UserBuilder {
    addUsername() {
		this.userName = faker.person.firstName();
		return this;
	}
    addEmail() {
		this.userEmail = faker.internet.email();
		return this;
	}
	addPassword(symbol = 10) {
		this.userPassword = faker.internet.password({ length: symbol });
		return this;
	}
	generateUserData() {
		return {
            username: this.userName,
			email: this.userEmail,
			password: this.userPassword,
		};
	}
    generateUserPassword() {
		return {
			password: this.userPassword,
		};
	}
}
