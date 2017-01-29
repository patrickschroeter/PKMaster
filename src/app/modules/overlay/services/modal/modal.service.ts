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
    public createErrorModal(title: string, message: string) {
        const data = {
            title: title,
            message: message
        };
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalErrorComponent);
    }

    /**
     * Create an list Modal with injected parameters
     */
    public createListModal(title: string, list: Object[], click: Function, isFluid?: boolean) {
        const data = {
            title: title,
            list: list,
            click: click,
            isFluid: isFluid
        };
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalSelectlistComponent);
    }

    /**
     * Create an confirmation Modal with injected parameters
     */
    public createConfirmationModal(title: string, message: string, confirm: Function, cancel?: Function) {
        const data = {
            title: title,
            message: message,
            confirm: confirm,
            cancel: cancel ? cancel : () => {
                this.destroyModal();
            }
        };
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalConfirmationComponent);
    }

}
