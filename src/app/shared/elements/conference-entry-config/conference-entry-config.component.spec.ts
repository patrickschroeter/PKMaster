/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ConferenceEntryConfigComponent } from './conference-entry-config.component';

describe('ConferenceEntryConfigComponent', () => {
    let component: ConferenceEntryConfigComponent;
    let fixture: ComponentFixture<ConferenceEntryConfigComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConferenceEntryConfigComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConferenceEntryConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
