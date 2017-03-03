import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

/** Services */
import { ApplicationService } from './../../../core';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { ModalService } from './../../../modules/overlay';

/** Models */
import {
    ApplicationDetailDto,
    Status
} from './../../../swagger';

@Component({
    selector: 'pk-applications-edit',
    templateUrl: './applications-edit.component.html',
    styleUrls: ['./applications-edit.component.scss']
})
export class ApplicationsEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _application: ApplicationDetailDto;

    get application() { return this._application; }
    set application(application: ApplicationDetailDto) { this._application = application; }

    public status = Status;

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
        private alert: AlertService,
        private translationService: TranslationService,
        private modalService: ModalService
    ) { }

    ngOnInit() {

        /** Read Route Param and GET Application with param ID */
        this.getApplicationByRouteParam();
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

                this.checkStatusForEdit();

                this.updateDeprecatedForm();

            }, error => {
                console.error(error);
            });
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
