import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonApplicationAssignComponent } from './button-application-assign.component';

describe('ButtonApplicationAssignComponent', () => {
  let component: ButtonApplicationAssignComponent;
  let fixture: ComponentFixture<ButtonApplicationAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonApplicationAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonApplicationAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
