/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConferenceEntryApplicationComponent } from './conference-entry-application.component';

describe('ConferenceEntryApplicationComponent', () => {
  let component: ConferenceEntryApplicationComponent;
  let fixture: ComponentFixture<ConferenceEntryApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceEntryApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceEntryApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
