// tslint:disable:max-line-length

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { FormApiMock } from './FormApi.mock';

import { Application, Comment } from './../../../swagger';
import { FormApi } from './../../../swagger/api/FormApi';

@Injectable()
export class ApplicationApiMock {

    static COMMENT_PRIVATE: Comment = { isPrivate: false, message: 'Testkommentar', created: new Date(2016, 5, 17), user: { lastname: 'Truthy'} };

    static COMMENT_PUBLIC: Comment = { isPrivate: true, message: 'privater Testkommentar, der leider etwas länger wurde als anfangs geplant, aber auch nicht gekürzt werden kann, da sonst informationen fehlen', created: new Date(2016, 5, 16), user: { lastname: 'Falsey'} };

    static APPLICATION: Application = { id: '1', status: { name: 'created'}, created: new Date(1991, 5, 17), form: FormApiMock.FORM, attributes: FormApiMock.FORM.elements, comments: [ ApplicationApiMock.COMMENT_PUBLIC, ApplicationApiMock.COMMENT_PRIVATE ] };

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
