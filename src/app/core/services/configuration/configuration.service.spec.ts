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
