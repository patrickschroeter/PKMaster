import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

/** Services */
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { ConferenceApi } from './../../../swagger/api/ConferenceApi';

/** Models */
import { ConferenceDto, ConferenceCreateDto, FieldDto } from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';

@Injectable()
export class ConferenceService {

    private conference: ConferenceDto;
    private conferences: ConferenceDto[];

    constructor(
        private conferenceApi: ConferenceApi,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * request the conference by the given id
     * @param {String} id
     */
    @Loading('getConferenceById')
    public getConferenceById(id: string): Observable<ConferenceDto> {
        return this.conferenceApi.getConferenceById(id).map(conference => {
            return this.conference = conference;
        });
    }

    /**
     * request all conferences
     */
    @Loading('getConferences')
    public getConferences(): Observable<ConferenceDto[]> {
        return this.conferenceApi.getConferences().map(conferences => {
            // TODO: sort
            return this.conferences = conferences;
        });
    }

    /**
     * create a new conference with the given values
     * @param {Conference} conference
     */
    @Loading('createNewConference')
    public createNewConference(conference: ConferenceCreateDto): Observable<ConferenceDto> {
        return this.conferenceApi.addConference(conference).map(result => {
            return this.conference = result;
        });
    }

    /**
     * save the given conference
     * @param {Conference} conference
     */
    @Loading('saveConference')
    public saveConference(conference: ConferenceDto): Observable<ConferenceDto> {
        return this.conferenceApi.updateConferenceById(conference.id, conference).map(result => {
            return this.conference = result;
        });
    }

    /**
     * remove the conference with the given id
     * @param {String} conferenceId
     */
    @Loading('removeConference')
    public removeConference(conferenceId: string): Observable<any> {
        return this.conferenceApi.deleteConferenceById(conferenceId).map(result => {
            return result;
        });
    }

    /**
     * create the form for creating/editing conference properties
     * @param {Conference} values
     */
    public getConferenceForm(values?: ConferenceDto): FieldDto[] {
        return [
            {
                fieldType: 'input',
                name: 'description',
                label: 'Conference Description:',
                required: true,
                value: values ? values.description : ''
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
