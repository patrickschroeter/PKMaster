import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CommentAddComponent } from './comment-add.component';

import { CoreProviderMock } from './../../../core/core.module';

describe('CommentAddComponent', () => {
    let component: CommentAddComponent;
    let fixture: ComponentFixture<CommentAddComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommentAddComponent],
            providers: [
                ...CoreProviderMock
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
