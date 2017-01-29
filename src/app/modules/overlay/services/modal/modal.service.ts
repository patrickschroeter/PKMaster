import { Injectable, EventEmitter } from '@angular/core';

import { ModalOutletComponent, ModalErrorComponent } from './../../';

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

    public create(title: string, message: string, type: string): void {
        const data = {
            title: title,
            message: message,
            type: type
        };
        if (!this.outlet) {
            throw new Error('No ModalOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, ModalErrorComponent);
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

}
