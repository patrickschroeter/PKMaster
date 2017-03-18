import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { PaginationService } from './../../services';

/** Models */
import {
    ApplicationDetailDto,
    UserDetailDto,
    Status
} from './../../../swagger';

@Component({
    selector: 'pk-applications-list',
    templateUrl: './applications-list.component.html',
    providers: [
        PaginationService
    ]
})
export class ApplicationsListComponent implements OnInit {

    @Input() applications: ApplicationDetailDto[];
    @Input() user: UserDetailDto;

    public list: ApplicationDetailDto[] = [];

    private status = Status;

    constructor(
        protected pagination: PaginationService
    ) { }

    ngOnInit() {
        this.pagination.list.subscribe((result: ApplicationDetailDto[]) => {
            this.list = result;
        });
        this.pagination.setOriginalList(this.applications);
    }
}

@Component({
    selector: 'pk-applications-list-owned',
    templateUrl: './applications-list-owned.component.html',
    providers: [
        PaginationService
    ]
})
export class ApplicationsListOwnedComponent extends ApplicationsListComponent {
    constructor(
        protected pagination: PaginationService
    ) {
        super(pagination);
    }
}

@Component({
    selector: 'pk-applications-list-assigned',
    templateUrl: './applications-list-assigned.component.html',
    providers: [
        PaginationService
    ]
})
export class ApplicationsListAssignedComponent extends ApplicationsListComponent {
    constructor(
        protected pagination: PaginationService
    ) {
        super(pagination);
    }
}
