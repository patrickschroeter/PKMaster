import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { ListService, List } from './../../services';

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
export class ApplicationsListComponent implements OnInit, List {

    @Input() applications: ApplicationDetailDto[];
    @Input() user: UserDetailDto;

    public list: ApplicationDetailDto[] = [];
    public sort: string;

    private status = Status;

    constructor(
        public listService: ListService
    ) { }

    ngOnInit() {
        // not required to unsubscribe onDestroy because Service does not exist either
        this.listService.list.subscribe((result: ApplicationDetailDto[]) => {
            this.list = result;
        });
        this.listService.sortValue.subscribe((result: string) => {
            this.sort = result;
        });
        this.listService.setOriginalList(this.applications);
    }

    public sortBy(key: string) {
        this.listService.sortBy(key);
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
        public listService: ListService
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
        public listService: ListService
    ) {
        super(listService);
    }
}
