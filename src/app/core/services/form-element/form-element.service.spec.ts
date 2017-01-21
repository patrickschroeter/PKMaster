/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormElementService } from './form-element.service';

import { AlertService, AlertMock } from './../../../modules/alert';
import { FormService, FormMock } from './../form';

import { Field } from './../../../swagger';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';

describe('Service: FormElement', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormElementService,
                { provide: AlertService, useClass: AlertMock },
                { provide: FormService, useClass: FormMock },
                ...TranslationProviderMock
            ]
        });
    });

    it('should ...', inject([FormElementService], (service: FormElementService) => {
        expect(service).toBeTruthy();
    }));

    it('should provide the element', inject([FormElementService], (service: FormElementService) => {
        let element;

        service.getElement().subscribe(result => {
            element = result;
        });

        expect(element).toEqual([]);

        service.setElement([{ name: 'element' }]);

        expect(element[0]['name']).toBe('element');
    }));

    it('should provide the preview element', inject([FormElementService], (service: FormElementService) => {
        let preview;

        service.getElementPreview().subscribe(result => {
            preview = result;
        });

        expect(preview).toEqual([]);

        service.setElementPreview([{ name: 'preview' }]);

        expect(preview[0]['name']).toBe('preview');
    }));

    it('should provide the submit flag', inject([FormElementService], (service: FormElementService) => {
        let submit;

        service.getElementHasSubmit().subscribe(result => {
            submit = result;
        });

        expect(submit).toBe(false);

        service.setElementHasSubmit(true);

        expect(submit).toBe(true);
    }));

    it('should provide the preview flag', inject([FormElementService], (service: FormElementService) => {
        let preview;

        service.getElementHasPreview().subscribe(result => {
            preview = result;
        });

        expect(preview).toBe(false);

        service.setElementHasPreview(true);

        expect(preview).toBe(true);
    }));

    it('should provide the validation flag', inject([FormElementService], (service: FormElementService) => {
        let validations;

        service.getElementHasValidations().subscribe(result => {
            validations = result;
        });

        expect(validations).toBe(false);

        service.setElementHasValidations(true);

        expect(validations).toBe(true);
    }));

    it('should provide the styles flag', inject([FormElementService], (service: FormElementService) => {
        let styles;

        service.getElementHasStyles().subscribe(result => {
            styles = result;
        });

        expect(styles).toBe(false);

        service.setElementHasStyles(true);

        expect(styles).toBe(true);
    }));

    it('should get the element types', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should get the attribute of the element type', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should get the validations of the element type', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should get the styles of the elemen type', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should add validation', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should add styles', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should remove the element from the form', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should add/save the element', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should load the attributes of the element type', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should load the options of the option table', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should set the options of the option table', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should set the preview element', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should unset the preview element', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should create a filled element', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should create a filled element with validation', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should create a filled element with styles', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should create a filled element with options', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should create an empty element', inject([FormElementService], (service: FormElementService) => {

    }));
    it('should reset the element', inject([FormElementService], (service: FormElementService) => {

    }));
});
