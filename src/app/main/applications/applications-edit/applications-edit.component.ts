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
import { ActivatedRoute, Params, Router } from '@angular/router';

/** Services */
import {
    ApplicationService,
    PermissionService,
    AuthenticationService
} from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { ModalService } from 'app/modules/overlay';

/** Models */
import {
    ApplicationDetailDto,
    Status,
    UserDetailDto
} from 'app/swagger';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * ApplicationsEditComponent
 *
 * @export
 * @class ApplicationsEditComponent
 * @implements {OnInit}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-applications-edit',
    templateUrl: './applications-edit.component.html',
    styleUrls: ['./applications-edit.component.scss']
})
export class ApplicationsEditComponent implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    private _application: ApplicationDetailDto;

    get application() { return this._application; }
    set application(application: ApplicationDetailDto) { this._application = application; }

    public status = Status;

    private user: UserDetailDto;

    /**
     * Creates an instance of ApplicationsEditComponent.
     * @param {Router} router
     * @param {ActivatedRoute} activatedRoute
     * @param {ApplicationService} applicationService
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     * @param {ModalService} modalService
     *
     * @memberOf ApplicationsEditComponent
     */
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
        private translationService: TranslationService,
        private modalService: ModalService,
        public alert: AlertService,
        public permission: PermissionService,
        private auth: AuthenticationService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ApplicationsEditComponent
     */
    ngOnInit() {

        /** Read Route Param and GET Application with param ID */
        this.getApplicationByRouteParam();

        this.getUser();
    }

    /**
     * Read Route Param and GET Application with param ID
     *
     * @private
     *
     * @memberOf ApplicationsEditComponent
     */
    private getApplicationByRouteParam(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            this.applicationService.getApplicationById(params['id']).subscribe((application) => {
                this.application = application;

                if (!this.permission.hasPermission('ReadApplications') && !this.isOwner()) {
                    return this.router.navigate(['/applications']);
                }

                this.checkStatusForEdit();

                this.updateDeprecatedForm();

            }, error => {
                console.error(error);
            });
        });
    }

    /**
     * get the current user
     *
     * @private
     *
     * @memberOf ApplicationsEditComponent
     */
    private getUser(): void {
        this.auth.getUser().subscribe(user => {
            this.user = user;
        });
    }

    /**
     * check if the application has the status to be edited
     *
     * @private
     * @returns {void}
     *
     * @memberOf ApplicationsEditComponent
     */
    private checkStatusForEdit(): void {
        if (!this.application.hasStatus(Status.RESCINDED, Status.CREATED)) {
            this.router.navigate(['/applications']);
            this.alert.setErrorHint(
                'no-application-edit',
                this.translationService.translate('errorApplicationEditPermitted'),
                2000
            );
            return;
        }
    }

    /**
     * check if the current user is owner of the application
     *
     * @returns {boolean}
     *
     * @memberOf ApplicationsDetailComponent
     */
    public isOwner(): boolean {
        return this.user.id === this.application.user.id;
    }

    /**
     * check and refresh the form if it's deprecated
     *
     * @private
     *
     * @memberOf ApplicationsEditComponent
     */
    private updateDeprecatedForm(): void {
        if (this.application.form.deprecated && this.application.currentForm) {
            this.alert.setAlert(
                this.translationService.translate('updateRequiredHeader'),
                this.translationService.translate('updateRequiredProgress')
            );
            this.application.updateAttributes(this.application.currentForm);
        }
    }

    /**
     * Save the current application with content
     *
     * @param {ApplicationDetailDto} form
     *
     * @memberOf ApplicationsEditComponent
     */
    public saveApplication(form: ApplicationDetailDto): void {
        console.log(JSON.stringify(form));
        this.applicationService.saveApplication(form).subscribe(result => {
            this.router.navigate([`/applications/`, result.id]);
        });
    }

    /**
     * Creates a confirmation modal to confirm deactivating the selected application
     *
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsEditComponent
     */
    public deactivateApplicationModal(application: ApplicationDetailDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeactivateApplicationHeader'),
            message: this.translationService.translate('confirmDeactivateApplicationContent'),
            confirm: () => {
                this.deactivateApplication(application);
            }
        });
    }

    /**
     * Deactivate the selected application
     *
     * @private
     * @param {ApplicationDetailDto} application
     *
     * @memberOf ApplicationsEditComponent
     */
    private deactivateApplication(application: ApplicationDetailDto): void {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.alert.setSuccessHint(
                `deactivateApplication${application.id}`,
                this.translationService.translate('applicationDeactivated')
            );
            this.modalService.destroyModal();
            this.router.navigate(['applications']);
        });
    }

    public onDeactivateSuccess(application: ApplicationDetailDto) {
        this.router.navigate(['applications']);
    }

}
