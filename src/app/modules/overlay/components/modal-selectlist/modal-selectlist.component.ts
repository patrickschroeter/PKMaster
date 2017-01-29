import { Component, OnInit, ViewChild, Injector } from '@angular/core';

import { OverlayComponent } from './..';

@Component({
  selector: 'pk-modal-selectlist',
  templateUrl: './modal-selectlist.component.html',
  styleUrls: ['./modal-selectlist.component.scss']
})
export class ModalSelectlistComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    public title: string;
    public list: Object[];
    public isFluid: boolean;
    public click: Function;

    public emptyText: string;

    public redirect: Function;
    public redirectText: string;
    public redirectFn: Function;


    constructor(private injector: Injector) {
        this.title = this.injector.get('title');
        this.list = this.injector.get('list');
        this.click = this.injector.get('click');
        this.isFluid = this.injector.get('isFluid');

        this.emptyText = this.injector.get('emptyText');
        this.redirect = this.injector.get('redirect');
        this.redirectText = this.injector.get('redirectText');
        this.redirectFn = this.injector.get('redirectFn');
    }

    ngOnInit() {
        if (this.overlay instanceof OverlayComponent) {
            this.overlay.toggle(true);
        }
    }

}
