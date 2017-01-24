/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { FormElementService } from './form-element.service';

import { FormService, FormMock } from './../form';

import { TranslationProviderMock } from './../../../modules/translation/translation.module';
import { AlertProviderMock } from './../../../modules/alert/alert.module';
import { AlertService } from './../../../modules/alert';

import { Field } from './../../../swagger';
import { Fields } from './../../../models';

describe('Service: FormElement', () => {
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

        describe('optionTable', () => {
            it('should update the form.options when a valid optionTable is set', fakeAsync(() => {
                formGroup = new FormGroup({
                    optionTable: new FormControl('fakultaet'),
                    options: new FormControl()
                });
                expect(formGroup.get('options').value).toBeNull();

                /** set value */
                service.updateElement(formGroup); tick(600);

                expect(formGroup.get('options').value).toBeDefined();
                expect(formGroup.get('options').value.length).toEqual(2);
            }));

            it('should [] the form.options when an invalid optionTable is set', fakeAsync(() => {
                formGroup = new FormGroup({
                    optionTable: new FormControl('invalid'),
                    options: new FormControl()
                });
                expect(formGroup.get('options').value).toBeNull();

                /** set value */
                service.updateElement(formGroup); tick(600);

                expect(formGroup.get('options').value).toBeDefined();
                expect(formGroup.get('options').value.length).toEqual(0);
            }));

            it('should update the form.options when a different optionTable is set', fakeAsync(() => {
                formGroup = new FormGroup({
                    optionTable: new FormControl('language'),
                    options: new FormControl()
                });
                expect(formGroup.get('options').value).toBeNull();

                /** set value */
                service.updateElement(formGroup); tick(600);

                let length = formGroup.get('options').value.length;

                formGroup.get('options').setValue('fakultaet');

                /** set value */
                service.updateElement(formGroup); tick(600);

                expect(length).not.toEqual(formGroup.get('options').value.length);
            }));
        });

        describe('options', () => {
            it('should \'\' form.optionTable when an option is removed', fakeAsync(() => {
                formGroup = new FormGroup({
                    optionTable: new FormControl('fakultaet'),
                    options: new FormControl(),
                });

                /** set value */
                service.updateElement(formGroup); tick(600);

                expect(formGroup.get('optionTable').value).toEqual('fakultaet');
                expect(formGroup.get('options').value.length).toEqual(2);

                formGroup.get('options').setValue(formGroup.get('options').value.slice(0, 1));

                service.updateElement(formGroup); tick(600);

                expect(formGroup.get('optionTable').value).toEqual('');
                expect(formGroup.get('options').value.length).toEqual(1);
            }));

            it('should \'\' form.optionTable when an option is added', fakeAsync(() => {
                formGroup = new FormGroup({
                    optionTable: new FormControl('fakultaet'),
                    options: new FormControl(),
                });

                /** set value */
                service.updateElement(formGroup); tick(600);

                expect(formGroup.get('optionTable').value).toEqual('fakultaet');
                expect(formGroup.get('options').value.length).toEqual(2);

                let opts = formGroup.get('options').value;
                opts.push({});
                formGroup.get('options').setValue(opts);

                service.updateElement(formGroup); tick(600);

                expect(formGroup.get('optionTable').value).toEqual('');
                expect(formGroup.get('options').value.length).toEqual(3);
            }));
        });

        describe('name', () => {
            it('should set a preview element if a name is set', fakeAsync(() => {
                let preview;
                service.getElementPreview().subscribe(result => {
                    preview = result;
                });
                expect(preview).toBeDefined();
                expect(preview.length).toEqual(0);

                /** set field type */
                formGroup.get('name').setValue('name');
                service.updateElement(formGroup); tick(600);

                expect(preview.length).toBeGreaterThan(0);
            }));

            it('should unset a preview element if no name is set', fakeAsync(() => {
                let preview;
                service.getElementPreview().subscribe(result => {
                    preview = result;
                });

                /** set field type */
                formGroup.get('name').setValue('name');
                service.updateElement(formGroup); tick(600);

                expect(preview.length).toBeGreaterThan(0);

                /** unset name attribute */
                formGroup.get('name').setValue(null);
                service.updateElement(formGroup); tick(600);

                expect(preview.length).toEqual(0);
            }));
        });
    });

    describe('addStyles', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should fail if no fielType is selected', fakeAsync(() => {
            spyOn(console, 'error');

            service.addStyles(); tick(600);

            expect(console.error).toHaveBeenCalled();
        }));

        it('should provide styles of the fieldType', fakeAsync(() => {
            let styles;
            service.getElement().subscribe(result => {
                styles = _.find(result, obj => { return obj['name'] === 'styles'; });
            });
            expect(styles).toBeUndefined();

            service.updateElement(new FormGroup({ fieldType: new FormControl('input') })); tick(600);

            service.addStyles(); tick(600);

            expect(styles).toBeDefined();
        }));

        it('should fail if styles already exist', fakeAsync(() => {
            let styles;
            service.getElement().subscribe(result => {
                styles = _.find(result, obj => { return obj['name'] === 'styles'; });
            });

            service.updateElement(new FormGroup({ fieldType: new FormControl('input') })); tick(600);

            service.addStyles(); tick(600);

            spyOn(console, 'error');

            service.addStyles(); tick(600);

            expect(console.error).toHaveBeenCalled();

        }));
    });

    describe('addValidations', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should fail if no fielType is selected', fakeAsync(() => {
            spyOn(console, 'error');

            service.addValidations(); tick(600);

            expect(console.error).toHaveBeenCalled();
        }));

        it('should provide styles of the fieldType', fakeAsync(() => {
            let validations;
            service.getElement().subscribe(result => {
                validations = _.find(result, obj => { return obj['name'] === 'validations'; });
            });
            expect(validations).toBeUndefined();

            service.updateElement(new FormGroup({ fieldType: new FormControl('input') })); tick(600);

            service.addValidations(); tick(600);

            expect(validations).toBeDefined();
        }));

        it('should log an error if validations exist', fakeAsync(() => {
            let validations;
            service.getElement().subscribe(result => {
                validations = _.find(result, obj => { return obj['name'] === 'validations'; });
            });

            service.updateElement(new FormGroup({ fieldType: new FormControl('input') })); tick(600);

            service.addValidations(); tick(600);

            spyOn(console, 'error');

            service.addValidations(); tick(600);

            expect(console.error).toHaveBeenCalled();
        }));
    });

    describe('cancelElement', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should not fail', () => {
            service.cancelElement();
        });

        describe('with defined element', () => {
            let element;

            beforeEach(fakeAsync(() => {
                service.getElement().subscribe(result => {
                    element = result;
                });

                service.updateElement(new FormGroup({ fieldType: new FormControl('input') }));
                tick(600);

                service.addValidations();
                service.addStyles();

                tick(600);
            }));

            it('should reset the element', fakeAsync(() => {
                expect(element.length).toBeGreaterThan(0);

                service.cancelElement(); tick(25);

                expect(element.length).toEqual(0);
            }));

            it('should reset the preview element', fakeAsync(() => {
                let preview;
                service.getElementPreview().subscribe(result => {
                    preview = result;
                });
                expect(preview.length).toBeGreaterThan(0);

                service.cancelElement(); tick(25);

                expect(preview.length).toEqual(0);
            }));

            it('should reset hasValidation', fakeAsync(() => {
                let hasValidation;
                service.getElementHasValidations().subscribe(result => {
                    hasValidation = result;
                });
                expect(hasValidation).toBe(true);

                service.cancelElement(); tick(25);

                expect(hasValidation).toBe(false);
            }));

            it('should reset hasStyles', fakeAsync(() => {
                let hasStyles;
                service.getElementHasStyles().subscribe(result => {
                    hasStyles = result;
                });
                expect(hasStyles).toBe(true);

                service.cancelElement(); tick(25);

                expect(hasStyles).toBe(false);
            }));
        });
    });

    describe('removeElement', () => {
        let service: FormElementService;
        let form: FormService;

        beforeEach(inject([FormElementService, FormService], (formElement: FormElementService, formService: FormService) => {
            service = formElement;
            form = formService;
        }));

        it('should remove the edited element from the form', () => {
            service.removeElement();
        });

        it('should trigger the remove function in formService', () => {
            spyOn(form, 'removeElement');

            service.removeElement();

            expect(form.removeElement).toHaveBeenCalled();
        });

        it('should remove the element from the form by name', fakeAsync(() => {
            let element;
            service.getElement().subscribe(result => {
                element = result;
            });

            service.updateElement(new FormGroup({ fieldType: new FormControl('input'), name: new FormControl('fakeElement') })); tick(600);

            spyOn(form, 'removeElement');

            service.removeElement(); tick(600);

            expect(form.removeElement).toHaveBeenCalledWith(_.find(element, obj => _.isEqual(obj['name'], 'name')));
        }));

        it('should reset the element on success', fakeAsync(() => {
            let element;
            service.getElement().subscribe(result => {
                element = result;
            });

            service.updateElement(new FormGroup({ fieldType: new FormControl('input') })); tick(600);

            expect(element.length).toBeGreaterThan(0);

            spyOn(form, 'removeElement').and.returnValue(true);

            service.removeElement(); tick(600);

            expect(element.length).toEqual(0);
        }));
    });

    describe('saveElement', () => {
        let service: FormElementService;
        let form: FormService;
        let alert: AlertService;

        beforeEach(inject([FormElementService, FormService, AlertService],
            (formElement: FormElementService, formService: FormService, alertService: AlertService) => {
            service = formElement;
            form = formService;
            alert = alertService;
        }));

        it('should save the created element into the form', () => {
            service.saveElement(new Fields.FieldName());
        });

        it('should add the element to form', () => {
            spyOn(form, 'addElementToForm');

            service.saveElement(new Fields.FieldName());

            expect(form.addElementToForm).toHaveBeenCalled();
        });

        it('should setAlert on failure', () => {
            spyOn(form, 'addElementToForm').and.returnValue(false);
            spyOn(alert, 'setAlert');

            service.saveElement(new Fields.FieldName());

            expect(alert.setAlert).toHaveBeenCalled();
        });

        it('should setSuccessHint on success', () => {
            spyOn(form, 'addElementToForm').and.returnValue(true);
            spyOn(alert, 'setSuccessHint');

            service.saveElement(new Fields.FieldName());

            expect(alert.setSuccessHint).toHaveBeenCalled();
        });

        it('should reset when no mode is given', fakeAsync(() => {
            let element;
            service.getElement().subscribe(result => {
                element = result;
            });

            service.updateElement(new FormGroup({ fieldType: new FormControl('input') })); tick(600);

            expect(element.length).toBeGreaterThan(0);

            spyOn(form, 'addElementToForm').and.returnValue(true);

            service.saveElement(new Fields.FieldName()); tick(600);

            expect(element.length).toEqual(0);
        }));

        it('should reset when add-mode is given', fakeAsync(() => {
            let element;
            service.getElement().subscribe(result => {
                element = result;
            });

            service.updateElement(new FormGroup({ fieldType: new FormControl('input') })); tick(600);

            expect(element.length).toBeGreaterThan(0);

            spyOn(form, 'addElementToForm').and.returnValue(true);

            service.saveElement(new Fields.FieldName(), 'add'); tick(600);

            expect(element.length).toEqual(0);
        }));

        it('should not reset when clone-mode is given', fakeAsync(() => {
            let element;
            service.getElement().subscribe(result => {
                element = result;
            });

            service.updateElement(new FormGroup({ fieldType: new FormControl('input') })); tick(600);

            expect(element.length).toBeGreaterThan(0);

            spyOn(form, 'addElementToForm').and.returnValue(true);

            service.saveElement(new Fields.FieldName(), 'clone'); tick(600);

            expect(element.length).toBeGreaterThan(0);
        }));
    });

    describe('toggleElementPreview', () => {
        let service: FormElementService;

        beforeEach(inject([FormElementService], (formElement: FormElementService) => {
            service = formElement;
        }));

        it('should not fail', () => {
            service.toggleElementPreview();
        });

        it('should change hasPreview', fakeAsync(() => {
            let hasPreview;
            service.getElementHasPreview().subscribe(result => {
                hasPreview = result;
            });

            expect(hasPreview).toEqual(false);

            service.toggleElementPreview(); tick(25);

            expect(hasPreview).toEqual(true);

            service.toggleElementPreview(); tick(25);

            expect(hasPreview).toEqual(false);
        }));

        it('should should not be affected by cancelElement', fakeAsync(() => {
            let hasPreview;
            service.getElementHasPreview().subscribe(result => {
                hasPreview = result;
            });

            expect(hasPreview).toEqual(false);

            service.toggleElementPreview(); tick(25);

            expect(hasPreview).toEqual(true);

            service.cancelElement(); tick(600);

            expect(hasPreview).toEqual(true);

            service.toggleElementPreview(); tick(25);

            expect(hasPreview).toEqual(false);
        }));
    });
});
