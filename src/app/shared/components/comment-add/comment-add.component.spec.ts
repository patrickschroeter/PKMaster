/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CommentAddComponent } from './comment-add.component';

import { CoreProviderMock } from 'app/core/core.module';
import { TranslationProviderMock } from 'app/modules/translation/translation.module';

describe('CommentAddComponent', () => {
    let component: CommentAddComponent;
    let fixture: ComponentFixture<CommentAddComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommentAddComponent],
            providers: [
                ...CoreProviderMock,
                ...TranslationProviderMock
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
