import { Component, Input } from '@angular/core';

/** Models */
import { ConferenceDetailDto } from 'app/swagger';

@Component({
    selector: 'pk-button-conference-edit',
    templateUrl: './button-conference-edit.component.html'
})
export class ButtonConferenceEditComponent {

    @Input() conference: ConferenceDetailDto;

    constructor() { }

}
