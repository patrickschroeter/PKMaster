/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ConferenceEntryDetailComponent } from './conference-entry-detail.component';
import { AccessDirective } from './../../';
import { StatusPipe } from './../../../shared';

describe('ConferenceEntryDetailComponent', () => {
    let component: ConferenceEntryDetailComponent;
    let fixture: ComponentFixture<ConferenceEntryDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConferenceEntryDetailComponent,

                AccessDirective,
                StatusPipe
            ], schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConferenceEntryDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
