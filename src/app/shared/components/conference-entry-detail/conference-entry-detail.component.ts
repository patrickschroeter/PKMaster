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

import { Component, OnInit, Input, ViewChild } from '@angular/core';

/** Services */
import {
    PermissionService
} from 'app/core';
import { AlertService } from 'app/modules/alert';

/** Models */
import { ConferenceConfig } from 'app/models';
import { ApplicationDetailDto, Status } from 'app/swagger';
import { ModalAcceptApplicationComponent } from './../../';

import { Access, OnAccess } from './../../decorators/access.decorator';

/**
 * ConferenceEntryDetailComponent
 *
 * @export
 * @class ConferenceEntryDetailComponent
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-conference-entry-detail',
    templateUrl: './conference-entry-detail.component.html',
    styleUrls: ['./conference-entry-detail.component.scss']
})
export class ConferenceEntryDetailComponent implements OnAccess {

    @ViewChild('acceptModal') acceptModal: ModalAcceptApplicationComponent;

    @Input() index: string;
    @Input() entry: ConferenceConfig;

    public status = Status;

    /**
     * Creates an instance of ConferenceEntryDetailComponent.
     * @param {PermissionService} permission
     * @param {AlertService} alert
     *
     * @memberOf ConferenceEntryDetailComponent
     */
    constructor(
        public permission: PermissionService,
        public alert: AlertService
    ) { }

    /**
     * ngFor trackByFn
     *
     * @param {number} index
     * @param {*} item
     * @returns
     *
     * @memberOf ConferenceEntryDetailComponent
     */
    public trackByFn(index: number, item: any) {
        return index;
    }

    /**
     * select the current application
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ConferenceEntryDetailComponent
     */
    @Access('EditApplications')
    public updateApplication(application: ApplicationDetailDto) {
        for (let i = 0; i < this.entry.entries.length; i++) {
            if (this.entry.entries[i].id === application.id) {
                this.entry.entries[i] = application;
            }
        }
    }

}
