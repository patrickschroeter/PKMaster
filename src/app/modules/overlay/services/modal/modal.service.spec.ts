/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ModalService
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ]
        });
    });

    it('should ...', inject([ModalService], (service: ModalService) => {
        expect(service).toBeTruthy();
    }));
});
