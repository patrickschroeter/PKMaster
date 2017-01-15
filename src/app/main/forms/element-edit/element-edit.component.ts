import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormElementService } from './../../../core';
import { Field } from './../../../swagger';

@Component({
    selector: 'pk-element-edit',
    templateUrl: './element-edit.component.html',
    styleUrls: ['./element-edit.component.scss'],
})
export class ElementEditComponent implements OnInit {

    /** The current Element as FormElement[] */
    private _element: Array<Field>;
    get element() { return this._element; }
    set element(element: Array<Field>) { this._element = element; }
    /** The new Element interpreted as new FormElement */
    private _elementPreview: Array<Field> = [];
    get elementPreview() { return this._elementPreview; }
    set elementPreview(element: Array<Field>) { this._elementPreview = element; }
    /** Flag if View has Submit Enabled */
    private elementHasSubmit: boolean = false;
    /** Flag if View has Preview Enabled */
    private elementHasPreview: boolean = false;
    /** Flag if Element has Validations */
    private elementHasValidations: boolean = false;
    /** Flag if Element has Styles */
    private elementHasStyles: boolean = false;

    constructor(private elementService: FormElementService) { }

    ngOnInit() {
        this.subscribeElement();
        this.subscribeElementPreview();
        this.subscribeHasPreview();
        this.subscribeHasStyles();
        this.subscribeHasSubmit();
        this.subscribeHasValidations();
    }

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: any): void {
        let code = event.code;
        if (code === 'Escape') {
            this.elementService.cancelElement();
        }
    }

    /**
     * @description dynamic form onChange event
     * @param {FormElement} form
     * @return {void}
     */
    updateElement(form: FormGroup): void {
        this.elementService.updateElement(form);
    }

    /**
     * @description toggle the element prieview dom element
     * @return {void}
     */
    toggleElementPreview(): void {
        this.elementService.toggleElementPreview();
    }

    /**
     * @description add the validation select to the form
     * @return {void}
     */
    addValidations(): void {
        this.elementService.addValidations();
    }

    /**
     * @description add the styles select to the form
     * @return {void}
     */
    addStyles(): void {
        this.elementService.addStyles();
    }

    /**
     * @description save the current element to the current form
     * @param {FormElement} element
     * @return {void}
     */
    saveElement(element: Field): void {
        this.elementService.saveElement(element);
    }

    copyElement(element: Field, type: 'clone' | 'add'): void {
        this.elementService.saveElement(element, type);
    }

    /**
     * @description cancel the current element
     * @return {void}
     */
    cancelElement(): void {
        this.elementService.cancelElement();
    }

    /**
     * @description remove the element from the form
     * @return {void}
     */
    removeElement(): void {
        this.elementService.removeElement();
    }

    /***************************************
     *
     *  Subscription
     *
     */

    /**
     * @description subscribe to the current element
     * @return {void}
     */
    subscribeElement(): void {
        this.elementService.getElement().subscribe(element => {
            this.element = element;
        });
    }

    /**
     * @description subscribe to the element preview
     * @return {void}
     */
    subscribeElementPreview(): void {
        this.elementService.getElementPreview().subscribe(preview => {
            this.elementPreview = preview;
        });
    }

    /**
     * @description subscribe to has submit
     * @return {void}
     */
    subscribeHasSubmit(): void {
        this.elementService.getElementHasSubmit().subscribe(hasSubmit => {
            this.elementHasSubmit = hasSubmit;
        });
    }

    /**
     * @description subscribe to has preview
     * @return {void}
     */
    subscribeHasPreview(): void {
        this.elementService.getElementHasPreview().subscribe(hasPreview => {
            this.elementHasPreview = hasPreview;
        });
    }

    /**
     * @description subscribe to has validations
     * @return {void}
     */
    subscribeHasValidations(): void {
        this.elementService.getElementHasValidations().subscribe(hasValidations => {
            this.elementHasValidations = hasValidations;
        });
    }

    /**
     * @description subscribe to has styles
     * @return {void}
     */
    subscribeHasStyles(): void {
        this.elementService.getElementHasStyles().subscribe(hasStyles => {
            this.elementHasStyles = hasStyles;
        });
    }
}
