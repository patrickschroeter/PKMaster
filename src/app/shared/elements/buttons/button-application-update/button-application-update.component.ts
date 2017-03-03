import { Component } from '@angular/core';

import { Button } from './../button.class';

@Component({
    selector: 'pk-button-application-update',
    templateUrl: './button-application-update.component.html',
    styleUrls: ['./button-application-update.component.scss']
})
export class ButtonApplicationUpdateComponent extends Button {

    constructor() {
        super();
    }

}
