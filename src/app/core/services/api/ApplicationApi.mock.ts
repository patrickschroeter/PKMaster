import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Application } from './../../../swagger';
import { FormApi } from './../../../swagger/api/FormApi';

@Injectable()
export class ApplicationApiMock {

    static APPLICATION: Application = { id: '1', status: 'created', created: new Date(1991, 5, 17), form: { title: 'Titel der Form', id: 13, elements: [ { fieldType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styles: ['small'] }]}};

    constructor(private formApi: FormApi) { }

    public getApplicationById (applicationId: string, token?: number, extraHttpRequestParams?: any ) : Observable<any> {
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

    public getApplications (token?: number, filter?: string, sort?: string, extraHttpRequestParams?: any ) : Observable<any> {
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

    public createApplication (token?: number, application?: Application, extraHttpRequestParams?: any ) : Observable<any> {
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

    public updateApplicationById (applicationId: string, token?: number, application?: Application, extraHttpRequestParams?: any ) : Observable<any> {
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

    private _list: Application[] = [
        {
            id: '17',
            created: new Date(2016, 6, 4),
            status: { name: 'denied' },
            form: {
                title: 'Bachelorarbeit',
                elements: []
            },
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
        }
    ];

    private _applications(): Application[] {
        this._list = [];
        return JSON.parse(JSON.stringify(this._list));
    }

    private _applicationAdd(application: Application): Application {
        let id = this._list.length === 0 ? 'Q' : this._list[this._list.length - 1].id + 'Q';
        application.id = id;
        application.created = new Date();
        application.form = this.formApi._form(application.form.id);
        application.attributes = application.form.elements;
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
