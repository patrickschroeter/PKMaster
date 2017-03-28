import { browser, element, by, ElementFinder } from 'protractor';
import { time } from './';

export class Form {

    navigateTo(id: string) {
        return browser.get('/forms/' + id);
    }

    saveForm() {
        const save = element(by.buttonText('save'));
        save.click();

        browser.wait(() => {
            return browser.isElementPresent(by.css('#forms'));
        }, time);
    }

    openNewElement(): void {
        const optionsButton = element(by.css('.animation--trigger > .element'));
        optionsButton.click();

        browser.sleep(500);

        const newElement = element(by.buttonText('add'));
        newElement.click();

        browser.wait(() => {
            return browser.isElementPresent(by.css('#form-add-attribute'));
        }, time);
    }

    selectElementFieldType(name: string): void {
        const fieldType = element(by.css('#element-fieldType .element__option'));
        fieldType.click();

        browser.wait(() => {
            return browser.isElementPresent(by.css('pk-overlay-content'));
        }, time);

        const input = element(by.css('#option-5c3914e9-a1ea-4c21-914a-39c2b5faa90c'));
        input.click();

        browser.wait(() => {
            return browser.isElementPresent(by.css('#name'));
        }, time);
    }

    fillElement(): void {
        this.setFieldName('name');
        this.setFieldRequired(true);
        this.setFieldLabel('label');
        this.setFieldPlaceholder('placeholder');
    }

    saveElement() {
        const save = element(by.buttonText('save'));
        save.click();

        browser.wait(() => {
            return browser.isElementPresent(by.css('#form-edit'));
        }, time);
    }


    getFieldName(): ElementFinder { return element(by.css('#name')); }
    setFieldName(value: string) { this.getFieldName().sendKeys(value); }

    getFieldRequired(): ElementFinder { return element(by.css('#element-required .element__label')); }
    setFieldRequired(value: boolean) { if (value) {this.getFieldRequired().click(); }}

    getFieldLabel(): ElementFinder { return element(by.css('#label')); }
    setFieldLabel(value: string) { this.getFieldLabel().sendKeys(value); }

    getFieldPlaceholder(): ElementFinder { return element(by.css('#placeholder')); }
    setFieldPlaceholder(value: string) { this.getFieldPlaceholder().sendKeys(value); }


}
