import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Application } from './../../../swagger';
import { FormApi } from './../../../swagger/api/FormApi';

@Injectable()
export class ApplicationApiMock {

    static APPLICATION: Application = { id: '1', status: 'created', created: new Date(1991, 5, 17), form: { title: 'Titel der Form', id: '1', elements: [{ fieldType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styles: ['small'] }] } };

    private list = [];

    constructor(private formApi: FormApi) { }

    public getApplicationById(applicationId: string, token?: number, extraHttpRequestParams?: any): Observable<any> {
        let application = ApplicationApiMock.APPLICATION; application.id = applicationId;
        return new Observable(observer => { applicationId ? observer.next(application) : observer.error('error'); observer.complete(); });
    }

    public getApplications(token?: number, filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<any> {
        return new Observable(observer => { observer.next(this.list); observer.complete(); });
    }

    public createApplication(token?: number, application?: Application, extraHttpRequestParams?: any): Observable<any> {
        if (application) {
            application.id = '1';
            this.list.push(application);
        };
        return new Observable(observer => { application ? observer.next(application) : observer.error('error'); observer.complete(); });
    }

    public updateApplicationById(applicationId: string, token?: number, application?: Application, extraHttpRequestParams?: any): Observable<any> {
        return new Observable(observer => { applicationId === application.id ? observer.next(application) : observer.error('error'); observer.complete(); });
    }
}
