import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pk-list-content',
  template: '<ng-content></ng-content>'
})
export class ListContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
