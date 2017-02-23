import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormService } from './../../services';

import { FieldDto } from './../../../../swagger';

import { DynamicFormComponent } from './../../dynamic-form.component';

import { ConfigurationService } from './../../../../core';

@Component({
    selector: 'pk-dynamic-form-element',
    templateUrl: './dynamic-form-element.component.html'
})
export class DynamicFormElementComponent implements OnInit {

    @Input() element: FieldDto;
    @Input() disabled: boolean;
    @Input() form: FormGroup;

    constructor(
        private dynamicForm: DynamicFormService,
        private configurationService: ConfigurationService
    ) { }

    ngOnInit() {
    }

    /**
     * Show the validation of the element
     *
     * @param {FieldDto} element
     *
     * @memberOf DynamicFormElementComponent
     */
    public showElementValidation(element: FieldDto): void {
        this.dynamicForm.showElementValidation(this.form.controls[element.name]);
    }

    /**
     * Hide the Element Validation
     *
     * @memberOf DynamicFormElementComponent
     */
    public hideElementValidation(): void {
        this.dynamicForm.hideValidation();
    }

    /**
     * Get the Name of the fieldType
     *
     * @returns {String}
     *
     * @memberOf DynamicFormElementComponent
     */
    public getFieldType(): string {
        return this.configurationService.getFieldDefinitionName(this.element.fieldType);
    }

    /**
     * Check if the element has the style with the given name
     *
     * @param {String} name
     * @returns {Boolean}
     *
     * @memberOf DynamicFormElementComponent
     */
    public hasStyle(name: string): boolean {
        for (const style in this.element.styleIds) {
            if (style) {
                if (this.configurationService.isStyle(name, this.element.styleIds[style])) {
                    return true;
                }
            }
        }
        return false;
    }
}
