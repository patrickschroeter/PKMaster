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

import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

/** Services */
import { TranslationService } from './../../../translation';

/** Components */
import {
    ModalOutletComponent,

    ModalErrorComponent,
    ModalSelectlistComponent,
    ModalConfirmationComponent
} from './../../';

/** Models */
import { Selectable } from 'app/models';

/**
 * ModalService
 *
 * @export
 * @class ModalService
 */
@Injectable()
export class ModalService {

    private outlet: ModalOutletComponent;

    /**
     * Creates an instance of ModalService.
     * @param {Router} router
     * @param {TranslationService} translationService
     *
     * @memberOf ModalService
     */
    constructor(
        private router: Router,
        private translationService: TranslationService
    ) { }

    /**
     * Register a ModalOutletComponent to the Service.
     * It's not able to register more than one Component.
     *
     * @param {ModalOutletComponent} component
     * @returns {void}
     *
     * @memberOf ModalService
     */
    public register(component: ModalOutletComponent): void {
        if (this.outlet) {
            return console.error('ModalOutletComponent already registered in ModalService.');
        }
        this.outlet = component;
    }

    /**
     * Removes the open modal inside the registered ModalOutletComponent
     *
     *
     * @memberOf ModalService
     */
    public destroyModal(): void {
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.destroy();
    }

    /**
     * Create an error Modal with injected parameters
     *
     * @param {{
     *         title: string,
     *         message: string
     *     }} data
     *
     * @memberOf ModalService
     */
    public createErrorModal(data: {
        title: string,
        message: string
    }): void {
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalErrorComponent);
    }

    /**
     * Create an list modal with injected parameters
     *
     * @param {Object} data - the data object for injection
     * @param {String} data.title - displayed title of the modal
     * @param {Array<Selectable>} data.list - list of elements to display
     * @param {Function} data.click - function to be executed on List-Element click
     *
     * @param {Boolean} data.[isFluid] - overlay styling attribute
     * @param {String} data.[emptyText] - text to be displayed if no element is in the list
     * @param {Boolean} data.[redirect] - flag to indicate if there is a redirect button if the list is empty
     * @param {String} data.[redirectText] - text on the redirect button
     * @param {Array<String>} data.[redirectParam] - params for the @angular/router
     * @param {Function} data.[redirectFn] - custom function to execute the redirect
     * @param {String} data.[selectedValue] - single value to highlight in the list
     * @param {Array<String>} data.[selectedValues] - array of values to highlight in the list
     *
     * @memberOf ModalService
     */
    public createListModal(data: {
        title: string,
        list: Selectable[],
        click: Function,
        isFluid?: boolean,
        emptyText?: string,
        redirect?: boolean,
        redirectText?: string,
        redirectParam?: string[],
        redirectFn?: Function,

        selectedValue?: string,
        selectedValues?: string[]
    }): void {
        data.isFluid = data.isFluid || false;
        data.emptyText = data.emptyText || '';
        data.redirect = data.redirect || false;
        data.redirectText = data.redirectText || '';
        data.redirectParam = data.redirectParam || [''];
        data.redirectFn = () => {
            this.router.navigate(data.redirectParam);
            this.destroyModal();
        };
        data.selectedValue = data.selectedValue || '';
        data.selectedValues = data.selectedValues || [];

        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalSelectlistComponent);
    }

    /**
     * Create an confirmation Modal with injected parameters
     *
     * @param {Object} data - the data object for injection
     * @param {String} data.title - the displayed title of the modal
     * @param {String} data.message - the message to display in the modal content
     * @param {Function} data.confirm - the callback function for the confirm button
     * @param {Function} data.[cancel] - the callback function for the cancel button
     *
     * @memberOf ModalService
     */
    public createConfirmationModal(data: {
        title: string,
        message: string,
        confirm: Function,
        confirmText?: string,
        cancel?: Function,
        cancelText?: string
    }): void {
        data.cancel = data.cancel || this.destroyModal.bind(this);
        data.confirmText = data.confirmText || this.translationService.translate('confirm');
        data.cancelText = data.cancelText || this.translationService.translate('cancel');

        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalConfirmationComponent);
    }

    /**
     * update the selected values
     *
     * @param {string[]} values
     *
     * @memberOf ModalService
     */
    public updateSelectedValues(values: string[]): void {
        this.outlet.updateSelectedValues(values);
    }

}
