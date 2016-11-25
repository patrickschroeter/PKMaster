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
        this.applications = [
            {
                id: 1,
                state: State.NameEnum.created,
                created: 20160731,
                form: {
                    title: 'Bachelorarbeit'
                }
            },
            {
                id: 2,
                state: State.NameEnum.submitted,
                created: 20160731,
                form: {
                    title: 'Masterarbeit'
                }
            },
            {
                id: 3,
                state: State.NameEnum.rescinded,
                created: 20160731,
                form: {
                    title: 'Notenanrechnung'
                }
            },
            {
                id: 4,
                state: State.NameEnum.deactivated,
                created: 20160731,
                form: {
                    title: 'Notenänderung'
                }
            },
            {
                id: 5,
                state: State.NameEnum.pending,
                created: 20160731,
                form: {
                    title: 'Anrechnung der Ausbildung'
                }
            },
            {
                id: 6,
                state: State.NameEnum.accepted,
                created: 20160731,
                modified: 20161120,
                form: {
                    title: 'Anrechnung von Studienfächern'
                }
            },
            {
                id: 7,
                state: State.NameEnum.denied,
                created: 20160731,
                modified: 20161120,
                form: {
                    title: 'Urlaubssemester'
                }
            }
        ]
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
