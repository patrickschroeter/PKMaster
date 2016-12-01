/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { ApplicationService } from './application.service';

import {
    FormService,
    FormMock,
} from './../form';

import { AlertService, AlertMock } from './../alert';

import { ApplicationMock } from './';
import { State } from './../../../swagger';

describe('Service: Application', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApplicationService,

                { provide: FormService, useClass: FormMock },
                { provide: AlertService, useClass: AlertMock },
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
        it('should change the state so rescinded if allowed', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
            let element;
            service.rescindApplication({ state: State.NameEnum.submitted }).subscribe(result => {
                element = result;
            });
            expect(element).toBeUndefined();
            tick(1000);
            expect(element.state).toEqual(State.NameEnum.rescinded);
        })));
        it('should throw and alert an error if state change is not allowed', fakeAsync(inject([ApplicationService, AlertService], (service: ApplicationService, alert: AlertService) => {
            let response;
            spyOn(alert, 'setAlert');
            service.rescindApplication({ state: State.NameEnum.deactivated }).subscribe(result => {
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
        it('should change the appliation state to deactivated if allowed', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
            let element;
            service.deactivateApplication({ state: State.NameEnum.created }).subscribe(result => {
                element = result;
            });
            expect(element).toBeUndefined();
            tick(1000);
            expect(element.state).toEqual(State.NameEnum.deactivated);
        })));
        it('should throw and alert an error if state change is not allowed', fakeAsync(inject([ApplicationService, AlertService], (service: ApplicationService, alert: AlertService) => {
            let response;
            spyOn(alert, 'setAlert');
            service.deactivateApplication({ state: State.NameEnum.deactivated }).subscribe(result => {
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
        it('should change the application state to submitted if allowed', fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
            let element;
            service.submitApplication({ state: State.NameEnum.created }).subscribe(result => {
                element = result;
            });
            expect(element).toBeUndefined();
            tick(1000);
            expect(element.state).toEqual(State.NameEnum.submitted);
        })));
        it('should throw and alert an error if state change is not allowed', fakeAsync(inject([ApplicationService, AlertService], (service: ApplicationService, alert: AlertService) => {
            let response;
            spyOn(alert, 'setAlert');
            service.submitApplication({ state: State.NameEnum.deactivated }).subscribe(result => {
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
