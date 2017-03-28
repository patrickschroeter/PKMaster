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

import { TestBed, async } from '@angular/core/testing';
import { AlertDirective } from './alert.directive';

import { AlertMock, AlertService } from './../../';

describe('AlertDirective', () => {
    it('should create an instance', () => {
        const directive = new AlertDirective(new AlertService());
        expect(directive).toBeTruthy();
    });
});
