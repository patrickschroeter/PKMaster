import { Component } from '@angular/core';

import { Button } from './../button.class';

/** Models */
import { ApplicationDetailDto } from './../../../../swagger';

@Component({
  selector: 'pk-button-application-edit',
  templateUrl: './button-application-edit.component.html'
})
export class ButtonApplicationEditComponent extends Button {

    public application: ApplicationDetailDto;

    constructor() {
        super();
    }

}
