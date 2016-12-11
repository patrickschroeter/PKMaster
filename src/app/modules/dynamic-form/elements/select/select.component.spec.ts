/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';

import {
    OverlayComponent,
    ButtonComponent
} from './../../../../shared';

import { FloatingModule } from './../../../../modules/floating/floating.module';
import {
    DynamicFormComponent, DynamicFormComponentMock } from './../../';

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OverlayComponent,
                ButtonComponent,
                SelectComponent
            ],
            imports: [
                ReactiveFormsModule,
                FloatingModule,
                FormsModule
            ],
            providers: [
                { provide: DynamicFormComponent, useClass: DynamicFormComponentMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
