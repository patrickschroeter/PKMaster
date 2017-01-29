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
