import { browser, element, by } from 'protractor';
import * as _ from 'lodash';

import { Selector } from './';

export class Application {

}

export const Button: any = {
    Rescind: (isVisible: boolean) => {
        it('rescind', () => {
            expect(browser.isElementPresent(Selector.Rescind)).toBe(isVisible);
        });
    },
    Conference: (isVisible: boolean) => {
        it('conference', () => {
            expect(browser.isElementPresent(Selector.Conference)).toBe(isVisible);
        });
    },
    Assign: (isVisible: boolean) => {
        it('assign', () => {
            expect(browser.isElementPresent(Selector.Assign)).toBe(isVisible);
        });
    },
    Deactivate: (isVisible: boolean) => {
        it('deactivate', () => {
            expect(browser.isElementPresent(Selector.Delete)).toBe(isVisible);
        });
    },
    Edit: (isVisible: boolean) => {
        it('edit', () => {
            expect(browser.isElementPresent(Selector.Edit)).toBe(isVisible);
        });
    },
    Submit: (isVisible: boolean) => {
        it('submit', () => {
            expect(browser.isElementPresent(Selector.Submit)).toBe(isVisible);
        });
    },
    Comment: (isVisible: boolean) => {
        it('comment', () => {
            expect(browser.isElementPresent(Selector.Comment)).toBe(isVisible);
        });
    },
    Accept: (isVisible: boolean) => {
        it('accept', () => {
            expect(browser.isElementPresent(by.css('[icon="thumbs_up_down"]'))).toBe(isVisible);
        });
    },
};

export function shouldSee(...args: Function[]) {
    const shouldNot: Function[] = [];

    for (const key in Button) {
        if (key) {
            const fn = Button[key];
            const index = _.findIndex(args, obj => obj === fn);
            if (index === -1) {
                shouldNot.push(fn);
            }
        }
    }

    describe('should see', () => {
        const isVisible = true;
        for (const fn of args) {
            fn(isVisible);
        }
    });

    describe('should not see', () => {
        const isVisible = false;
        for (const fn of shouldNot) {
            fn(isVisible);
        }
    });
}
