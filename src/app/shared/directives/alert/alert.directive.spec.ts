/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AlertDirective } from './alert.directive';

import { AlertMock, AlertService } from './../../../core';

describe('AlertDirective', () => {
  it('should create an instance', () => {
    let directive = new AlertDirective(new AlertService());
    expect(directive).toBeTruthy();
  });
});
