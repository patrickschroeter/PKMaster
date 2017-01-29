import { Injectable, EventEmitter } from '@angular/core';

import {
    ModalOutletComponent,

    ModalErrorComponent,
    ModalSelectlistComponent
} from './../../';

@Injectable()
export class ModalService {

    private outlet: ModalOutletComponent;

    constructor() { }

    public register(component: ModalOutletComponent): void {
        if (this.outlet) {
            return console.error('ModalOutletComponent already registered in ModalService.');
        }
        this.outlet = component;
    }

    public destroyModal() {
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.destroy();
    }

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

}
