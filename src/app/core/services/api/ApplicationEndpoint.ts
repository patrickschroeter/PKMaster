import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Application } from './../../../swagger';
import { FormApi } from './../../../swagger/api/FormApi';

@Injectable()
export class ApplicationEndpoint {

    constructor(private formApi: FormApi) { }

    public getApplicationById(applicationId: string, token?: string, extraHttpRequestParams?: any): Observable<any> {
        /** hack */if (!token) { token = localStorage.getItem('authtoken'); }
        console.log('%cMock:' + `%c getApplicationById ${applicationId}`, 'color: #F44336', 'color: #fefefe');
        let application = this._application(applicationId);
        return new Observable(observer => {
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
        let applications = this._applications();
        return new Observable(observer => {
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
        let newapplication = this._applicationAdd(application);
        return new Observable(observer => {
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
        let updatedApplication = this._applicationUpdate(applicationId, application);
        return new Observable(observer => {
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

    /**
     * Mock Server
     */

    // tslint:disable-next-line:member-ordering
    private _list: Application[] = [];

    private _applications(): Application[] {
        return JSON.parse(JSON.stringify(this._list));
    }

    private _applicationAdd(application: Application): Application {
        let id = this._list.length === 0 ? 'Q' : this._list[this._list.length - 1].id + 'Q';
        application.id = id;
        application.created = new Date();
        if (application.form) {
            application.form = this.formApi['_form'](application.form.id);
            if (application.form) {
                application.attributes = application.form.elements;
            }
        }
        this._list.push(application);
        return JSON.parse(JSON.stringify(this._list[this._list.length - 1]));
    }

    private _application(id?: string): Application {
        let result;
        let list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                result = list[i];
            }
        }
        if (!result) { return null; }
        return JSON.parse(JSON.stringify(result));
    }

    private _applicationUpdate(id: string, application: Application) {
        let list = this._list;
        for (let i = 0, length = list.length; i < length; i++) {
            if (list[i].id === id) {
                list[i] = application;
                return JSON.parse(JSON.stringify(list[i]));
            }
        }
        return null;
    }
}
