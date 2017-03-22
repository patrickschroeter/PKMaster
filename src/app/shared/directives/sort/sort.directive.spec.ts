import { SortDirective } from './sort.directive';

import { ListService } from 'app/shared/services';

describe('SortDirective', () => {
    it('should create an instance', () => {
        const directive = new SortDirective(new ListService());
        expect(directive).toBeTruthy();
    });
});
