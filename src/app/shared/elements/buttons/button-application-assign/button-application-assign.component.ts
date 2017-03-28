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

import { Button } from './../button.class';

/** Services */
import {
    UserService,
    ApplicationService
} from 'app/core';

/** Modules */
import { ModalService } from 'app/modules/overlay';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { UserDetailDto, ApplicationDetailDto } from 'app/swagger';
import { Selectable } from 'app/models';

/**
 * ButtonApplicationAssignComponent
 *
 * @export
 * @class ButtonApplicationAssignComponent
 * @extends {Button}
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-button-application-assign',
    templateUrl: './button-application-assign.component.html',
    styleUrls: ['./button-application-assign.component.scss']
})
export class ButtonApplicationAssignComponent extends Button implements OnInit {

    @Input() application: ApplicationDetailDto;

    private users: Selectable[];

    /**
     * Creates an instance of ButtonApplicationAssignComponent.
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     * @param {UserService} userService
     * @param {ApplicationService} applicationService
     *
     * @memberOf ButtonApplicationAssignComponent
     */
    constructor(
        protected modalService: ModalService,
        protected translationService: TranslationService,
        protected userService: UserService,
        protected applicationService: ApplicationService
    ) {
        super();
    }

    /**
     * implements OnInit
     *
     *
     * @memberOf ButtonApplicationAssignComponent
     */
    ngOnInit() {
        this.userService.getUsers().subscribe(users => {
            this.users = users.map(obj => new Selectable(obj.id, `${obj.lastname}, ${obj.firstname}`));
        });
    }

    /**
     * opens the assignment modal for users
     *
     * @memberOf ApplicationsDetailComponent
     */
    public assignUserModal() {
        this.modalService.createListModal({
            title: this.translationService.translate('assignUserHeader'),
            list: this.users,
            click: this.assignUser.bind(this),

            selectedValues: this.application.assignments ? this.application.assignments.map(obj => obj.id) : [],

            emptyText: this.translationService.translate('noUsersAvailable')
        });
    }

    /**
     * add/remove a user from the application
     *
     * @param {Selectable} user
     *
     * @memberOf ApplicationsDetailComponent
     */
    public assignUser(user: Selectable): void {
        const index = _.findIndex(this.application.assignments, (obj: UserDetailDto) => obj.id === user.value);
        if (index === -1) {
            this.applicationService.assignUserToApplication(this.application, user.value).subscribe((result: ApplicationDetailDto) => {
                this.application.update(result);
                this.modalService.updateSelectedValues(this.application.assignments.map(obj => obj.id));
            });
        } else {
            this.applicationService.removeAssignmentFromApplication(this.application, user.value).subscribe(result => {
                this.modalService.updateSelectedValues(this.application.assignments.map(obj => obj.id));
            });
        }
    }

}

/**
 * ButtonApplicationUnassignComponent
 *
 * @export
 * @class ButtonApplicationUnassignComponent
 * @extends {ButtonApplicationAssignComponent}
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-button-application-unassign',
    templateUrl: './button-application-unassign.component.html'
})
export class ButtonApplicationUnassignComponent extends ButtonApplicationAssignComponent implements OnInit {

    @Input() user: UserDetailDto;

    /**
     * Creates an instance of ButtonApplicationUnassignComponent.
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     * @param {UserService} userService
     * @param {ApplicationService} applicationService
     *
     * @memberOf ButtonApplicationUnassignComponent
     */
    constructor(
        protected modalService: ModalService,
        protected translationService: TranslationService,
        protected userService: UserService,
        protected applicationService: ApplicationService
    ) {
        super(modalService, translationService, userService, applicationService);
    }

    /**
     * remove user from the application
     *
     * @param {UserDetailDto} user
     *
     * @memberOf ApplicationsDetailComponent
     */
    public unassignUser(user: UserDetailDto) {
        this.assignUser(new Selectable(user.id, user.id));
    }
}
