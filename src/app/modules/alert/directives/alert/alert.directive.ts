/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Directive, Input, HostListener } from '@angular/core';

import { AlertService } from './../../services';

/**
 * AlertDirective
 *
 * @export
 * @class AlertDirective
 */
@Directive({
    selector: '[pkAlert]'
})
export class AlertDirective {

    @Input() pkAlert: string;

    private delay = 700;
    private timeout: any;

    /**
     * Creates an instance of AlertDirective.
     * @param {AlertService} alert
     *
     * @memberOf AlertDirective
     */
    constructor(private alert: AlertService) { }

    @HostListener('mouseenter') showHint() {
        this.timeout = setTimeout(() => {
            this.alert.setTooltip(this.pkAlert, 3000);
        }, this.delay);
    }

    @HostListener('mouseleave') hideHint() {
        clearTimeout(this.timeout);
        this.alert.removeHint('tooltip');
    }

}
