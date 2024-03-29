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
// tslint:disable:no-unused-variable
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { ConferenceDetailDto } from 'app/swagger';

import { ApplicationApiMock } from './';

@Injectable()
export class ConferenceApiMock {

    static CONFERENCE: ConferenceDetailDto = new ConferenceDetailDto({ id: '1', description: 'Abschlusssitzung Winter 2016/2017', dateOfEvent: new Date(), startOfEvent: '12.30', endOfEvent: '14.00', roomOfEvent: 'M3.09', numberOfConference: 111, config: [{ 'title': 'Feststellung der Beschlussfähigkeit und Genehmigung der Niederschrift', 'description': 'Die Prüfungskommission ist beschlussfähig, da alle stimmberechtigten Mitglieder anwesend sind.\nDie Niederschrift der 110. Sitzung wird einstimmig genehmigt.' }, { 'title': 'Leistungsnachweise', 'type': 'config', 'entries': [{ 'title': 'Notennachmeldungen', 'footer': 'Diese Entscheidung wurde vom PK-Vorsitzenden am 30. 9. 2016 gemäß RaPO § 3 Abs. 4 vorab getroffen.\nDas Prüfungsamt und die Kommissionsmitglieder wurden am selben Tag über diese Entscheidung informiert.', 'type': 'application', 'formId': '1', 'fields': ['firstname', 'lastname'] }, { 'title': 'Notenänderung', 'type': 'application', 'formId': '1', 'fields': ['firstname'] }, { 'title': 'Notenanerkennungen und Nachqualifikation', 'type': 'application', 'formId': '1', 'fields': ['lastname'] }, { 'title': 'Verlängerung der Wiederholungsfrist', 'description': 'Für folgende Studierende wird die Frist für die Wiederholungsprüfung um ein Semester verlängert:', 'type': 'application', 'formId': '1', 'fields': ['lastname', 'firstname'] }, { 'title': 'Verlängerung der Frist zur Nachqualifikation', 'type': 'application', 'formId': '1', 'fields': ['firstname'] }] }, { 'title': 'Abschlussarbeiten', 'type': 'config', 'entries': [{ 'title': 'Verlängerung der Abgabefrist der Abschlussarbeit', 'description': 'Folgende Anträge auf Verlängerung der Abgabefrist der Abschlussarbeit werden gewährt. Die Betreuer\nhaben jeweils zugestimmt.', 'type': 'application', 'formId': '1', 'fields': ['lastname'] }, { 'title': 'Änderung des Titels der Abschlussarbeit Name', 'footer': 'Die Betreuer haben jeweils zugestimmt.', 'type': 'application', 'formId': '1', 'fields': ['lastname'] }, { 'title': 'Rücknahme der Anmeldung der Abschlussarbeit', 'description': 'Folgende Studierende ziehen die Anmeldung ihrer Abschlussarbeit zurück:', 'footer': 'Diese Entscheidung wurde vom PK-Vorsitzenden am 16. 9. 2016 gemäß RaPO § 3 Abs. 4 vorab getroffen.\nDas Prüfungsamt und die Kommissionsmitglieder wurden am selben Tag über diese Entscheidung informiert.', 'type': 'application', 'formId': '2', 'fields': ['matnr', 'header02'] }, { 'title': 'Abschlussarbeitsnoten', 'type': 'application', 'formId': '1', 'fields': ['lastname', 'firstname'] }] }, { 'title': 'Praxissemester', 'type': 'application', 'formId': '2', 'fields': ['matnr', 'Studiengang', 'info', 'erstpruefer'] }, { 'title': 'Eignungsprüfung', 'type': 'application', 'formId': '2', 'fields': ['matnr', 'info', 'zweitpruefer'] }, { 'title': 'Sonstiges', 'type': 'config', 'entries': [{ 'title': 'Neue Fächer', 'type': 'list', 'entries': [['Interaktive Mediensysteme (Nachqualifikation)'], ['Workshop Design, (englisch: Workshop Design), nq.design, 2,5 CP, 2 SWS 6.2']] }, { 'title': 'Termine', 'type': 'list', 'entries': [['24. 11. 2016, 14:00 – 16:00', 'J4.13', 'PK- und Studienganssitzung'], ['22. 12. 2016, 14:00 – 16:00', 'J4.13', 'PK- und Studienganssitzung']] }] }] } as any);

    private list: ConferenceDetailDto[] = [];

    constructor() { }

    public addApplicationToConference(conferenceId: string, applicationId: string, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable((observer: Observer<any>) => { observer.next({ id: conferenceId }); });
    }

    public addConference(conference?: any, extraHttpRequestParams?: any): Observable<any> {
        conference.id = 'anyid';
        return new Observable((observer: Observer<any>) => { observer.next(conference); });
    }

    public deleteApplicationOfConference(conferenceId: string, applicationId: string, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable((observer: Observer<any>) => { observer.next({ id: conferenceId }); });
    }

    public deleteConferenceById(conferenceId: string, extraHttpRequestParams?: any): Observable<{}> {
        return new Observable((observer: Observer<any>) => { observer.next({ id: conferenceId }); });
    }

    public getApplicationsByConference(conferenceId: string, extraHttpRequestParams?: any): Observable<Array<any>> {
        return new Observable((observer: Observer<any>) => { observer.next({ id: conferenceId }); });
    }

    public getConferenceById(conferenceId: string, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next({ id: conferenceId }); });
    }

    public getConferences(filter?: string, sort?: string, extraHttpRequestParams?: any): Observable<Array<any>> {
        return new Observable((observer: Observer<any>) => { observer.next([{ id: 'id' }]); });
    }

    public updateConferenceById(conferenceId: string, conference?: any, extraHttpRequestParams?: any): Observable<any> {
        return new Observable((observer: Observer<any>) => { observer.next(conference); });
    }

}
