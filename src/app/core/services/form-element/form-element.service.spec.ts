/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { FormElementService } from './form-element.service';

import { FormService, FormMock } from './../form';

import { TranslationProviderMock } from './../../../modules/translation/translation.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';

import { Field } from './../../../swagger';
import { Fields } from './../../../models';

fdescribe('Service: FormElement', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormElementService,
                { provide: FormService, useClass: FormMock },
                ...AlertProviderMock,
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

    describe('updateElement', () => {
        let service: FormElementService;
        let formGroup: FormGroup;
        let elementForm: Field[];

        let getNameField = (): Field => {
            return _.find(elementForm, obj => { return obj.name === 'name'; });
        };
        let getPlaceholderField = (): Field => {
            return _.find(elementForm, obj => { return obj.name === 'placeholder'; });
        };

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
            formGroup = new FormGroup({
                fieldType: new FormControl(),
                optionTable: new FormControl(),
                options: new FormControl(),
                name: new FormControl()
            });


            elementForm = [];
        }));

        describe('selectedType', () => {

            it('should update the ElementForm when a new fieldType is selected', fakeAsync(() => {
                service.getElement().subscribe(obj => {
                    elementForm = obj;
                });
                expect(elementForm.length).toBe(0);

                /** select a value */
                formGroup.get('fieldType').setValue('input');
                service.updateElement(formGroup); tick(600);

                expect(elementForm.length).not.toBe(0);
            }));

            it('should update the ElementForm when a different fieldType is selected', fakeAsync(() => {
                service.getElement().subscribe(obj => {
                    elementForm = obj;
                });
                /** select a value */
                formGroup.get('fieldType').setValue('input');
                service.updateElement(formGroup); tick(600);

                let first = _.cloneDeep(elementForm);
                expect(elementForm).toEqual(first);

                /** select an other value */
                formGroup.get('fieldType').setValue('checkbox');
                service.updateElement(formGroup); tick(600);

                expect(elementForm).not.toEqual(first);
            }));

            it('should NOT update the ElementForm when the same fieldType is selected', fakeAsync(() => {
                let placeholder = 'somestring';
                service.getElement().subscribe(obj => {
                    elementForm = obj;
                });
                /** select a value */
                formGroup.get('fieldType').setValue('input');
                service.updateElement(formGroup); tick(600);

                getPlaceholderField().value = placeholder;

                /** select the same value */
                formGroup.get('fieldType').setValue('input');
                service.updateElement(formGroup); tick(600);

                expect(getPlaceholderField().value).toEqual(placeholder);
            }));

            it('should leave the element values undefined when FormGroup has no value', fakeAsync(() => {
                service.getElement().subscribe(obj => {
                    elementForm = obj;
                });
                /** select a value */
                formGroup.get('fieldType').setValue('input');
                service.updateElement(formGroup); tick(600);

                expect(getNameField().value).toBeUndefined();
            }));

            it('should keep defined values in element if they exist in both types', fakeAsync(() => {
                let name = 'spec';

                service.getElement().subscribe(obj => {
                    elementForm = obj;
                });
                expect(elementForm.length).toBe(0);
                /** select a value */
                formGroup.get('fieldType').setValue('input');
                formGroup.get('name').setValue(name);
                service.updateElement(formGroup); tick(600);

                expect(getNameField().value).toEqual(name);

                /** select an other value */
                formGroup.get('fieldType').setValue('checkbox');
                service.updateElement(formGroup); tick(600);

                expect(getNameField().value).toEqual(name);
            }));

            it('should remove fields from element if they are not more required', fakeAsync(() => {
                let name = 'spec';

                service.getElement().subscribe(obj => {
                    elementForm = obj;
                });
                expect(elementForm.length).toBe(0);
                /** select a value */
                formGroup.get('fieldType').setValue('input');
                formGroup.get('name').setValue(name);
                service.updateElement(formGroup); tick(600);

                expect(getPlaceholderField()).toBeDefined();

                /** select an other value */
                formGroup.get('fieldType').setValue('checkbox');
                service.updateElement(formGroup); tick(600);

                expect(getPlaceholderField()).toBeUndefined();
            }));

            it('should should create a preview element', fakeAsync(() => {
                let previewForm;
                service.getElementPreview().subscribe(obj => {
                    previewForm = obj;
                });
                expect(previewForm.length).toBe(0);
                /** select a value */
                formGroup.get('fieldType').setValue('input');
                service.updateElement(formGroup); tick(600);

                expect(previewForm.length).not.toBe(0);
            }));

            it('should not update the element if no fieldType is given', fakeAsync(() => {
                let previewForm;
                service.getElementPreview().subscribe(obj => {
                    previewForm = obj;
                });
                expect(previewForm.length).toBe(0);
                /** select a value */
                service.updateElement(formGroup); tick(600);

                expect(previewForm.length).toBe(0);
            }));

            it('should not update the element if no fieldType is invalid', fakeAsync(() => {
                let previewForm;
                service.getElementPreview().subscribe(obj => {
                    previewForm = obj;
                });
                expect(previewForm.length).toBe(0);
                /** select a value */
                formGroup.get('fieldType').setValue(123);
                service.updateElement(formGroup); tick(600);

                expect(previewForm.length).toBe(0);

                /** select a value */
                formGroup.get('fieldType').setValue('123');
                service.updateElement(formGroup); tick(600);

                expect(previewForm.length).toBe(0);

                /** select a value */
                formGroup.get('fieldType').setValue('test');
                service.updateElement(formGroup); tick(600);

                expect(previewForm.length).toBe(0);

                /** select a value */
                formGroup.get('fieldType').setValue(true);
                service.updateElement(formGroup); tick(600);

                expect(previewForm.length).toBe(0);
            }));
        });
    });

    xdescribe('addStyles', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should add styles to the element', () => {
            service.addStyles();
        });
    });

    xdescribe('addValidations', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should add validations to the element', () => {
            service.addValidations();
        });
    });

    xdescribe('cancelElement', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should stop the element creation', () => {
            service.cancelElement();
        });
    });

    xdescribe('removeElement', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should remove the edited element from the form', () => {
            service.removeElement();
        });
    });

    xdescribe('saveElement', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should save the created element into the form', () => {
            service.saveElement(new Fields.FieldName());
        });
    });

    xdescribe('toggleElementPreview', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should toggle the preview element in the template', () => {
            service.toggleElementPreview();
        });
    });
});
