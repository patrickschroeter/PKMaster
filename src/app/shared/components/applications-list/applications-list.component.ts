import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

/** Models */
import {
    ApplicationDetailDto,
    UserDetailDto,
    Status
} from './../../../swagger';

@Component({
    selector: 'pk-applications-list',
    templateUrl: './applications-list.component.html'
})
export class ApplicationsListComponent implements OnInit {

    @Input() applications: ApplicationDetailDto[];
    @Input() user: UserDetailDto;

    private status = Status;

    constructor() { }

    ngOnInit() {
    }
}

@Component({
    selector: 'pk-applications-list-owned',
    templateUrl: './applications-list-owned.component.html'
})
export class ApplicationsListOwnedComponent extends ApplicationsListComponent {}

@Component({
    selector: 'pk-applications-list-assigned',
    templateUrl: './applications-list-assigned.component.html'
})
export class ApplicationsListAssignedComponent extends ApplicationsListComponent {}
