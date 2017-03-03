import { Input } from '@angular/core';

import { ApplicationDetailDto, ApplicationListDto, Status } from './../../../swagger';

export class Button {

    @Input() public application: ApplicationDetailDto | ApplicationListDto;

    public status = Status;

    constructor() { }

}
