import { test,expect } from "playwright/test";
import { RegisterPage } from "../pages/register-page";
import { LoginPage } from "../pages/login-page";

test('n2 - Inicio de sesión exitoso con credenciales válidas', async ({ page }, testInfo) => {
    //Primero el registro del usuario
    const registerPage = new RegisterPage(page)
    await registerPage.navigate()
    await registerPage.setUserData('barbi', 'urbano', 'b.urbano', 'Hola654321')
    await registerPage.submitRegister()
    const registerMessage = page.locator('text="Registration successful"')
    await expect(registerMessage).toBeVisible()

    //Ahora realizamos el login
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await page.waitForTimeout(200)
    const step1 = await page.screenshot();
    await loginPage.setLoginData('b.urbano', 'Hola654321')
    const step2 = await page.screenshot();
    await loginPage.submitLogin()
    await page.waitForURL('https://globalsqa.com/angularJs-protractor/registration-login-example/#/')
    const message = page.locator('text="Hi barbi!"')
    await expect(message).toBeVisible()
    const step3 = await page.screenshot();      
   

    testInfo.attach('Step 1 - page loaded', {
        body: step1,
        contentType: 'image/png'
    })
    testInfo.attach('Step 2 - data set', {
        body: step2,
        contentType: 'image/png'
    })
    testInfo.attach('Step 3 - result', {
        body: step3,
        contentType: 'image/png'
    })    

})