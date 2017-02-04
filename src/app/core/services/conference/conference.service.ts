import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

/** Services */
import { AlertService } from './../../../modules/alert';
import { ConferenceApi } from './../../../swagger/api/ConferenceApi';

/** Models */
import { Conference, Field } from './../../../swagger';

@Injectable()
export class ConferenceService {

    static DEFAULT_TOKEN = 17;

    private conference: Conference;
    private conferences: Conference[];

    constructor(
        private conferenceApi: ConferenceApi,
        private alert: AlertService
    ) { }

    /**
     * request the conference by the given id
     * @param {String} id
     */
    public getConferenceById(id: string): Observable<Conference> {
        return this.conferenceApi.getConferenceById(id).map(conference => {
            return this.conference = conference;
        });
    }

    /**
     * request all conferences
     */
    public getConferences(): Observable<Conference[]> {
        return this.conferenceApi.getConferences().map(conferences => {
            // TODO: sort
            return this.conferences = conferences;
        });
    }

    /**
     * create a new conference with the given values
     * @param {Conference} conference
     */
    public createNewConference(conference: Conference): Observable<Conference> {
        return this.conferenceApi.addConference(ConferenceService.DEFAULT_TOKEN, conference).map(result => {
            return this.conference = result;
        });
    }

    /**
     * save the given conference
     * @param {Conference} conference
     */
    public saveConference(conference: Conference): Observable<Conference> {
        return this.conferenceApi.updateConferenceById(conference.id, ConferenceService.DEFAULT_TOKEN, conference).map(result => {
            return this.conference = result;
        });
    }

    /**
     * remove the conference with the given id
     * @param {String} conferenceId
     */
    public removeConference(conferenceId: string): Observable<any> {
        return this.conferenceApi.deleteConferenceById(conferenceId).map(result => {
            return result;
        });
    }

    /**
     * create the form for creating/editing conference properties
     * @param {Conference} values
     */
    public getConferenceForm(values?: Conference): Field[] {
        return [
            {
                fieldType: 'input',
                name: 'description',
                label: 'Conference Description:',
                required: true,
                value: values ? values.description : '',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'dateOfEvent',
                contentType: 'date',
                label: 'Datum',
                required: true,
                value: (values && values.dateOfEvent) ? values.dateOfEvent.toString() : '',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'startOfEvent',
                contentType: 'string',
                label: 'Beginn',
                required: true,
                value: (values && values.startOfEvent) ? values.startOfEvent.toString() : '',
                styles: [
                    'small'
                ],
                validations: [
                    'time'
                ]
            },
            {
                fieldType: 'input',
                name: 'endOfEvent',
                contentType: 'string',
                label: 'Ende',
                required: true,
                value: (values && values.endOfEvent) ? values.endOfEvent.toString() : '',
                styles: [
                    'small'
                ],
                validations: [
                    'time'
                ]
            },
            {
                fieldType: 'input',
                name: 'roomOfEvent',
                contentType: 'string',
                label: 'Raum',
                required: true,
                value: values ? values.roomOfEvent : '',
                styles: [
                    'small'
                ]
            }
        ];
    }

}
