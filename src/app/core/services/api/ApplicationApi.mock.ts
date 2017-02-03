// tslint:disable:max-line-length

import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { FormApiMock } from './FormApi.mock';
import { ConferenceApiMock } from './ConferenceApi.mock';
import { UserApiMock } from './UserApi.mock';

import { Application, Comment } from './../../../swagger';
import { FormApi } from './../../../swagger/api/FormApi';

@Injectable()
export class ApplicationApiMock {

    static COMMENT_PRIVATE: Comment = { isPrivate: false, message: 'Testkommentar', created: new Date(), user: { lastname: 'Truthy' } };

    static COMMENT_PUBLIC: Comment = { isPrivate: true, message: 'privater Testkommentar, der leider etwas länger wurde als anfangs geplant, aber auch nicht gekürzt werden kann, da sonst informationen fehlen', created: new Date(), user: { lastname: 'Falsey' } };

    static APPLICATION: Application = { id: '1', status: { name: 'created' }, created: new Date(), form: FormApiMock.FORM, formId: FormApiMock.FORM.id, comments: [ApplicationApiMock.COMMENT_PUBLIC, ApplicationApiMock.COMMENT_PRIVATE], user: UserApiMock.USER, filledForm: '{"header01":"Hochschule für Angewandte Wissenschaften Augsburg","firstname":"Franz","lastname":"Bauer"}' };

    private list: Application[] = [];

    constructor(private formApi: FormApi) { }

    public getApplicationById(applicationId: string, token?: number, extraHttpRequestParams?: any): Observable<any> {
        const application = ApplicationApiMock.APPLICATION; application.id = applicationId;
        return new Observable((observer: Observer<any>) => { applicationId ? observer.next(application) : observer.error('error'); observer.complete(); });
    }

    public getApplications(token?: number, filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(this.list); observer.complete(); });
    }

    public createApplication(token?: number, application?: Application, extraHttpRequestParams?: any): Observable<any> {
        if (application) {
            application.id = '1';
            this.list.push(application);
        };
        return new Observable((observer: Observer<any>) => { application ? observer.next(application) : observer.error('error'); observer.complete(); });
    }

    public updateApplicationById(applicationId: string, token?: number, application?: Application, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { applicationId === application.id ? observer.next(application) : observer.error('error'); observer.complete(); });
    }

    public addCommentToApplication(applicationId: string, token?: number, comment?: any, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(ApplicationApiMock.APPLICATION); observer.complete(); });
    }
}
