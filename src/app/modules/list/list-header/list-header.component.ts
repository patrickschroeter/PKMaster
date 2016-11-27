import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-list-header',
    template: '<ng-content></ng-content>'
})
export class ListHeaderComponent implements OnInit {

    @HostBinding('class.list-element') element = true;

    constructor() { }

    ngOnInit() {
    }

}
