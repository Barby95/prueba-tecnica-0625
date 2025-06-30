import { Locator, Page } from "playwright"

export class DeletePage{
    page : Page
    constructor(Page : Page){
        this.page = Page
    }

    async DeleteUser(username: string){
        const deleteButton = this.page.locator('li:has-text("'+username+'") >> text=Delete')
        await deleteButton.click()       
        
    }
    getUsernameField(username: string) : Locator{
        return this.page.locator('li:has-text("'+username+'")')
    }
}