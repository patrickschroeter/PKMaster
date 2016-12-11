/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { ApplicationService } from './application.service';

import {
    FormService,
    FormMock,
} from './../form';

import { AlertService, AlertMock } from './../alert';

import { ApplicationMock } from './';
import { Status, ApplicationApi, FormApi } from './../../../swagger';
import { ApplicationApiMock, FormApiMock } from './..';

describe('Service: Application', () => {
    beforeEach(() => {
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

    it('should return the application with the given id', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
        let element;
        service.getApplicationById(123546).subscribe(result => {
            element = result;
        });
        expect(element).toBeUndefined();

        tick(1000);

        expect(element).toBeDefined();
    })));

    it('should return all available applications', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
        let elements;
        service.getApplications('id').subscribe(result => {
            elements = result;
        });
        expect(elements).toBeUndefined();

        tick(1000);

        expect(elements).toBeDefined();
    })));

    it('should create a new application with the given information', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
        let element, id = 123456;
        service.createNewApplication({}).subscribe(result => {
            element = result;
        });
        expect(element).toBeUndefined();

        tick(1000);

        expect(element).toBeDefined();
        expect(element.id).toBeDefined();
    })));

    it('should save all form elements of the form', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
        let element;
        service.saveApplication(ApplicationMock.APPLICATION).subscribe(result => {
            element = result;
        });

        expect(element).toBeUndefined();

        tick(1000);

        expect(element).toBeDefined();
        expect(element.id).toBeDefined(ApplicationMock.APPLICATION.id);
    })));

    describe('Function: rescindApplication', () => {
        it('should change the status so rescinded if allowed', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
            let element;
            service.rescindApplication({ status: 'submitted' }).subscribe(result => {
                element = result;
            });
            expect(element).toBeUndefined();
            tick(1000);
            expect(element.status).toEqual('rescinded');
        })));
        it('should throw and alert an error if status change is not allowed', fakeAsync(inject([ApplicationService, AlertService], (service: ApplicationService, alert: AlertService) => {
            let response;
            spyOn(alert, 'setAlert');
            service.rescindApplication({ status: 'deactivated' }).subscribe(result => {
                response = 'success';
            }, error => {
                response = 'error';
            });
            tick(1000);
            expect(alert.setAlert).toHaveBeenCalled();
            expect(response).toEqual('error');
        })));
    });

    describe('Function: deactivateApplication', () => {
        it('should change the appliation status to deactivated if allowed', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
            let element;
            service.deactivateApplication({ status: 'created' }).subscribe(result => {
                element = result;
            });
            expect(element).toBeUndefined();
            tick(1000);
            expect(element.status).toEqual('deactivated');
        })));
        it('should throw and alert an error if status change is not allowed', fakeAsync(inject([ApplicationService, AlertService], (service: ApplicationService, alert: AlertService) => {
            let response;
            spyOn(alert, 'setAlert');
            service.deactivateApplication({ status: 'deactivated' }).subscribe(result => {
                response = 'success';
            }, error => {
                response = 'error';
            });
            tick(1000);
            expect(alert.setAlert).toHaveBeenCalled();
            expect(response).toEqual('error');
        })));
    });

    describe('Function: submitApplication', () => {
        it('should change the application status to submitted if allowed', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
            let element;
            service.submitApplication({ status: 'created' }).subscribe(result => {
                element = result;
            });
            expect(element).toBeUndefined();
            tick(1000);
            expect(element.status).toEqual('submitted');
        })));
        it('should throw and alert an error if status change is not allowed', fakeAsync(inject([ApplicationService, AlertService], (service: ApplicationService, alert: AlertService) => {
            let response;
            spyOn(alert, 'setAlert');
            service.submitApplication({ status: 'deactivated' }).subscribe(result => {
                response = 'success';
            }, error => {
                response = 'error';
            });
            tick(1000);
            expect(alert.setAlert).toHaveBeenCalled();
            expect(response).toEqual('error');
        })));
    });
});
