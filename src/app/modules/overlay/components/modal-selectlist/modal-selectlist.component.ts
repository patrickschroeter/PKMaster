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
    public emptyLinkText: string;

    public redirect: Function;

    constructor(private injector: Injector) {
        this.title = this.injector.get('title');
        this.list = this.injector.get('list');
        this.click = this.injector.get('click');
        this.isFluid = this.injector.get('isFluid');

        this.emptyText = this.injector.get('emptyText');
        this.emptyLinkText = this.injector.get('emptyLinkText');
        this.redirect = this.injector.get('redirectFn');
    }

    ngOnInit() {
        if (this.overlay instanceof OverlayComponent) {
            this.overlay.toggle(true);
        }
    }

}
