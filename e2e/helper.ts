import { browser, element, ElementFinder, by, By } from 'protractor';

export const time = 2000;

/**
 * Check if the element with the selector exist and click it
 *
 * @export
 * @isVisible {*} selector
 */
export function click(selector: any): void {
    wait(selector);
    const button = element(selector);
    button.click();
}

/**
 * wait for the element with the selector
 *
 * @export
 * @isVisible {*} selector
 */
export function wait(selector: any): ElementFinder {
    browser.wait(() => {
        return browser.isElementPresent(selector) && element(selector).isDisplayed();
    }, time);
    return element(selector);
}

export function byName(name: string): any {
    return by.xpath(`//*[contains(text(), '${name}')]`);
}


export const Selector = {
    Submit: by.css('[icon="send"]'),
    Delete: by.css('[icon="delete"]'),
    Edit: by.css('[icon="create"]'),
    Add: by.css('[icon="add"]'),
    Save: by.css('[icon="save"]'),
    Conference: by.css('[icon="forum"]'),
    Accept: by.css('[icon="done"]'),
    Deny: by.css('[value="Decline"]'),
    Comment: by.css('[icon="comment"]'),
    Assign: by.css('[icon="supervisor_account"]'),
    Rescind: by.css('[icon="undo"]'),
};
