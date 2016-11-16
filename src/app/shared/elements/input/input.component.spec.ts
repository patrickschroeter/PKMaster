/* tslint:disable:no-unused-variable */

import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

import { FormValidationComponent } from './../../';

describe('Component: Input', () => {
  let fixture: ComponentFixture<any>;
  let component: InputComponent;
  let input: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputComponent,
        FormValidationComponent
      ],
      imports: [
        FormsModule
      ]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    input = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
