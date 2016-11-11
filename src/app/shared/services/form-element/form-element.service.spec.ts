/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormElementService } from './form-element.service';

describe('Service: FormElement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormElementService]
    });
  });

  it('should ...', inject([FormElementService], (service: FormElementService) => {
    expect(service).toBeTruthy();
  }));
});
