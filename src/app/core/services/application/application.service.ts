import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AlertService } from './../alert';
import { FormService } from './../form';

import { Application, Field, Status } from './../../../swagger';

@Injectable()
export class ApplicationService {

    private application: Application;
    private applications: Application[];

    constructor(
        private formService: FormService,
        private alert: AlertService) {

        // hack
        this.formService.getFormById(1).subscribe(form => {
            this.application.form = form;
            this.application.attributes = form.elements;
        });
        this.applications = [
            {
                id: '1',
                status: 'created',
                created: new Date(2016, 6, 4),
                form: {
                    title: 'Bachelorarbeit'
                }
            },
            {
                id: '2',
                status: 'submitted',
                created: new Date(2016, 7, 12),
                form: {
                    title: 'Masterarbeit'
                }
            },
            {
                id: '3',
                status: 'rescinded',
                created: new Date(2016, 5, 21),
                form: {
                    title: 'Notenanrechnung'
                }
            },
            {
                id: '4',
                status: 'deactivated',
                created: new Date(2016, 4, 1),
                form: {
                    title: 'Notenänderung'
                }
            },
            {
                id: '5',
                status: 'pending',
                created: new Date(2016, 9, 23),
                form: {
                    title: 'Anrechnung der Ausbildung'
                }
            },
            {
                id: '6',
                status: 'accepted',
                created: new Date(2016, 2, 5),
                modified: new Date(2016, 11, 14),
                form: {
                    title: 'Anrechnung von Studienfächern'
                }
            },
            {
                id: '7',
                status: 'denied',
                created: new Date(2016, 10, 5),
                modified: new Date(2016, 12, 5),
                form: {
                    title: 'Urlaubssemester'
                }
            }
        ];
        // hack end
        this.application = {
            id: 17,
            comments: [
                {
                    id: 1,
                    author: {
                        salutation: 'Prof.',
                        name: 'Kowa'
                    },
                    message: 'Awesome Code!',
                    created: 1477555500,
                    isPrivate: false,
                    isMandatory: false
                },
                {
                    id: 2,
                    author: {
                        salutation: 'Prof.',
                        name: 'Rothaug'
                    },
                    message: 'Awesome Design!',
                    created: 1477685500,
                    isPrivate: false,
                    isMandatory: true
                },
                {
                    id: 3,
                    author: {
                        salutation: 'Prof.',
                        name: 'Bergmann'
                    },
                    message: 'Awesome Tool!',
                    created: 1477685500,
                    isPrivate: true,
                    isMandatory: true
                }
            ]
        };
     }

    /**
     * @description returns the observable to get a applicationn by the given id
     * @param {number} id
     * @return {Observable}
     */
    public getApplicationById(id: number): Observable<Application> {
        return new Observable(observer => {
            /** http getApplicationById(id) => this.currentApplication = result */
            setTimeout(() => {
                this.application.id = id;
                observer.next(this.application);
                observer.complete();
            }, 200);
        });
    }

    public getApplications(sort?: string): Observable<any> {
        if (sort) {
            this.applications.sort(function(a, b) {return (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0); });
        }
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.applications);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description returns the observable to get the new created application
     * @param {Application} application
     * @return {Observable}
     */
    public createNewApplication(application: Application): Observable<Application> {
        // hack
        this.formService.getFormById(1).subscribe(form => {
            this.application.form.elements = form.elements;
            this.application.attributes = form.elements;
        });
        // hack end
        this.application = {
            id: '17',
            form: {
                title: application['application-form']
            }
        };

        this.alert.setLoading('createNewApplication', 'Create Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeHint('createNewApplication');
                observer.next(this.application);
                observer.complete();
            }, 200);
        });
    }

    public submitApplication(application: Application): Observable<Application> {
        if (['created'].indexOf(application.status.name) === -1) {
            this.alert.setAlert('Not Allowed', 'This operation is not allowed.');
            return new Observable(observer => { observer.error('Error'); });
        }
        this.alert.setLoading(`submitApplication${application.id}`, 'Submit Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeHint(`submitApplication${application.id}`);
                application.status = 'submitted';
                observer.next(application);
                observer.complete();
            }, 200);
        });
    }

    public rescindApplication(application: Application): Observable<Application> {
        if (['submitted'].indexOf(application.status.name) === -1) {
            this.alert.setAlert('Not Allowed', 'This operation is not allowed.');
            return new Observable(observer => { observer.error('Error'); });
        }
        this.alert.setLoading(`rescindApplication${application.id}`, 'Rescind Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeHint(`rescindApplication${application.id}`);
                application.status = 'rescinded';
                observer.next(application);
                observer.complete();
            }, 200);
        });
    }

    public deactivateApplication(application: Application): Observable<Application> {
        if (['created', 'rescinded'].indexOf(application.status.name) === -1) {
            this.alert.setAlert('Not Allowed', 'This operation is not allowed.');
            return new Observable(observer => { observer.error('Error'); });
        }
        this.alert.setLoading(`deactivateApplication${application.id}`, 'Deactivate Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeHint(`deactivateApplication${application.id}`);
                application.status = 'deactivated';
                observer.next(application);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description Saves the changed application
     * @return {void}
     */
    public saveApplication(form): Observable<Application> {
        if (this.application.attributes) {
            for (let i = 0, length = this.application.attributes.length; i < length; i++) {
                let element: Field = this.application.attributes[i];
                element.value = form[element.name];
            };
        }
        this.alert.setLoading('saveApplication', 'Save Application...');
        return new Observable(observer => {
            setTimeout(() => {
                for (let i = 0, length = this.applications.length; i < length; i++) {
                    let element = this.applications[i];
                    if (element.id === this.application.id) {
                        element.status = 'created';
                    }
                }
                this.alert.removeHint('saveApplication');
                observer.next(this.application);
                observer.complete();
            }, 200);
        });
    }

}
