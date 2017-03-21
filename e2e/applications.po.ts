import { browser, element, by } from 'protractor';

import { click, wait, Selector, byName } from './';

export class Applications {
    navigateTo() {
        return browser.get('/applications');
    }

    /**
     * create a valid created application
     *
     * @memberOf Applications
     */
    createFilledApplication() {
        this.navigateTo();
        // owned tab
        click(by.css('#tab-owned'));
        browser.sleep(250);

        this.createApplication();
        this.fillApplication();
    }

    /**
     * create a submitted application
     *
     * @memberOf Applications
     */
    createSubmittedApplication() {
        this.createFilledApplication();
        this.submitApplication();
    }

    /**
     * create a pending application
     *
     * @memberOf Applications
     */
    createPendingApplication() {
        this.createSubmittedApplication();
        this.assignApplicationToConference();
    }

    /**
     * create an accepted application
     *
     * @memberOf Applications
     */
    createAcceptedApplication() {
        this.createPendingApplication();
        this.acceptApplication();
    }

    /**
     * create a denied application
     *
     * @memberOf Applications
     */
    createDeniedApplication() {
        this.createPendingApplication();
        this.denyApplication();
    }

    /**
     * Actions
     */

    /**
     * /applications create new application of last form
     *
     * @memberOf Applications
     */
    createApplication() {
        click(Selector.Add);

        click(by.css('#e2e-Form'));

        wait(by.css('#application-edit'));
    }

    /**
     * /applications/:id/edit fill application name
     *
     * @memberOf Applications
     */
    fillApplication() {
        element(by.css('#name')).sendKeys('some value');

        click(Selector.Save);

        wait(by.css('#application-detail'));
    }

    /**
     * /applications/:id submit application
     *
     * @memberOf Applications
     */
    submitApplication() {
        click(by.css('.animation--trigger > .element'));

        // submit application
        click(Selector.Submit);

        // confirm submit
        click(by.css('[icon="keyboard_arrow_right"]'));
    }

    /**
     * /applications/:id assign application to last conference
     *
     * @memberOf Applications
     */
    assignApplicationToConference() {
        const selector = by.css('.overlay__option:last-child');

        // assign to conference
        click(Selector.Conference);

        click(selector);
    }

    /**
     * /applications/:id accept application
     *
     * @memberOf Applications
     */
    acceptApplication() {

        // accept application
        click(by.css('[icon="thumbs_up_down"]'));

        //  confirm application
        click(Selector.Accept);
    }

    /**
     * /applications/:id deny application
     *
     * @memberOf Applications
     */
    denyApplication() {

        // accept application
        click(by.css('[icon="thumbs_up_down"]'));

        wait(by.css('#accept_message')).sendKeys('Nope!');

        //  confirm application
        click(Selector.Deny);
    }
}
