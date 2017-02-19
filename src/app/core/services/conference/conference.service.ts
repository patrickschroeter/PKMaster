import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

/** Services */
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';
import { ConferenceApi } from './../../../swagger/api/ConferenceApi';

/** Models */
import {
    ConferenceDetailDto,
    ConferenceCreateDto,
    FieldDto,
    ApplicationListDto,
    ApplicationDetailDto
} from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';

@Injectable()
export class ConferenceService {

    private conference: ConferenceDetailDto;
    private conferences: ConferenceDetailDto[];

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
    public getConferenceById(id: string): Observable<ConferenceDetailDto> {
        return this.conferenceApi.getConferenceById(id).map(conference => {
            if (!conference.attendants) { conference.attendants = []; }
            return this.conference = conference;
        });
    }

    /**
     * request all conferences
     */
    @Loading('getConferences')
    public getConferences(): Observable<ConferenceDetailDto[]> {
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
    public createNewConference(conference: ConferenceCreateDto): Observable<ConferenceDetailDto> {
        return this.conferenceApi.addConference(conference).map(result => {
            return this.conference = result;
        });
    }

    /**
     * save the given conference
     * @param {Conference} conference
     */
    @Loading('saveConference')
    public saveConference(conference: ConferenceDetailDto): Observable<ConferenceDetailDto> {
        const param: ConferenceCreateDto = new ConferenceCreateDto(conference);
        return this.conferenceApi.updateConferenceById(conference.id, param).map((result: ConferenceDetailDto) => {
            return this.conference = result;
        });
    }

    /**
     * remove the conference with the given id
     * @param {String} conferenceId
     */
    @Loading('removeConference')
    public removeConference(conferenceId: string): Observable<any> {
        return this.conferenceApi.deleteConferenceById(conferenceId).map((result: any) => {
            return result;
        });
    }

    /**
     * Get all Applications of the Conference with ID
     *
     * @param {string} conferenceId
     * @param {*} [extraHttpRequestParams]
     * @returns {Observable<ApplicationDetailDto[]>}
     *
     * @memberOf ConferenceService
     */
    public getApplicationsByConference(conferenceId: string, extraHttpRequestParams?: any): Observable<ApplicationDetailDto[]> {
        return this.conferenceApi.getApplicationsByConference(conferenceId, extraHttpRequestParams)
            .map((result: ApplicationDetailDto[]) => {
                return result;
            });
    }

    public assignUserToApplication (conferenceId: string, attendantCreateDto?: models.AttendantCreateDto, extraHttpRequestParams?: any ) : Observable<CommentDetailDto[]> {
        // TODO
    }

    public removeAssignmentFromApplication (conferenceId: string, userId: string, extraHttpRequestParams?: any ) : Observable<any> {
        // TODO
    }

    /**
     * create the form for creating/editing conference properties
     * @param {Conference} values
     */
    public getConferenceForm(values?: ConferenceDetailDto): FieldDto[] {
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
                name: 'numberOfConference',
                contentType: 'number',
                label: 'Number of Conference:',
                required: true,
                value: (values && values.numberOfConference) ? values.numberOfConference.toString() : ''
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
