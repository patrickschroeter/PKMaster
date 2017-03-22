import { Component } from '@angular/core';

import { Button } from './../button.class';

/** Models */
import { ApplicationDetailDto } from 'app/swagger';

@Component({
    selector: 'pk-button-application-update',
    templateUrl: './button-application-update.component.html'
})
export class ButtonApplicationUpdateComponent extends Button {

    public application: ApplicationDetailDto;

    constructor() {
        super();
    }

}
