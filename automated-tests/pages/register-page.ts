import { Page } from "playwright";

export class RegisterPage {
   page : Page
   constructor(Page : Page)
   {
    this.page = Page
   }

   async navigate(){
        await this.page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
   }

   async setUserData(firstname: string, lastname: string, username: string, password: string){

        const firstnameField = this.page.locator('input[name="firstName"]')
        const lastNameField = this.page.locator('input[name="lastName"]')
        const usernameField = this.page.locator('input[name="username"]')
        const passwordField = this.page.locator('input[name="password"]')

        await firstnameField.fill(firstname);
        await lastNameField.fill(lastname);
        await usernameField.fill(username);
        await passwordField.fill(password);       

   }
   async submitRegister(){
        const submitButton = this.page.locator('button[type="submit"]')
        submitButton.click()
   }
}