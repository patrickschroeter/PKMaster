import { browser, element, by } from 'protractor';

export class Applications {
    navigateTo() {
        return browser.get('/applications');
    }
}
