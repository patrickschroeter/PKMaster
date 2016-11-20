/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplicationService } from './application.service';

import {
    FormService,
    FormMock,
} from './../form';

import { AlertService, AlertMock } from './../alert';

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
});
