import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { ApplicationService, FormService } from './../../core';

import { AlertService } from './../../modules/alert';

import { Application, Form } from './../../swagger';

@Component({
    selector: 'pk-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private applications: Application[];
    private isOpenNewApplication: boolean = false;

    private applicationTypes: Array<{value, label}>;

    constructor(
        private router: Router,
        private applicationService: ApplicationService,
        private alert: AlertService,
        private formService: FormService) { }

    ngOnInit() {
        this.applicationService.getApplications().subscribe(result => {
            this.applications = result;
        });

        this.formService.getForms().subscribe(forms => {
            this.applicationTypes = [];
            for (let i = 0, length = forms.length; i < length; i ++) {
                let element = forms[i];
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

    submitApplication(application: Application) {
        this.applicationService.submitApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`submitApplication${application.id}`, 'Application submitted');
        });
    }

    rescindApplication(application: Application) {
        this.applicationService.rescindApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`rescindApplication${application.id}`, 'Application rescinded');
        });
    }

    deactivateApplication(application: Application) {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`deactivateApplication${application.id}`, 'Application deactivated');
        });
    }

    toggleCreateNew() {
        this.isOpenNewApplication = !this.isOpenNewApplication;
    }

    createNewApplication(form) {
        let application: Application = {
            form: {
                id: form.value
            }
        }
        this.applicationService.createNewApplication(application).subscribe((created) => {
            if (created['id']) {
                this.router.navigate([`/applications/`, created['id'], 'edit']);
            }
        });
    }
}
