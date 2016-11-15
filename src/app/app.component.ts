import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'pk-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    constructor() {  }

    ngOnInit() {
    }
}
