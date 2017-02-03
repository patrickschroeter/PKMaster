import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

/** Services */
import {
    ApplicationService,
    FormService,
    PermissionService
} from './../../core';
import { AlertService } from './../../modules/alert';
import { TranslationService } from './../../modules/translation';
import { ModalService } from './../../modules/overlay';

/** Models */
import { Application } from './../../swagger';
import { Selectable } from './../../models';

/** Decorators */
import { Access } from './../../shared';

@Component({
    selector: 'pk-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private applications: Application[];

    private applicationTypes: Array<Selectable>;

    constructor(
        private router: Router,
        private applicationService: ApplicationService,
        private alert: AlertService,
        private formService: FormService,
        private permission: PermissionService,
        private translationService: TranslationService,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        /** get all applications */
        this.applicationService.getApplications().subscribe(result => {
            this.applications = result;
        });

        /** get all forms */
        this.formService.getForms().subscribe(forms => {
            this.applicationTypes = [];
            for (let i = 0, length = forms.length; i < length; i++) {
                const element = forms[i];
                this.applicationTypes.push(new Selectable(element.id, element.title));
            }
        });
    }

    /**
     * Sort all applications by the sortValue string
     */
    public sortBy(sortValue: string): void {
        this.applicationService.getApplications(sortValue);
    }

    /**
     * Creates a confirmation modal to confirm submitting the selected application
     * TODO: Prevent submit foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'EditApplications'])
    public submitApplicationModal(application: Application): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmSubmitApplicationHeader'),
            message: this.translationService.translate('confirmSubmitApplicationContent'),
            confirm: () => {
                this.submitApplication(application);
            }
        });
    }

    /**
     * Submit the selected application
     * TODO: Prevent submit foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'EditApplications'])
    private submitApplication(application: Application): void {
        this.applicationService.submitApplication(application).subscribe(result => {
            /** TODO */ application.status = result.status;
            this.alert.setSuccessHint(`submitApplication${application.id}`, this.translationService.translate('applicationSubmitted'));
            this.modalService.destroyModal();
        });
    }

    /**
     * Creates a confirmation modal to confirm rescinding the selected application
     * TODO: Prevent rescind foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'EditApplications'])
    public rescindApplicationModal(application: Application): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmRescindApplicationHeader'),
            message: this.translationService.translate('confirmRescindApplicationContent'),
            confirm: () => {
                this.rescindApplication(application);
            }
        });
    }

    /**
     * Rescind the selected application
     * TODO: Prevent rescind foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'EditApplications'])
    private rescindApplication(application: Application): void {
        this.applicationService.rescindApplication(application).subscribe(result => {
            /** TODO */ application.status = result.status;
            this.alert.setSuccessHint(`rescindApplication${application.id}`, this.translationService.translate('applicationRescinded'));
            this.modalService.destroyModal();
        });
    }

    /**
     * Creates a confirmation modal to confirm deactivating the selected application
     * TODO: Prevent deactivate foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'DeleteApplications'])
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
     * TODO: Prevent deactivate foreign application with Create & Read permission
     */
    @Access(['CreateApplications', 'DeleteApplications'])
    private deactivateApplication(application: Application): void {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            /** TODO */ application.status = result.status;
            this.alert.setSuccessHint(`deactivateApplication${application.id}`,
                this.translationService.translate('applicationDeactivated')
            );
            this.modalService.destroyModal();
        });
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
        const application: Application = {
            formId: listelement.value,
            form: {
                id: listelement.value
            },
        };
        this.applicationService.createNewApplication(application).subscribe((created) => {
            if (created['id']) {
                this.router.navigate([`/applications/`, created['id'], 'edit']);
            }
            this.modalService.destroyModal();
        });
    }
}
