import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { ListService, List } from './../../services';

/** Models */
import {
    ApplicationDetailDto,
    ApplicationListDto,
    UserDetailDto,
    Status
} from 'app/swagger';

@Component({
    selector: 'pk-applications-list',
    templateUrl: './applications-list.component.html',
    providers: [
        ListService
    ]
})
export class ApplicationsListComponent extends List<ApplicationListDto> implements OnInit {

    @Input() applications: ApplicationListDto[];
    @Input() user: UserDetailDto;

    private status = Status;

    public list: ApplicationListDto[];

    constructor(
        public listService: ListService
    ) {
        super(listService);
    }

    ngOnInit() {
        // not required to unsubscribe onDestroy because Service does not exist either
        this.initListDependencies(this.applications);
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
