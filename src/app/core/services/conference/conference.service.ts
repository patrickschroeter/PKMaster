import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';

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
    ApplicationDetailDto,
    AttendantCreateDto,

} from './../../../swagger';

/** Decorators */
import { Loading } from './../../../shared/decorators/loading.decorator';

/**
 * A Service taking care of the Conference
 *
 * @export
 * @class ConferenceService
 */
@Injectable()
export class ConferenceService {

    /**
     * The current conference
     *
     * @private
     * @type {ConferenceDetailDto}
     * @memberOf ConferenceService
     */
    private conference: ConferenceDetailDto;

    /**
     * A list of all conferences
     *
     * @private
     * @type {ConferenceDetailDto[]}
     * @memberOf ConferenceService
     */
    private conferences: ConferenceDetailDto[];

    /**
     * Creates an instance of ConferenceService.
     * @param {ConferenceApi} conferenceApi
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf ConferenceService
     */
    constructor(
        private conferenceApi: ConferenceApi,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * request the conference by the given id
     *
     * @param {string} id
     * @returns {Observable<ConferenceDetailDto>}
     *
     * @memberOf ConferenceService
     */
    @Loading('getConferenceById')
    public getConferenceById(id: string): Observable<ConferenceDetailDto> {
        return this.conferenceApi.getConferenceById(id).map(conference => {
            if (!conference.members) { conference.members = []; }
            if (!conference.guests) { conference.guests = []; }
            return this.conference = conference;
        });
    }

    /**
     * request all conferences
     *
     * @returns {Observable<ConferenceDetailDto[]>}
     *
     * @memberOf ConferenceService
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
     *
     * @param {ConferenceCreateDto} conference
     * @returns {Observable<ConferenceDetailDto>}
     *
     * @memberOf ConferenceService
     */
    @Loading('createNewConference')
    public createNewConference(conference: ConferenceCreateDto): Observable<ConferenceDetailDto> {
        return this.conferenceApi.addConference(conference).map(result => {
            return this.conference = result;
        });
    }

    /**
     * save the given conference
     *
     * @param {ConferenceDetailDto} conference
     * @returns {Observable<ConferenceDetailDto>}
     *
     * @memberOf ConferenceService
     */
    @Loading('saveConference')
    public saveConference(conference: ConferenceDetailDto): Observable<ConferenceDetailDto> {
        const param: ConferenceCreateDto = new ConferenceCreateDto(conference);
        console.log(param);
        console.log(conference);

        return this.conferenceApi.updateConferenceById(conference.id, param).map((result: ConferenceDetailDto) => {
            return this.conference = result;
        });
    }

    /**
     * remove the conference with the given id
     *
     * @param {string} conferenceId
     * @returns {Observable<any>}
     *
     * @memberOf ConferenceService
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

    /**
     * assign a user from the conference
     *
     * @param {ConferenceDetailDto} conference
     * @param {AttendantCreateDto} [attendant]
     * @param {*} [extraHttpRequestParams]
     * @returns {Observable<AttendantCreateDto[]>}
     *
     * @memberOf ConferenceService
     */
    public assignAttendantToConference(
        conference: ConferenceDetailDto,
        attendant?: AttendantCreateDto,
        extraHttpRequestParams?: any
    ): Observable<ConferenceDetailDto> {
        const conferenceId = conference.id;
        this.conference = conference;
        // tslint:disable-next-line:max-line-length
        return this.conferenceApi.addAttendantToConference(conferenceId, attendant, extraHttpRequestParams).map((result: ConferenceDetailDto) => {
            this.conference = result;
            return result;
        });
    }

    /**
     * Unassign an attendant from the conference
     *
     * @param {ConferenceDetailDto} conference
     * @param {AttendantCreateDto} [attendant]
     * @param {*} [extraHttpRequestParams]
     * @returns {Observable<string>}
     *
     * @memberOf ConferenceService
     */
    public removeAttendantFromConference(
        conference: ConferenceDetailDto,
        attendant?: AttendantCreateDto,
        extraHttpRequestParams?: any
    ): Observable<string> {
        const conferenceId = conference.id;
        const userId = attendant.userId;
        this.conference = conference;
        return this.conferenceApi.removeAttendantFormConference(conferenceId, userId, extraHttpRequestParams).map(result => {
            if (attendant.typeOfAttendance === AttendantCreateDto.TypeOfAttendanceEnum.Guest) {
                const index = _.findIndex(this.conference.guests, obj => obj.id === userId);
                if (index !== -1) {
                    this.conference.guests.splice(index, 1);
                }
            } else if (attendant.typeOfAttendance === AttendantCreateDto.TypeOfAttendanceEnum.Member) {
                const index = _.findIndex(this.conference.members, obj => obj.id === userId);
                if (index !== -1) {
                    this.conference.members.splice(index, 1);
                }
            }
            return result;
        });
    }

    /**
     * add application to conference
     *
     * @param {ConferenceDetailDto} conference
     * @param {ApplicationListDto} application
     * @param {*} [extraHttpRequestParams]
     * @returns {Observable<string>}
     *
     * @memberOf ConferenceService
     */
    public addApplicationToConference(
        application: ApplicationDetailDto,
        conferenceId: string,
        extraHttpRequestParams?: any
    ): Observable<ConferenceDetailDto> {
        const applicationId = application.id;
        return this.conferenceApi.addApplicationToConference(
            conferenceId,
            applicationId,
            extraHttpRequestParams
        ).map((result: ConferenceDetailDto) => {
            this.conference = result;
            return result;
        });
    }

    /**
     * remove application from conference
     *
     * @param {ConferenceDetailDto} conference
     * @param {ApplicationListDto} application
     * @param {*} [extraHttpRequestParams]
     * @returns {Observable<string>}
     *
     * @memberOf ConferenceService
     */
    public deleteApplicationOfConference(
        conference: ConferenceDetailDto,
        application: ApplicationListDto,
        extraHttpRequestParams?: any
    ): Observable<string> {
        const conferenceId = conference.id;
        const applicationId = application.id;
        this.conference = conference;
        return this.conferenceApi.deleteApplicationOfConference(conferenceId, applicationId, extraHttpRequestParams).map(result => {
            const index = _.findIndex(this.conference.applications, obj => obj.id === application.id);
            if (index !== -1) {
                this.conference.applications.splice(index, 1);
            }
            application.conference = null;
            return result;
        });
    }

    /**
     * create the form for creating/editing conference properties
     *
     * @param {ConferenceDetailDto} [values]
     * @returns {FieldDto[]}
     *
     * @memberOf ConferenceService
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
                styleIds: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'startOfEvent',
                label: 'Beginn',
                required: true,
                value: (values && values.startOfEvent) ? values.startOfEvent.toString() : '',
                styleIds: [
                    'small'
                ],
                validationIds: [
                    'time'
                ]
            },
            {
                fieldType: 'input',
                name: 'endOfEvent',
                label: 'Ende',
                required: true,
                value: (values && values.endOfEvent) ? values.endOfEvent.toString() : '',
                styleIds: [
                    'small'
                ],
                validationIds: [
                    'time'
                ]
            },
            {
                fieldType: 'input',
                name: 'roomOfEvent',
                label: 'Raum',
                required: true,
                value: values ? values.roomOfEvent : '',
                styleIds: [
                    'small'
                ]
            }
        ];
    }

}
