import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { ApplicationService, FormService, PermissionService } from './../../core';

import { AlertService } from './../../modules/alert';
import { TranslationService } from './../../modules/translation';
import { ModalService } from './../../modules/overlay';

import { Application } from './../../swagger';

@Component({
    selector: 'pk-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private applications: Application[];

    private applicationTypes: Array<{ value, label }>;

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
        this.applicationService.getApplications().subscribe(result => {
            this.applications = result;
        });

        this.formService.getForms().subscribe(forms => {
            this.applicationTypes = [];
            for (let i = 0, length = forms.length; i < length; i++) {
                const element = forms[i];
                this.applicationTypes.push({
                    value: element.id,
                    label: element.title
                });
            }
        });
    }

    sortBy(sortValue: string) {
        this.applicationService.getApplications(sortValue);
    }

    public submitApplicationModal(application: Application) {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmSubmitApplicationHeader'),
            message: this.translationService.translate('confirmSubmitApplicationContent'),
            confirm: () => {
                this.submitApplication(application);
            }
        });
    }

    private submitApplication(application: Application) {
        this.applicationService.submitApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`submitApplication${application.id}`, this.translationService.translate('applicationSubmitted'));

            this.modalService.destroyModal();
        });
    }

    public rescindApplicationModal(application: Application) {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmRescindApplicationHeader'),
            message: this.translationService.translate('confirmRescindApplicationContent'),
            confirm: () => {
                this.rescindApplication(application);
            }
        });
    }


    private rescindApplication(application: Application) {
        this.applicationService.rescindApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`rescindApplication${application.id}`, this.translationService.translate('applicationRescinded'));

            this.modalService.destroyModal();
        });
    }

    public deactivateApplicationModal(application: Application) {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeactivateApplicationHeader'),
            message: this.translationService.translate('confirmDeactivateApplicationContent'),
            confirm: () => {
                this.deactivateApplication(application);
            }
        });
    }

    private deactivateApplication(application: Application) {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`deactivateApplication${application.id}`,
                this.translationService.translate('applicationDeactivated')
            );

            this.modalService.destroyModal();
        });
    }

    public createApplicationModal() {
        this.modalService.createListModal({
            title: this.translationService.translate('createNewApplication'),
            list: this.applicationTypes,
            click: this.createApplication.bind(this),
            isFluid: true,

            emptyText: this.translationService.translate('noFormsAvailable'),
            emptyLinkText: this.translationService.translate('createNewForm'),
            redirect: ['forms']
        });
    }

    private createApplication(form) {
        const application: Application = {
            formId: form.value,
            form: {
                id: form.value
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
