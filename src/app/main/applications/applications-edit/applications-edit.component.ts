import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

/** Services */
import { ApplicationService } from './../../../core';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { ModalService } from './../../../modules/overlay';

/** Models */
import { Application } from './../../../swagger';

@Component({
    selector: 'pk-applications-edit',
    templateUrl: './applications-edit.component.html',
    styleUrls: ['./applications-edit.component.scss']
})
export class ApplicationsEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _application: Application;

    get application() { return this._application; }
    set application(application: Application) { this._application = application; }

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
        this.activatedRoute.params.forEach((params: Params) => {
            this.applicationService.getApplicationById(params['id']).subscribe((application) => {
                // TODO catch in service
                if (!application) {
                    return this.onError(params['id']);
                } else if (application.status && ['rescinded', 'created'].indexOf(application.status.name) === -1) {
                    this.router.navigate(['/applications']);
                    this.alert.setErrorHint(
                        'no-application-edit',
                        this.translationService.translate('errorApplicationEditPermitted'),
                        2000
                    );
                    return;
                }
                this.application = application;
            }, error => {
                console.error(error);
                return this.onError(params['id']);
            });
        });
    }

    /**
     * Handle error
     * @param {String} id - the id of the failed application
     */
    private onError(id: string): void {
        this.router.navigate(['/applications']);
        this.alert.setErrorHint(
            'no-application-found',
            this.translationService.translate('errorNoApplicationWithId', [id]),
            2000
        );
    }

    /**
     * Save the current application with content
     * @param {Object} form
     */
    public saveApplication(form): void {
        console.log(JSON.stringify(form));
        this.applicationService.saveApplication(form).subscribe(result => {
            this.router.navigate([`/applications/`, result.id]);
        });
    }

    /**
     * Creates a confirmation modal to confirm deactivating the selected application
     * @param {Application} application - the application to deactovate
     */
    public deactivateApplicationModal(application: Application): void {
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
     * @param {Application} application - the application to deactovate
     */
    private deactivateApplication(application: Application): void {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.alert.setSuccessHint(
                `deactivateApplication${application.id}`,
                this.translationService.translate('applicationDeactivated')
            );
            this.modalService.destroyModal();
        });
    }

}
