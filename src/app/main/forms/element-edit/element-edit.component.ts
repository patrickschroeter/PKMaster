import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { FormElementService } from './../../../core';
import { FieldDto } from './../../../swagger';

@Component({
    selector: 'pk-element-edit',
    templateUrl: './element-edit.component.html',
    styleUrls: ['./element-edit.component.scss'],
})
export class ElementEditComponent implements OnInit, OnDestroy {

    /** The current Element as FormElement[] */
    private _element: Array<FieldDto>;
    get element() { return this._element; }
    set element(element: Array<FieldDto>) { this._element = element; }
    /** The new Element interpreted as new FormElement */
    private _elementPreview: Array<FieldDto> = [];
    get elementPreview() { return this._elementPreview; }
    set elementPreview(element: Array<FieldDto>) { this._elementPreview = element; }
    /** Flag if View has Submit Enabled */
    private elementHasSubmit: Boolean = false;
    /** Flag if View has Preview Enabled */
    public elementHasPreview: Boolean = false;
    /** Flag if Element has Validations */
    public elementHasValidations: Boolean = false;
    /** Flag if Element has Styles */
    public elementHasStyles: Boolean = false;

    private subscriptionElement: Subscription;
    private subscriptionElementPreview: Subscription;
    private subscriptionHasPreview: Subscription;
    private subscriptionHasStyles: Subscription;
    private subscriptionHasSubmit: Subscription;
    private subscriptionHasValidations: Subscription;

    constructor(private elementService: FormElementService) { }

    ngOnInit() {
        this.subscribeElement();
        this.subscribeElementPreview();
        this.subscribeHasPreview();
        this.subscribeHasStyles();
        this.subscribeHasSubmit();
        this.subscribeHasValidations();
    }

    ngOnDestroy() {
        this.unsubscribeElement();
        this.unsubscribeElementPreview();
        this.unsubscribeHasPreview();
        this.unsubscribeHasStyles();
        this.unsubscribeHasSubmit();
        this.unsubscribeHasValidations();
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
    saveElement(element: FieldDto): void {
        this.elementService.saveElement(element);
    }

    copyElement(element: FieldDto, type: 'clone' | 'add'): void {
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
        this.subscriptionElement = this.elementService.getElement().subscribe(element => {
            this.element = element;
        });
    }

    unsubscribeElement(): void {
        this.subscriptionElement.unsubscribe();
    }

    /**
     * @description subscribe to the element preview
     * @return {void}
     */
    subscribeElementPreview(): void {
        this.subscriptionElementPreview = this.elementService.getElementPreview().subscribe(preview => {
            this.elementPreview = preview;
        });
    }

    unsubscribeElementPreview(): void {
        this.subscriptionElementPreview.unsubscribe();
    }

    /**
     * @description subscribe to has submit
     * @return {void}
     */
    subscribeHasSubmit(): void {
        this.subscriptionHasSubmit = this.elementService.getElementHasSubmit().subscribe(hasSubmit => {
            this.elementHasSubmit = hasSubmit;
        });
    }

    unsubscribeHasSubmit(): void {
        this.subscriptionHasSubmit.unsubscribe();
    }

    /**
     * @description subscribe to has preview
     * @return {void}
     */
    subscribeHasPreview(): void {
        this.subscriptionHasPreview = this.elementService.getElementHasPreview().subscribe(hasPreview => {
            this.elementHasPreview = hasPreview;
        });
    }

    unsubscribeHasPreview(): void {
        this.subscriptionHasPreview.unsubscribe();
    }

    /**
     * @description subscribe to has validations
     * @return {void}
     */
    subscribeHasValidations(): void {
        this.subscriptionHasValidations = this.elementService.getElementHasValidations().subscribe(hasValidations => {
            this.elementHasValidations = hasValidations;
        });
    }

    unsubscribeHasValidations(): void {
        this.subscriptionHasValidations.unsubscribe();
    }

    /**
     * @description subscribe to has styles
     * @return {void}
     */
    subscribeHasStyles(): void {
        this.subscriptionHasStyles = this.elementService.getElementHasStyles().subscribe(hasStyles => {
            this.elementHasStyles = hasStyles;
        });
    }

    unsubscribeHasStyles(): void {
        this.subscriptionHasStyles.unsubscribe();
    }
}
