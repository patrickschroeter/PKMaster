/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfigurationService } from './configuration.service';

import { ConfigurationApi } from 'app/swagger';
import { ConfigurationApiMock } from './../';

describe('ConfigurationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConfigurationService,
                { provide: ConfigurationApi, useClass: ConfigurationApiMock }
            ]
        });
    });

    it('should ...', inject([ConfigurationService], (service: ConfigurationService) => {
        expect(service).toBeTruthy();
    }));
});
