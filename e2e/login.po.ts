import { browser, element, by } from 'protractor';
import { time } from './';

export class Login {
    navigateTo() {
        return browser.get('/login');
    }

    setCredentials(name = 'patrick.schroeter@hotmail.de', value = 'einPasswort') {
        const password = element(by.css('#password'));
        password.sendKeys(value);
        const email = element(by.css('#email'));
        email.sendKeys(name);

        browser.sleep(250);
    }

    login(name?: string, password?: string) {
        this.navigateTo();
        this.setCredentials(name, password);

        const submit = element(by.css('#login'));
        submit.click();

        browser.wait(function() {
            return browser.isElementPresent(by.css('#wrapper'));
        }, 5000);
    }
}
