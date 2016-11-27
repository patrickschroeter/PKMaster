import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-list-header',
    templateUrl: './list-header.component.html',
    styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

    @HostBinding('class.list-element') element = true;

    constructor() { }

    ngOnInit() {
    }

}
