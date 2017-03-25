/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

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

/**
 * ApplicationsListComponent
 *
 * @export
 * @class ApplicationsListComponent
 * @extends {List<ApplicationListDto>}
 * @implements {OnInit}
 */
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

    /**
     * Creates an instance of ApplicationsListComponent.
     * @param {ListService} listService
     *
     * @memberOf ApplicationsListComponent
     */
    constructor(
        public listService: ListService
    ) {
        super(listService);
    }

    /**
     * implements OnInit
     *
     * @memberOf ApplicationsListComponent
     */
    ngOnInit() {
        // not required to unsubscribe onDestroy because Service does not exist either
        this.initListDependencies(this.applications);
    }
}

/**
 * ApplicationsListOwnedComponent
 *
 * @export
 * @class ApplicationsListOwnedComponent
 * @extends {ApplicationsListComponent}
 */
@Component({
    selector: 'pk-applications-list-owned',
    templateUrl: './applications-list-owned.component.html',
    providers: [
        ListService
    ]
})
export class ApplicationsListOwnedComponent extends ApplicationsListComponent {
    /**
     * Creates an instance of ApplicationsListOwnedComponent.
     * @param {ListService} listService
     *
     * @memberOf ApplicationsListOwnedComponent
     */
    constructor(
        public listService: ListService
    ) {
        super(listService);
    }
}

/**
 * ApplicationsListAssignedComponent
 *
 * @export
 * @class ApplicationsListAssignedComponent
 * @extends {ApplicationsListComponent}
 */
@Component({
    selector: 'pk-applications-list-assigned',
    templateUrl: './applications-list-assigned.component.html',
    providers: [
        ListService
    ]
})
export class ApplicationsListAssignedComponent extends ApplicationsListComponent {
    /**
     * Creates an instance of ApplicationsListAssignedComponent.
     * @param {ListService} listService
     *
     * @memberOf ApplicationsListAssignedComponent
     */
    constructor(
        public listService: ListService
    ) {
        super(listService);
    }
}
