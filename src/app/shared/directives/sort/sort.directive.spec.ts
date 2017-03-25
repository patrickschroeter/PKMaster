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

import { SortDirective } from './sort.directive';

import { ListService } from 'app/shared/services';

describe('SortDirective', () => {
    it('should create an instance', () => {
        const directive = new SortDirective(new ListService());
        expect(directive).toBeTruthy();
    });
});
