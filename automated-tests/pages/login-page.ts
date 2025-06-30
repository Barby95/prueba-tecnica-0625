import { Page } from "playwright";

export class LoginPage {
    page : Page
    constructor(Page : Page)
    {
        this.page = Page
    }

    async navigate(){
        await this.page.goto("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
    }

    async setLoginData(username : string, password : string){
        const UsernameField = this.page.locator('input[name="username"]')
        const PasswordField = this.page.locator('input[name="password"]')

        await UsernameField.fill(username);
        await PasswordField.fill(password);
    }
    async submitLogin(){
        const submitButton = this.page.locator('button[type=submit]')
        submitButton.click()
    }
}