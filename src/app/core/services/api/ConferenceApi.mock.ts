// tslint:disable:max-line-length
// tslint:disable:no-unused-variable

import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { Conference } from './../../../swagger';

import { ApplicationApiMock } from './';

@Injectable()
export class ConferenceApiMock {

    static CONFERENCE: Conference = { id: '1', description: 'Abschlusssitzung Winter 2016/2017', dateOfEvent: new Date(), startOfEvent: '12.30', endOfEvent: '14.00', roomOfEvent: 'M3.09', applications: [], numberOfConference: 111, config: [{ 'title': 'Feststellung der Beschlussfähigkeit und Genehmigung der Niederschrift', 'description': 'Die Prüfungskommission ist beschlussfähig, da alle stimmberechtigten Mitglieder anwesend sind.\nDie Niederschrift der 110. Sitzung wird einstimmig genehmigt.' }, { 'title': 'Leistungsnachweise', 'type': 'config', 'entries': [{ 'title': 'Notennachmeldungen', 'footer': 'Diese Entscheidung wurde vom PK-Vorsitzenden am 30. 9. 2016 gemäß RaPO § 3 Abs. 4 vorab getroffen.\nDas Prüfungsamt und die Kommissionsmitglieder wurden am selben Tag über diese Entscheidung informiert.', 'type': 'application', 'formId': '1' }, { 'title': 'Notenänderung', 'type': 'application', 'formId': '1' }, { 'title': 'Notenanerkennungen und Nachqualifikation', 'type': 'application', 'formId': '1' }, { 'title': 'Verlängerung der Wiederholungsfrist', 'description': 'Für folgende Studierende wird die Frist für die Wiederholungsprüfung um ein Semester verlängert:', 'type': 'application', 'formId': '1' }, { 'title': 'Verlängerung der Frist zur Nachqualifikation', 'type': 'application', 'formId': '1' }] }, { 'title': 'Abschlussarbeiten', 'type': 'config', 'entries': [{ 'title': 'Verlängerung der Abgabefrist der Abschlussarbeit', 'description': 'Folgende Anträge auf Verlängerung der Abgabefrist der Abschlussarbeit werden gewährt. Die Betreuer\nhaben jeweils zugestimmt.', 'type': 'application', 'formId': '1' }, { 'title': 'Änderung des Titels der Abschlussarbeit Name', 'footer': 'Die Betreuer haben jeweils zugestimmt.', 'type': 'application', 'formId': '1' }, { 'title': 'Rücknahme der Anmeldung der Abschlussarbeit', 'description': 'Folgende Studierende ziehen die Anmeldung ihrer Abschlussarbeit zurück:', 'footer': 'Diese Entscheidung wurde vom PK-Vorsitzenden am 16. 9. 2016 gemäß RaPO § 3 Abs. 4 vorab getroffen.\nDas Prüfungsamt und die Kommissionsmitglieder wurden am selben Tag über diese Entscheidung informiert.', 'type': 'application', 'formId': '2' }, { 'title': 'Abschlussarbeitsnoten', 'type': 'application', 'formId': '1' }] }, { 'title': 'Praxissemester', 'type': 'application', 'formId': '2' }, { 'title': 'Eignungsprüfung', 'type': 'application', 'formId': '2' }, { 'title': 'Sonstiges', 'type': 'config', 'entries': [{ 'title': 'Neue Fächer', 'type': 'list', 'entries': [['Interaktive Mediensysteme (Nachqualifikation)'], ['Workshop Design, (englisch: Workshop Design), nq.design, 2,5 CP, 2 SWS 6.2']] }, { 'title': 'Termine', 'type': 'list', 'entries': [['24. 11. 2016, 14:00 – 16:00', 'J4.13', 'PK- und Studienganssitzung'], ['22. 12. 2016, 14:00 – 16:00', 'J4.13', 'PK- und Studienganssitzung']] }] }] };

    private list: Conference[] = [];

    constructor() { }

    public addApplicationToConference(conferenceId: string, applicationId: string, token?: number, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public addConference(token?: number, conference?: any, extraHttpRequestParams?: any): Observable<any> {
        return new Observable(observer => { observer.next(conference); });
    }

    public deleteApplicationOfConference(conferenceId: string, applicationId: string, token?: number, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public deleteConferenceById(conferenceId: string, token?: number, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public getApplicationsByConference(conferenceId: string, token?: number, extraHttpRequestParams?: any): Observable<Array<any>> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public getConferenceById(conferenceId: string, token?: number, extraHttpRequestParams?: any): Observable<any> {
        return new Observable(observer => { observer.next({ id: conferenceId }); });
    }

    public getConferences(token?: number, filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<Array<any>> {
        return new Observable(observer => { observer.next([{ id: 'id' }]); });
    }

    public updateConferenceById(conferenceId: string, token?: number, conference?: any, extraHttpRequestParams?: any): Observable<any> {
        return new Observable(observer => { observer.next(conference); });
    }

}
