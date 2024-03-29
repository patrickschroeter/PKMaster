/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

// tslint:disable:max-line-length
import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { FormApiMock } from './FormApi.mock';
import { ConferenceApiMock } from './ConferenceApi.mock';
import { UserApiMock } from './UserApi.mock';

import { ApplicationDetailDto, CommentDto, UserDetailDto, Status } from 'app/swagger';
import { FormApi } from 'app/swagger/api/FormApi';

@Injectable()
export class ApplicationApiMock {

    static COMMENT_PRIVATE: CommentDto = { isPrivate: false, message: 'Testkommentar', created: new Date(), user: new UserDetailDto((<any>{ firstname: 'Mueller'})) };

    static COMMENT_PUBLIC: CommentDto = { isPrivate: true, message: 'privater Testkommentar, der leider etwas länger wurde als anfangs geplant, aber auch nicht gekürzt werden kann, da sonst informationen fehlen', created: new Date(), user: new UserDetailDto((<any>{ firstname: 'Schneider'})) };

    static APPLICATION: ApplicationDetailDto = new ApplicationDetailDto({ id: '1', statusId: Status.CREATED, created: new Date(), form: FormApiMock.FORM, comments: [ApplicationApiMock.COMMENT_PUBLIC, ApplicationApiMock.COMMENT_PRIVATE], user: UserApiMock.USER, filledForm: '{"header01":"Hochschule für Angewandte Wissenschaften Augsburg","firstname":"Franz","lastname":"Bauer"}' } as any);

    private list: ApplicationDetailDto[] = [];

    constructor(private formApi: FormApi) { }

    public getApplicationById(applicationId: string, extraHttpRequestParams?: any): Observable<any> {
        const application = ApplicationApiMock.APPLICATION; application.id = applicationId;
        return new Observable((observer: Observer<any>) => { applicationId ? observer.next(application) : observer.error('error'); observer.complete(); });
    }

    public getApplicationsOfUser(filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<any> {
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
        return new Observable((observer: Observer<any>) => { application.id = applicationId; observer.next(application); observer.complete(); });
    }

    public addCommentToApplication(applicationId: string, comment?: any, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(ApplicationApiMock.APPLICATION); observer.complete(); });
    }
}
