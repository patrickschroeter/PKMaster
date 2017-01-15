/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccessService } from './access.service';

import { AuthenticationService, AuthenticationMock, PermissionService, PermissionMock } from './../';

describe('Service: Access', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AccessService,

                { provide: AuthenticationService, useClass: AuthenticationMock },
                { provide: PermissionService, useClass: PermissionMock }
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: class { } },
                ])
            ]
        });
    });

    it('should ...', inject([AccessService], (service: AccessService) => {
        expect(service).toBeTruthy();
    }));
});
