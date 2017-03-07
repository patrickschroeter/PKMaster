import { browser, element, by } from 'protractor';

export class Login {
    navigateTo() {
        return browser.get('/login');
    }

    setCredentials() {
        const password = element(by.css('#password'));
        password.sendKeys('password');
        const email = element(by.css('#email'));
        email.sendKeys('stephan.reichinger@hs-augsburg.de');
    }
}
