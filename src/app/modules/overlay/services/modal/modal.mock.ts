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

import { Injectable } from '@angular/core';

import {
    ModalOutletComponent,
} from './../../';

@Injectable()
export class ModalMock {


    constructor() { }

    /**
     * Register a ModalOutletComponent to the Service.
     * It's not able to register more than one Component.
     */
    public register(component: ModalOutletComponent): void { }

    /**
     * Removes the open modal inside the registered ModalOutletComponent
     */
    public destroyModal() { }

    /**
     * Create an error Modal with injected parameters
     */
    public createErrorModal(data: {
        title: string,
        message: string
    }) { }

    /**
     * Create an list Modal with injected parameters
     */
    public createListModal(data: {
        title: string,
        list: Object[],
        click: Function,
        isFluid?: boolean
    }) { }

    /**
     * Create an confirmation Modal with injected parameters
     */
    public createConfirmationModal(data: {
        title: string,
        message: string,
        confirm: Function,
        cancel?: Function
    }) { }

}
