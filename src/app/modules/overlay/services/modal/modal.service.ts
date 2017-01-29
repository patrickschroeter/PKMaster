import { Injectable, EventEmitter } from '@angular/core';

import { OverlayOutletComponent, OverlayDefaultComponent } from './../../';

@Injectable()
export class ModalService {

    private outlet: OverlayOutletComponent;

    constructor() { }

    public register(component: OverlayOutletComponent): void {
        if (this.outlet) {
            return console.error('OverlayOutletComponent already registered in ModalService.');
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
            throw new Error('No OverlayOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, OverlayDefaultComponent);
    }

    public createErrorModal(title: string, message: string) {
        const data = {
            title: title,
            message: message
        };
        if (!this.outlet) {
            throw new Error('No OverlayOutletComponent registered in ModalService.');
        }
        this.outlet.createComponent(data, OverlayDefaultComponent);
    }

}
