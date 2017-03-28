import { browser, element, by } from 'protractor';

import { time, click } from './';

export class Page {
    navigateTo() {
        return browser.get('/');
    }

    goTo(route: string) {
        return browser.get(route);
    }

    goToTab(name: string): void {
        const tab = element(by.css('#nav-' + name));
        tab.click();

        browser.wait(() => {
            return browser.isElementPresent(by.css('#' + name));
        }, time);
    }

    logout() {
        const button = element(by.css('#nav-logout'));
        button.click();

        browser.sleep(250);
    }

    openOptions() {
        click(by.css('.animation--trigger > .element'));
    }
}

