import { Component } from '@angular/core';

import { Button } from './../button.class';

@Component({
  selector: 'pk-button-application-edit',
  templateUrl: './button-application-edit.component.html',
  styleUrls: ['./button-application-edit.component.scss']
})
export class ButtonApplicationEditComponent extends Button {

    constructor() {
        super();
    }

}
