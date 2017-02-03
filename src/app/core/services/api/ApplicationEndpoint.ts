import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Observable, Observer } from 'rxjs/Rx';

import { ApplicationApiMock } from './';

import { Application } from './../../../swagger';
import { FormApi } from './../../../swagger/api/FormApi';
import { ConferenceApi } from './../../../swagger/api/ConferenceApi';
import { UserApi } from './../../../swagger/api/UserApi';

@Injectable()
export class ApplicationEndpoint {

    constructor(private formApi: FormApi, private conferenceApi: ConferenceApi, private userApi: UserApi) { }

    public getApplicationById(applicationId: string, token?: string, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + `%c getApplicationById ${applicationId}`, 'color: #F44336', 'color: #fefefe');
        const application = this._application(applicationId);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (application) {
                    observer.next(application);
                } else {
                    console.error(`No Application with ID ${applicationId} found`);
                    observer.error(`No Application with ID ${applicationId} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    public getApplications(token?: string, filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + '%c getApplications', 'color: #F44336', 'color: #fefefe');
        const applications = this._applications();
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (applications) {
                    observer.next(applications);
                } else {
                    console.error('No Applications found');
                    observer.error('No Applications found');
                }
                observer.complete();
            }, 500);
        });
    }

    public createApplication(token?: string, application?: Application, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + '%c createApplication', 'color: #F44336', 'color: #fefefe');

        if (application.userId) {
            application.user = this.userApi['_user'](application.userId);
        }

        const newapplication = this._applicationAdd(application);
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (newapplication) {
                    observer.next(newapplication);
                } else {
                    console.error('No Applications created');
                    observer.error('No Applications created');
                }
                observer.complete();
            }, 500);
        });
    }

    public updateApplicationById(applicationId: string, token?: string,
        application?: Application, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + `%c updateApplicationById ${applicationId}`, 'color: #F44336', 'color: #fefefe');

        if (application.conferenceId && !application.conference) {
            application.conference = this.conferenceApi['_addApplication'](application.conferenceId, application);
        }

        const updatedApplication = this._applicationUpdate(applicationId, application);

        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (!token) {
                    console.error(`No Token!`);
                    observer.error(`No Token!`);
                } else if (application) {
                    observer.next(updatedApplication);
                } else {
                    console.error(`No Application with ID ${applicationId} found`);
                    observer.error(`No Application with ID ${applicationId} found`);
                }
                observer.complete();
            }, 500);
        });
    }


    public addCommentToApplication(applicationId: string, token?: number, comment?: Comment, extraHttpRequestParams?: any):
        Observable<Comment> {
        const application = this._application(applicationId);
        application.comments ? application.comments.push(comment) : application.comments = [comment];
        return new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                if (application) {
                    observer.next(comment);
                } else {
                    console.error(`No Application with ID ${applicationId} found`);
                    observer.error(`No Application with ID ${applicationId} found`);
                }
                observer.complete();
            }, 500);
        });
    }

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: Application[] = [
        ApplicationApiMock.APPLICATION
    ];

    private _applications(): Application[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _applicationAdd(application: Application): Application {
        const id = this._list.length === 0 ? 'Q' : this._list[this._list.length - 1].id + 'Q';
        application.id = id;
        application.created = new Date();
        if (application.formId) {
            application.form = this.formApi['_form'](application.formId);
        }
        this._list.push(application);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _application(id?: string): Application {
        let result: Application;
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _applicationUpdate(id: string, application: Application) {
        const list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = application;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }
}
