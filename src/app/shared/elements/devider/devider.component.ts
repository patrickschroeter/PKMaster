import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pk-devider',
    templateUrl: './devider.component.html',
    styleUrls: ['./devider.component.scss'],
    host: {
        '[class.devider]': 'true',
        '[class.devider-element]': 'true'
    }
})
export class DeviderComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
