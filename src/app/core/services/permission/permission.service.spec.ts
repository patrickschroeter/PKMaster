/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PermissionService } from './permission.service';

describe('Service: Permission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PermissionService
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: class {} },
        ])
      ]
    });
  });

  it('should ...', inject([PermissionService], (service: PermissionService) => {
    expect(service).toBeTruthy();
  }));
});
