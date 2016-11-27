import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pk-dynamic-form-content',
  template: '<ng-content></ng-content>'
})
export class DynamicFormContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
