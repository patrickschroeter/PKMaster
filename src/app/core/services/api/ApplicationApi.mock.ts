// tslint:disable:max-line-length

import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { FormApiMock } from './FormApi.mock';
import { ConferenceApiMock } from './ConferenceApi.mock';
import { UserApiMock } from './UserApi.mock';

import { ApplicationDetailDto, CommentDto } from './../../../swagger';
import { FormApi } from './../../../swagger/api/FormApi';

@Injectable()
export class ApplicationApiMock {

    static COMMENT_PRIVATE: CommentDto = { isPrivate: false, message: 'Testkommentar', created: new Date(), user: { lastname: 'Truthy' } };

    static COMMENT_PUBLIC: CommentDto = { isPrivate: true, message: 'privater Testkommentar, der leider etwas länger wurde als anfangs geplant, aber auch nicht gekürzt werden kann, da sonst informationen fehlen', created: new Date(), user: { lastname: 'Falsey' } };

    static APPLICATION: ApplicationDetailDto = { id: '1', status: { name: 'created' }, created: new Date(), form: FormApiMock.FORM, formId: FormApiMock.FORM.id, comments: [ApplicationApiMock.COMMENT_PUBLIC, ApplicationApiMock.COMMENT_PRIVATE], user: UserApiMock.USER, filledForm: '{"header01":"Hochschule für Angewandte Wissenschaften Augsburg","firstname":"Franz","lastname":"Bauer"}' };

    private list: ApplicationDetailDto[] = [];

    constructor(private formApi: FormApi) { }

    public getApplicationById(applicationId: string, extraHttpRequestParams?: any): Observable<any> {
        const application = ApplicationApiMock.APPLICATION; application.id = applicationId;
        return new Observable((observer: Observer<any>) => { applicationId ? observer.next(application) : observer.error('error'); observer.complete(); });
    }

    public getApplications(filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(this.list); observer.complete(); });
    }

    public createApplication(application?: ApplicationDetailDto, extraHttpRequestParams?: any): Observable<any> {
        if (application) {
            application.id = '1';
            this.list.push(application);
        };
        return new Observable((observer: Observer<any>) => { application ? observer.next(application) : observer.error('error'); observer.complete(); });
    }

    public updateApplicationById(applicationId: string, application?: ApplicationDetailDto, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { applicationId === application.id ? observer.next(application) : observer.error('error'); observer.complete(); });
    }

    public addCommentToApplication(applicationId: string, comment?: any, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(ApplicationApiMock.APPLICATION); observer.complete(); });
    }
}
