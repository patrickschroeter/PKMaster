/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DynamicFormService } from './dynamic-form.service';

describe('Service: DynamicForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicFormService]
    });
  });

  it('should ...', inject([DynamicFormService], (service: DynamicFormService) => {
    expect(service).toBeTruthy();
  }));
});
