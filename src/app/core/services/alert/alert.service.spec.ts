/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('Service: Alert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService]
    });
  });

  it('should ...', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));

  it('should provide the alert title', inject([AlertService], (service: AlertService) => {
      let element;
      service.getTitle().subscribe(response => {
          element = response;
      });

      expect(element).toBeUndefined();

      service.setAlert('title', 'message');

      expect(element).toBeDefined();
      expect(element).toBe('title');
  }));

  it('should provide the alert message', inject([AlertService], (service: AlertService) => {
      let element;
      service.getMessage().subscribe(response => {
          element = response;
      });

      expect(element).toBeUndefined();

      service.setAlert('error', 'message');

      expect(element).toBeDefined();
      expect(element).toBe('message');
  }));
});
