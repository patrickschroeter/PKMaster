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

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    ApplicationService,
    FormService,
    PermissionService,
    AuthenticationService
} from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { ModalService } from 'app/modules/overlay';

/** Models */
import {
    ApplicationDetailDto,
    ApplicationListDto,
    ApplicationCreateDto,
    UserDetailDto
} from 'app/swagger';
import { Selectable } from 'app/models';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * ApplicationsComponent
 *
 * @export
 * @class ApplicationsComponent
 * @implements {OnInit}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    public ownApplications: ApplicationListDto[];
    public assignedApplications: ApplicationListDto[];
    public applications: ApplicationListDto[];

    public activeTab: string;

    private applicationTypes: Array<Selectable>;

    public user: UserDetailDto;

    /**
     * Creates an instance of ApplicationsComponent.
     * @param {Router} router
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     * @param {ModalService} modalService
     * @param {ApplicationService} applicationService
     * @param {FormService} formService
     * @param {PermissionService} permission
     * @param {AuthenticationService} auth
     *
     * @memberOf ApplicationsComponent
     */
    constructor(
        /** Angular */
        private router: Router,
        /** Modules */
        public alert: AlertService,
        private translationService: TranslationService,
        private modalService: ModalService,
        /** Services */
        private applicationService: ApplicationService,
        private formService: FormService,
        public permission: PermissionService,
        private auth: AuthenticationService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ApplicationsComponent
     */
    ngOnInit() {

        /** get all forms */
        this.formService.getForms().subscribe(forms => {
            this.applicationTypes = [];
            for (let i = 0; i < forms.length; i++) {
                const element = forms[i];
                // TODO filter server side
                if (element.isActive) {
                    this.applicationTypes.push(new Selectable(element.id, element.title));
                }
            }
        });

        // TODO remove when filtered on server
        this.auth.getUser().subscribe(user => {
            this.user = user;
            /** get applications */
            this.getApplications();
        }, error => { console.error(error); });
    }

    private getApplications(): void {
        this.activeTab = 'owned';
        this.applicationService.getOwnApplications(null, this.user).subscribe(result => {
            this.ownApplications = result;
        });
        this.applicationService.getAssignedApplications(null, this.user).subscribe(result => {
            this.assignedApplications = result;
        });
        this.getAllApplications();
    }

    @Access('ReadApplications')
    private getAllApplications(): void {
        this.applicationService.getApplications().subscribe(result => {
            if (result && result.length) {
                this.activeTab = 'all';
            }
            this.applications = result;
        });
    }

    /**
     * Sort all applications by the sortValue string
     */
    public sortBy(sortValue: string): void {
        this.applicationService.getApplications(sortValue);
    }

    /**
     * Creates a list modal to select the form for the new application
     */
    @Access('CreateApplications')
    public createApplicationModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('createNewApplication'),
            list: this.applicationTypes,
            click: this.createApplication.bind(this),
            isFluid: true,

            emptyText: this.translationService.translate('noFormsAvailable'),
            redirect: this.permission.hasPermission('ReadForms'),
            redirectText: this.translationService.translate('createNewForm'),
            redirectParam: ['forms']
        });
    }

    /**
     * Create a new application with the selected form
     */
    @Access('CreateApplications')
    private createApplication(listelement: Selectable): void {
        /** TODO */
        const param: ApplicationCreateDto = new ApplicationCreateDto();
        param.formId = listelement.value;
        this.applicationService.createNewApplication(param).subscribe((created: ApplicationDetailDto) => {
            if (created['id']) {
                this.router.navigate([`/applications/`, created['id'], 'edit']);
            }
            this.modalService.destroyModal();
        }, error => {
            this.modalService.destroyModal();
            this.alert.setAlert(
                this.translationService.translate('Error'),
                this.translationService.translate('couldntCreateApplication')
            );
        });
    }
}
