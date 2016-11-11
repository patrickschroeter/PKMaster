import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pk-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    '[class.element]': 'true'
  }
})
export class ButtonComponent implements OnInit {
  @Input() icon: string;
  @Input() value: string;
  @Input() type: string = 'button';
  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  emit() {
    this.onClick.emit();
  }

}
