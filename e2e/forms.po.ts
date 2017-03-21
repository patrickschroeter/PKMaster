import { browser, element, by } from 'protractor';
import { time, click, Selector } from './';

export class Forms {
    navigateTo() {
        return browser.get('/forms');
    }

    openNewFormModal(): void {
        click(Selector.Add);

        browser.wait(() => {
            return browser.isElementPresent(by.css('pk-overlay-content'));
        }, time);
    }

    createNewForm(name: string, isRestricted: boolean, requiresValidation: Boolean): void {
        const formName = element(by.css('#title'));
        formName.sendKeys(name);

        if (isRestricted) {
            const restricted = element(by.css('[for="restrictedAccess"]'));
            restricted.click();
        }

        if (requiresValidation) {
            const validation = element(by.css('[for="requiresValidation"]'));
            validation.click();
        }

        const create = element(by.css('[value="Create"]'));
        create.click();

        browser.wait(() => {
            return browser.isElementPresent(by.css('#form-edit'));
        }, time);
    }
}
