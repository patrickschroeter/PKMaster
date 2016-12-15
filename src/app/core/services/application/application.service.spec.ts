/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { ApplicationService } from './application.service';

import {
    FormService,
    FormMock,
} from './../form';

import { AlertService, AlertMock } from './../../../modules/alert';

import { ApplicationMock } from './';
import { Status, ApplicationApi, FormApi, Application } from './../../../swagger';
import { ApplicationApiMock, FormApiMock } from './..';

describe('Service: Application', () => {
    beforeEach(() => {
        localStorage.setItem('authtoken', 'spectoken');
        TestBed.configureTestingModule({
            providers: [
                ApplicationService,

                { provide: FormService, useClass: FormMock },
                { provide: AlertService, useClass: AlertMock },
                { provide: ApplicationApi, useClass: ApplicationApiMock },
                { provide: FormApi, useClass: FormApiMock },
            ]
        });
    });

    it('should ...', inject([ApplicationService], (service: ApplicationService) => {
        expect(service).toBeTruthy();
    }));

    describe('createNewApplication', () => {
        it('should provide the new created application',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
                let element;
                service.createNewApplication({ form: { id: '1' }}).subscribe(result => { element = result; });
                tick(25);
                expect(element).toBeDefined();
                expect(element.id).toBeDefined();
            }))
        );
        xit('should throw an error if the user has not the right to create that kind of application',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        xit('should throw an error if the application could not be created',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
    });

    describe('getApplicationById', () => {
        let element, service: ApplicationService;

        beforeEach(fakeAsync(inject([ApplicationService], (applicationService: ApplicationService) => {
            service = applicationService;
            service.createNewApplication({ form: { id: '1' }}).subscribe(result => { element = result; });
            tick(25);
        })));

        it('should provide the application with the given id',
            fakeAsync(() => {
                let application;
                service.getApplicationById(element.id).subscribe(result => { application = result; });
                tick(25);
                expect(application).toBeDefined()
                expect(application.id).toBe(element.id);
            })
        );
        it('should throw an error if no application with id exists',
            fakeAsync(() => {
                let response;
                service.getApplicationById(null).subscribe(() => {
                    response = 'success';
                }, () => {
                    response = 'error';
                });
                tick(25);
                expect(response).toBeDefined();
                expect(response).toBe('error');
            })
        );
        xit('should throw an error if the user has not the rights to read the application',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
    });

    describe('getApplications', () => {
        let element, service: ApplicationService;

        beforeEach(fakeAsync(inject([ApplicationService], (applicationService: ApplicationService) => {
            service = applicationService;
        })));

        it('should provide an empty array if there are no applications',
            fakeAsync(() => {
                let elements;
                service.getApplications().subscribe(result => { elements = result; });
                tick(25);
                expect(elements).toBeDefined();
                expect(elements.length).toEqual(0);
            })
        );

        describe('(with data)', () => {
            beforeEach(fakeAsync(() => {
                service.createNewApplication({ form: { id: '1' }, version: 2}).subscribe(result => { });
                tick(25);
                service.createNewApplication({ form: { id: '2' }, version: 3}).subscribe(result => { });
                tick(25);
                service.createNewApplication({ form: { id: '3' }, version: 1}).subscribe(result => { element = result; });
                tick(25);
            }));

            it('should provide a list of all applications',
                fakeAsync(() => {
                    let elements;
                    service.getApplications().subscribe(result => { elements = result; });
                tick(25);
                    expect(elements).toBeDefined();
                    expect(elements.length).toEqual(3);
                    expect(elements[2].id).toEqual(element.id);
                })
            );

        });
    });

    describe('submitApplication', () => {
        it('should update the status to <submit> if the operation is allowed',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        it('should throw an error if the operation is not allowed',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        it('should alert an error if the operation is not allowed',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
    });

    describe('rescindApplication', () => {
        it('should update the status to <rescinded> if the operation is allowed',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        it('should throw an error if the operation is not allowed',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        it('should alert an error if the operation is not allowed',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
    });

    describe('deactivateApplication', () => {
        it('should update the status to <deactivated> if the operation is allowed',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        it('should throw an error if the operation is not allowed',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        it('should alert an error if the operation is not allowed',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
    });

    describe('saveApplication', () => {
        it('should update the application with the given form-values',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        it('should throw an error if the user has no rights to change the application',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        it('should throw an error if the application does not exist',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
    });
});
