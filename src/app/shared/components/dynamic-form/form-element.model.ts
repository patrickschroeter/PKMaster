import { FormControl } from '@angular/forms';

export class FormElement {

  elementType: string;
  name: string;
  label?: string;
  required?: boolean;
  value?: string | number | boolean;

  // input
  type?: string;
  placeholder?: string;
  validations?: Array<string>;
  styles?: Object;

  // select && radio
  options?: Array<Object>;

  // select
  multiple?: boolean;

  formControl: FormControl;

  constructor(obj) {
    this.elementType = obj.elementType;
    this.name = obj.name;
    this.label = obj.label;
    this.required = obj.required;
    this.type = obj.type;
    this.placeholder = obj.placeholder;
    this.value = obj.value;
    this.formControl = obj.formControl;
    this.validations = obj.validations;
    this.styles = obj.styles;
    this.options = obj.options;
    this.multiple = obj.multiple;
  }
}
