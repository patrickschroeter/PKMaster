import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import {
    ModalOutletComponent,

    ModalErrorComponent,
    ModalSelectlistComponent,
    ModalConfirmationComponent
} from './../../';

import { Selectable } from './../../../../models';

@Injectable()
export class ModalService {

    private outlet: ModalOutletComponent;

    constructor(private router: Router) { }

    /**
     * Register a ModalOutletComponent to the Service.
     * It's not able to register more than one Component.
     * @param {ModalOutletComponent} component - the outlet component to create the modal in
     */
    public register(component: ModalOutletComponent): void {
        if (this.outlet) {
            return console.error('ModalOutletComponent already registered in ModalService.');
        }
        this.outlet = component;
    }

    /**
     * Removes the open modal inside the registered ModalOutletComponent
     */
    public destroyModal(): void {
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.destroy();
    }

    /**
     * Create an error Modal with injected parameters
     * @param {Object} data - the data object for injection
     * @param {String} data.title - the displayed title of the modal
     * @param {String} data.message - the message to display in the modal content
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
     * @param {Object} data - the data object for injection
     * @param {String} data.title - displayed title of the modal
     * @param {Object[]} data.list - list of elements to display
     * @param {Function} data.click - function to be executed on List-Element click
     *
     * @param {Boolean} data.isFluid - @optional: overlay styling attribute
     * @param {String} data.emptyText - @optional: text to be displayed if no element is in the list
     * @param {Boolean} data.redirect - @optional: flag to indicate if there is a redirect button if the list is empty
     * @param {String} data.redirectText - @optional: text on the redirect button
     * @param {String[]} data.redirectParam - @optional: params for the @angular/router
     * @param {Function} data.redirectFn - @optional: custom function to execute the redirect
     * @param {String} data.selectedValue - @optional: single value to highlight in the list
     * @param {String[]} data.selectedValues - @optional: array of values to highlight in the list
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
     * @param {Object} data - the data object for injection
     * @param {String} data.title - the displayed title of the modal
     * @param {String} data.message - the message to display in the modal content
     * @param {Function} data.confirm - the callback function for the confirm button
     * @param {Function} data.cancel - @optional the callback function for the cancel button
     */
    public createConfirmationModal(data: {
        title: string,
        message: string,
        confirm: Function,
        cancel?: Function
    }): void {
        data.cancel = data.cancel || this.destroyModal.bind(this)

        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalConfirmationComponent);
    }

}