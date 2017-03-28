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

import { TestBed, inject } from '@angular/core/testing';

import { ListService } from './list.service';

describe('ListService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ListService]
        });
    });

    it('should ...', inject([ListService], (service: ListService) => {
        expect(service).toBeTruthy();
    }));
});
