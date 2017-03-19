import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { ListService } from './../../services';

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
        ListService
    ]
})
export class ApplicationsListComponent implements OnInit {

    @Input() applications: ApplicationDetailDto[];
    @Input() user: UserDetailDto;

    public list: ApplicationDetailDto[] = [];

    private status = Status;

    constructor(
        protected listService: ListService
    ) { }

    ngOnInit() {
        this.listService.list.subscribe((result: ApplicationDetailDto[]) => {
            this.list = result;
        });
        this.listService.setOriginalList(this.applications);
    }
}

@Component({
    selector: 'pk-applications-list-owned',
    templateUrl: './applications-list-owned.component.html',
    providers: [
        ListService
    ]
})
export class ApplicationsListOwnedComponent extends ApplicationsListComponent {
    constructor(
        protected listService: ListService
    ) {
        super(listService);
    }
}

@Component({
    selector: 'pk-applications-list-assigned',
    templateUrl: './applications-list-assigned.component.html',
    providers: [
        ListService
    ]
})
export class ApplicationsListAssignedComponent extends ApplicationsListComponent {
    constructor(
        protected listService: ListService
    ) {
        super(listService);
    }
}
