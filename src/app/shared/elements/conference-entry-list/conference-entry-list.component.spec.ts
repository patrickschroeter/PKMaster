/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ConferenceEntryListComponent } from './conference-entry-list.component';

import { WindowMock } from './../../';

describe('ConferenceEntryListComponent', () => {
    let component: ConferenceEntryListComponent;
    let fixture: ComponentFixture<ConferenceEntryListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConferenceEntryListComponent
            ],
            providers: [
                { provide: 'ListModalService', useClass: WindowMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConferenceEntryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
