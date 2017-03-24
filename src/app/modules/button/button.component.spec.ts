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

/* tslint:disable:no-unused-variable */
import { DebugElement, EventEmitter } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs/Rx';

import { ButtonComponent } from './button.component';

describe('Component: Button', () => {
  let fixture: ComponentFixture<any>;
  let component: ButtonComponent;
  let button: DebugElement;
  let icon: DebugElement;
  let value: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(ButtonComponent);
      component = fixture.componentInstance;

      component.icon = 'questionmark';
      component.value = 'help';

      fixture.detectChanges();

      button = fixture.debugElement.query(By.css('.btn'));
      icon = fixture.debugElement.query(By.css('.icon'));
      value = fixture.debugElement.query(By.css('.value'));
  });

  it('should create an instance', () => {
    // expect(component).toBeTruthy();
  });

  it('should add set the icon value as html text', () => {
    // let fa = icon.query(By.css('i'));
    // expect(fa.nativeElement.textContent).toContain('questionmark');
  });

  it('should display the value', () => {
    // expect(value.nativeElement.textContent).toContain('help');
  });

  it('should handle a click on the button', () => {
    // spyOn(component, 'emit').and.callFake(message => message);
    // button.triggerEventHandler('click', null);
    // expect(component.emit).toHaveBeenCalled();
    // expect(component.emit).toHaveBeenCalledWith('help');
  });

});
