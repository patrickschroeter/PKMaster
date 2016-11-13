import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-devider',
    templateUrl: './devider.component.html',
    styleUrls: ['./devider.component.scss']
})
export class DeviderComponent implements OnInit {

    @HostBinding('class.element') element = true;
    @HostBinding('class.devider-element') deviderElement = true;

    constructor() { }

    ngOnInit() {
    }

}
