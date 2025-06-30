import { test,expect } from "playwright/test";
import { RegisterPage } from "../pages/register-page";
import { LoginPage } from "../pages/login-page";
import { DeletePage } from "../pages/delete-page";

test('n10 - Borrado de usuario con credenciales validas', async ({ page }, testInfo) => {
    //Primero el registro del usuario
    const registerPage = new RegisterPage(page)
    await registerPage.navigate()
    await registerPage.setUserData('barbi', 'urbano', 'b.urbano', 'Hola654321')
    await registerPage.submitRegister()
    const registerMessage = page.locator('text="Registration successful"')
    await expect(registerMessage).toBeVisible()
    
    //Luego realizamos el login
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await page.waitForTimeout(200)
    await loginPage.setLoginData('b.urbano', 'Hola654321')
    await loginPage.submitLogin()
    await page.waitForURL('https://globalsqa.com/angularJs-protractor/registration-login-example/#/')
    const message = page.locator('text="Hi barbi!"')
    await expect(message).toBeVisible()

    //Ahora realizamos el borrado del usuario
    const deletePage = new DeletePage(page)
    const step1 = await page.screenshot()
    const userField = deletePage.getUsernameField('b.urbano')
    await expect(userField).toHaveCount(1) 
    await deletePage.DeleteUser('b.urbano')
    await expect(userField).toHaveCount(0)
    const step2 = await page.screenshot();

    testInfo.attach('Step 1 - page loaded', {
        body: step1,
        contentType: 'image/png'
    })
    testInfo.attach('Step 2 - delete-result', {
        body: step2,
        contentType: 'image/png'
    })
        
})