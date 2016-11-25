import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { ApplicationService, AlertService } from './../../core';

import { Application, State, FormElement } from './../../swagger';

@Component({
    selector: 'pk-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private applications: Application[];
    private isOpenNewApplication: boolean = false;

    private newApplication: FormElement[];

    constructor(
        private router: Router,
        private applicationService: ApplicationService,
        private alert: AlertService) { }

    ngOnInit() {
        this.applicationService.getApplications().subscribe(result => {
            this.applications = result;
        });
        this.newApplication = [
            // {
            //     elementType: 'input',
            //     name: 'application-title',
            //     label: 'Custom Application Title (optional):',
            //     styles: [
            //         'small'
            //     ]
            // },
            {
                elementType: 'radio',
                name: 'application-form',
                label: 'Select Form:',
                required: true,
                options: [
                    {
                        value: 'thesis',
                        label: 'Abschlussarbeit',
                    },
                    {
                        value: 'notes-change',
                        label: 'Notenänderung',
                    },
                    {
                        value: 'notes-late',
                        label: 'Notenanrechnung',
                    }
                ],
                styles: [
                    'small'
                ]
            }
        ]
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

    createNewApplication(application: Application) {
        this.applicationService.createNewApplication(application).subscribe((created) => {
            if (created['id']) {
                this.router.navigate([`/applications/`, created['id'], 'edit']);
            }
        });
    }
}
