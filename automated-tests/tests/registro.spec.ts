import  { test,expect } from "playwright/test";
import { RegisterPage } from "../pages/register-page";

test('n1 - Registro exitoso de un nuevo usuario con datos válidos', async ({ page }, testInfo) => {
      
    const registerPage = new RegisterPage(page)
    await registerPage.navigate()
    await page.waitForTimeout(200)
    const step1Screenshot = await page.screenshot();
    await registerPage.setUserData('barbi', 'urbano', 'b.urbano', 'Hola654321')
    const step2Screenshot = await page.screenshot();
    await registerPage.submitRegister()

    await page.waitForURL('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login', { waitUntil: 'domcontentloaded'})
    const message = page.locator('text="Registration successful"')
    await expect(message).toBeVisible()
    await page.waitForTimeout(200)
    const step3Screenshot = await page.screenshot();

    testInfo.attach('Step 1 - page loaded', {
        body: step1Screenshot,
        contentType: 'image/png'
    })
    testInfo.attach('Step 2 - Data set', {
        body: step2Screenshot,
        contentType: 'image/png'
    })
    testInfo.attach('Step 3 - Result', {
        body: step3Screenshot,
        contentType: 'image/png'
    })
    
})