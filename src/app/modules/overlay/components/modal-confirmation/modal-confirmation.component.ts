import { Component, OnInit, ViewChild, Injector } from '@angular/core';

import { OverlayComponent } from './../';

import { Field } from './../../../../swagger';

@Component({
  selector: 'pk-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    public title: string;
    public message: string;
    public confirm: Function;
    public confirmText: string;
    public cancel: Function;
    public cancelText: string;

    public confirmationForm: Field[];

    constructor(private injector: Injector) {
        this.title = this.injector.get('title');
        this.message = this.injector.get('message');
        this.confirm = this.injector.get('confirm');
        this.confirmText = this.injector.get('confirmText');
        this.cancel = this.injector.get('cancel');
        this.cancelText = this.injector.get('cancelText');
    }

    ngOnInit() {
        if (this.overlay instanceof OverlayComponent) {
            this.overlay.toggle(true);
        }
    }

}
