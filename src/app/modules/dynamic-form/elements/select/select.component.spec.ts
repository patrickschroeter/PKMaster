/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';

import { FloatingModule } from './../../../../modules/floating/floating.module';
import { ButtonModule } from './../../../../modules/button/button.module';
import { OverlayModule } from './../../../../modules/overlay/overlay.module';
import { DynamicFormComponent } from './../../';

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SelectComponent
            ],
            imports: [
                ReactiveFormsModule,
                FloatingModule,
                FormsModule,
                ButtonModule,
                OverlayModule
            ],
            providers: [
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
