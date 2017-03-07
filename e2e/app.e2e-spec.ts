import { Page } from './app.po';
import { Applications } from './applications.po';
import { Forms } from './forms.po';
import { Login } from './login.po';

import { browser, element, by } from 'protractor';

describe('App', function () {
    let page: Page;
    let LoginPage: Login;
    let ApplicationsPage: Applications;
    let FormsPage: Forms;

    beforeEach(() => {
        page = new Page();
        LoginPage = new Login();
        ApplicationsPage = new Applications();
        FormsPage = new Forms();
    });

    it('should redirect to login form', () => {
        page.navigateTo();

        const email = element(by.css('#email'));
        expect(email).toBeTruthy();

        const password = element(by.css('#password'));
        expect(password).toBeTruthy();
    });

    describe('use case', () => {

        const _formName: number = Date.now();

        beforeEach(() => {
            LoginPage.navigateTo();
            LoginPage.setCredentials();
        });

        fit('do all', () => {
            /** login */
            const submit = element(by.css('#login button'));
            submit.click();

            browser.wait(function() {
                return browser.isElementPresent(by.css('#wrapper'));
            }, 5000);

            /** go to form tab */
            const formTab = element(by.css('#nav-forms'));
            formTab.click();

            browser.wait(() => {
                return browser.isElementPresent(by.css('#forms'));
            }, 5000);

            /** click new form button */
            const newForm = element(by.buttonText('add'));
            newForm.click();

            browser.wait(() => {
                return browser.isElementPresent(by.css('pk-overlay-content'));
            }, 5000);

            /** fill new form field */
            const formName = element(by.css('#title'));
            formName.sendKeys(_formName);

            const restricted = element(by.css('[for="restrictedAccess"]'));
            if (_formName % 2) {
                restricted.click();
            }
            const validation = element(by.css('[for="requiresValidation"]'));
            if (_formName % 3) {
                validation.click();
            }

            const create = element(by.css('[value="Create"]'));
            create.click();

            browser.wait(() => {
                return browser.isElementPresent(by.css('#form-edit'));
            }, 5000);

            /** open add new element */
            const optionsButton = element(by.css('.animation--trigger > .element'));
            optionsButton.click();

            browser.sleep(500);

            const newElement = element(by.buttonText('add'));
            newElement.click();

            browser.wait(() => {
                return browser.isElementPresent(by.css('#form-add-attribute'));
            }, 5000);

            /** select field type */
            const fieldType = element(by.css('#element-fieldType .element__option'));
            fieldType.click();

            browser.wait(() => {
                return browser.isElementPresent(by.css('pk-overlay-content'));
            }, 5000);

            const input = element(by.css('#option-5c3914e9-a1ea-4c21-914a-39c2b5faa90c'));
            input.click();

            browser.wait(() => {
                return browser.isElementPresent(by.css('#name'));
            }, 5000);

            /** fill element */
            const fieldName = element(by.css('#name'));
            fieldName.sendKeys('name');

            const fieldRequired = element(by.css('#element-required .element__label'));

        });

    });
});
