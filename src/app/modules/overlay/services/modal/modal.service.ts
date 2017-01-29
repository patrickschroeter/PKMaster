import { Injectable, EventEmitter } from '@angular/core';

import {
    ModalOutletComponent,

    ModalErrorComponent,
    ModalSelectlistComponent,
    ModalConfirmationComponent
} from './../../';

@Injectable()
export class ModalService {

    private outlet: ModalOutletComponent;

    constructor() { }

    /**
     * Register a ModalOutletComponent to the Service.
     * It's not able to register more than one Component.
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
    public destroyModal() {
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.destroy();
    }

    /**
     * Create an error Modal with injected parameters
     */
    public createErrorModal(data: {
        title: string,
        message: string
    }) {
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalErrorComponent);
    }

    /**
     * Create an list Modal with injected parameters
     */
    public createListModal(data: {
        title: string,
        list: Object[],
        click: Function,
        isFluid?: boolean
    }) {
        if (!data.isFluid) {
            data.isFluid = false;
        }
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalSelectlistComponent);
    }

    /**
     * Create an confirmation Modal with injected parameters
     */
    public createConfirmationModal(data: {
        title: string,
        message: string,
        confirm: Function,
        cancel?: Function
    }) {
        if (!data.cancel) {
            data.cancel = this.destroyModal.bind(this);
        }
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalConfirmationComponent);
    }

}
