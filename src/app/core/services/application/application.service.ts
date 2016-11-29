import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AlertService } from './../alert';
import { FormService } from './../form';

import { Application, FormElement, State } from './../../../swagger';

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
                id: 1,
                state: State.NameEnum.created,
                created: 20160631,
                form: {
                    title: 'Bachelorarbeit'
                }
            },
            {
                id: 2,
                state: State.NameEnum.submitted,
                created: 20160730,
                form: {
                    title: 'Masterarbeit'
                }
            },
            {
                id: 3,
                state: State.NameEnum.rescinded,
                created: 20160801,
                form: {
                    title: 'Notenanrechnung'
                }
            },
            {
                id: 4,
                state: State.NameEnum.deactivated,
                created: 20160716,
                form: {
                    title: 'Notenänderung'
                }
            },
            {
                id: 5,
                state: State.NameEnum.pending,
                created: 20160525,
                form: {
                    title: 'Anrechnung der Ausbildung'
                }
            },
            {
                id: 6,
                state: State.NameEnum.accepted,
                created: 20160619,
                modified: 20160620,
                form: {
                    title: 'Anrechnung von Studienfächern'
                }
            },
            {
                id: 7,
                state: State.NameEnum.denied,
                created: 20160731,
                modified: 20161220,
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
                        salutation: 'Prof.'
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
                        salutation: 'Prof.'
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
                        salutation: 'Prof.'
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
    getApplicationById(id: number): Observable<Application> {
        return new Observable(observer => {
            /** http getApplicationById(id) => this.currentApplication = result */
            setTimeout(() => {
                this.application.id = id;
                observer.next(this.application);
                observer.complete();
            }, 200);
        });
    }

    getApplications(sort?: string): Observable<any> {
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
    createNewApplication(application: Application): Observable<Application> {
        // hack
        this.formService.getFormById(1).subscribe(form => {
            this.application.form.elements = form.elements;
            this.application.attributes = form.elements;
        });
        // hack end
        this.application = {
            id: 17,
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

    submitApplication(application: Application): Observable<Application> {
        this.alert.setLoading(`submitApplication${application.id}`, 'Submit Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeHint(`submitApplication${application.id}`);
                application.state = State.NameEnum.submitted;
                observer.next(application);
                observer.complete();
            }, 200);
        });
    }

    rescindApplication(application: Application): Observable<Application> {
        this.alert.setLoading(`rescindApplication${application.id}`, 'Rescind Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeHint(`rescindApplication${application.id}`);
                application.state = State.NameEnum.rescinded;
                observer.next(application);
                observer.complete();
            }, 200);
        });
    }

    deactivateApplication(application: Application): Observable<Application> {
        this.alert.setLoading(`deactivateApplication${application.id}`, 'Deactivate Application...');
        return new Observable(observer => {
            setTimeout(() => {
                this.alert.removeHint(`deactivateApplication${application.id}`);
                application.state = State.NameEnum.deactivated;
                observer.next(application);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description Saves the changed application
     * @return {void}
     */
    saveApplication(form): Observable<Application> {
        for (let i = 0, length = this.application.attributes.length; i < length; i++) {
            let element: FormElement = this.application.attributes[i];
            element.value = form[element.name];
        };
        this.alert.setLoading('saveApplication', 'Save Application...')
        return new Observable(observer => {
            setTimeout(() => {
                for (let i = 0, length = this.applications.length; i < length; i++) {
                    let element = this.applications[i];
                    if (element.id === this.application.id) {
                        element.state = State.NameEnum.created;
                    }
                }
                this.alert.removeHint('saveApplication');
                observer.next(this.application);
                observer.complete();
            }, 200);
        });
    }

}
