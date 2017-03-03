import { Input } from '@angular/core';

import { ApplicationDetailDto, ApplicationListDto, Status } from './../../../swagger';

export class Button {

    @Input() application: ApplicationDetailDto | ApplicationListDto;

    public status = Status;

    constructor() { }

}
