/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs/Rx';
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

        beforeEach(
            fakeAsync(inject([FormElementService], (formElement: FormElementService) => {
                service = formElement;
                formGroup = new FormGroup({
                    fieldType: new FormControl(),
                    optionTable: new FormControl(),
                    options: new FormControl(),
                    name: new FormControl()
                });


                elementForm = [];
                tick(600);
            }))
        );

        describe('selectedType', () => {

            it('should update the ElementForm when a new fieldType is selected', fakeAsync(() => {
                service.getElement().subscribe(obj => {
                    elementForm = obj;
                });
                expect(elementForm.length).toBe(1);

                /** select a value */
                formGroup.get('fieldType').setValue('input');
                service.updateElement(formGroup); tick(600);

                expect(elementForm.length).toBeGreaterThan(1);
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
                expect(elementForm.length).toBe(1);
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
                expect(elementForm.length).toBe(1);
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
                }); tick(600);
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

        beforeEach(
            fakeAsync(inject([FormElementService], (formElement: FormElementService) => {
                service = formElement;
                tick(600);
            }))
        );

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

        beforeEach(
            fakeAsync(inject([FormElementService], (formElement: FormElementService) => {
                service = formElement;
                tick(600);
            }))
        );

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

        beforeEach(
            fakeAsync(inject([FormElementService], (formElement: FormElementService) => {
                service = formElement;
                tick(600);
            }))
        );

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

                expect(element.length).toEqual(1);
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

        beforeEach(
            fakeAsync(inject([FormElementService, FormService], (formElement: FormElementService, formService: FormService) => {
                service = formElement;
                form = formService;
                tick(600);
            }))
        );

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

            expect(element.length).toEqual(1);
        }));
    });

    describe('saveElement', () => {
        let service: FormElementService;
        let form: FormService;
        let alert: AlertService;

        beforeEach(
            fakeAsync(inject([FormElementService, FormService, AlertService],
            (formElement: FormElementService, formService: FormService, alertService: AlertService) => {
                service = formElement;
                form = formService;
                alert = alertService;
                tick(600);
            }))
        );

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

            expect(element.length).toBeGreaterThan(1);

            spyOn(form, 'addElementToForm').and.returnValue(true);

            service.saveElement(new Fields.FieldName()); tick(600);

            expect(element.length).toEqual(1);
        }));

        it('should reset when add-mode is given', fakeAsync(() => {
            let element;
            service.getElement().subscribe(result => {
                element = result;
            });

            service.updateElement(new FormGroup({ fieldType: new FormControl('input') })); tick(600);

            expect(element.length).toBeGreaterThan(1);

            spyOn(form, 'addElementToForm').and.returnValue(true);

            service.saveElement(new Fields.FieldName(), 'add'); tick(600);

            expect(element.length).toEqual(1);
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

        beforeEach(
            fakeAsync(inject([FormElementService], (formElement: FormElementService) => {
                service = formElement;
                tick(600);
            }))
        );

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

    describe('constructor()', () => {
        let form: FormService;
        let observer: Observer<Field>;

        beforeEach(
            inject([FormService], (formService: FormService) => {
            form = formService;

            form.onEditElement = function (): Observable<Field> {
                return new Observable((obs: Observer<Field>) => {
                    observer = obs;
                });
            };
        }));

        it('should create a new (reset) element when form.onEditElement emits an invalid value',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
                let element, styles, validations, preview;
                service.getElement().subscribe(result => { element = result; });
                service.getElementHasStyles().subscribe(result => { styles = result; });
                service.getElementHasValidations().subscribe(result => { validations = result; });
                service.getElementPreview().subscribe(result => { preview = result; });
                element = styles = validations = preview = null;

                observer.next(0); tick(600);

                expect(element.length).toEqual(1);
                expect(styles).toBe(false);
                expect(validations).toBe(false);
                expect(preview).toEqual([]);

                element = styles = validations = preview = null;

                observer.next(false); tick(600);

                expect(element.length).toEqual(1);
                expect(styles).toBe(false);
                expect(validations).toBe(false);
                expect(preview).toEqual([]);

                element = styles = validations = preview = null;

                observer.next(null); tick(600);

                expect(element.length).toEqual(1);
                expect(styles).toBe(false);
                expect(validations).toBe(false);
                expect(preview).toEqual([]);

                element = styles = validations = preview = null;

                observer.next(undefined); tick(600);

                expect(element.length).toEqual(1);
                expect(styles).toBe(false);
                expect(validations).toBe(false);
                expect(preview).toEqual([]);

                element = styles = validations = preview = null;

                observer.next(''); tick(600);

                expect(element.length).toEqual(1);
                expect(styles).toBe(false);
                expect(validations).toBe(false);
                expect(preview).toEqual([]);
            }))
        );

        it('should trigger form.editElementError when edit of an element fails',
            inject([FormElementService], (service: FormElementService) => {
            spyOn(service, 'editExistingElement').and.returnValue(false);
            spyOn(form, 'editElementError');

            observer.next(1);

            expect(form.editElementError).toHaveBeenCalled();
        }));

        it('should log an error when trying to edit an element if no types are loaded',
            inject([FormElementService], (service: FormElementService) => {
            spyOn(console, 'error');
            observer.next(1);
            expect(console.error).toHaveBeenCalled();
        }));

        it('should fail editing an element when recieving a number',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
            spyOn(form, 'editElementError'); tick(600);
            observer.next(1);
            expect(form.editElementError).toHaveBeenCalled();
        })));

        it('should fail editing an element when recieving a string',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
            spyOn(form, 'editElementError'); tick(600);
            observer.next('value');
            expect(form.editElementError).toHaveBeenCalled();
        })));

        it('should fail editing an element when recieving an empty array',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
            spyOn(form, 'editElementError'); tick(600);
            observer.next([]);
            expect(form.editElementError).toHaveBeenCalled();
        })));

        it('should fail editing an element when recieving an empty object',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
            spyOn(form, 'editElementError'); tick(600);
            observer.next({});
            expect(form.editElementError).toHaveBeenCalled();
        })));

        it('should fail editing an element if the FieldType is not supported',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
            spyOn(form, 'editElementError'); tick(600);
            observer.next({
                fieldType: '0'
            });
            expect(form.editElementError).toHaveBeenCalled();
        })));

        it('should not fail editing an element when the FieldType is supported',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
            spyOn(form, 'editElementError'); tick(600);
            observer.next({
                fieldType: 'input'
            }); tick(600);
            expect(form.editElementError).not.toHaveBeenCalled();
        })));

        it('should load the options of the fieldType',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
                let element: Field[];
                spyOn(form, 'editElementError'); tick(600);
                service.getElement().subscribe(result => {
                    element = result;
                });

                expect(element.length).toEqual(1);

                observer.next({
                    fieldType: 'input'
                }); tick(600);

                expect(element.length).toBeGreaterThan(1);
                expect(_.find(element, obj => obj.name === 'fieldType').value).toEqual('input');
            }))
        );

        it('should set hasSubmit if input is given',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
                tick(600);
                let element: Field[];
                let hasSubmit: boolean;

                service.getElementHasSubmit().subscribe(result => {
                    hasSubmit = result;
                });

                observer.next({
                    fieldType: 'input'
                }); tick(600);

                expect(hasSubmit).toBe(true);
            }))
        );

        it('should set hasStyles if styles are given',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
                tick(600);
                let element: Field[];
                let styles: boolean;

                service.getElementHasStyles().subscribe(result => {
                    styles = result;
                });

                observer.next({
                    fieldType: 'input',
                    styles: ['small']
                }); tick(600);

                expect(styles).toBe(true);
            }))
        );

        it('should set hasValidation if styles are given',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
                tick(600);
                let element: Field[];
                let validation: boolean;

                service.getElementHasValidations().subscribe(result => {
                    validation = result;
                });

                observer.next({
                    fieldType: 'input',
                    validations: ['small']
                }); tick(600);

                expect(validation).toBe(true);
            }))
        );

        it('should set styles if given even if invalid',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
                tick(600);
                let element: Field[];
                service.getElement().subscribe(result => {
                    element = result;
                });

                observer.next({
                    fieldType: 'input',
                    styles: ['invalid']
                }); tick(600);

                expect(_.find(element, obj => obj.name === 'styles').value).toEqual(['invalid']);
            }))
        );

        it('should set validations if given even if invalid',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
                tick(600);
                let element: Field[];
                service.getElement().subscribe(result => {
                    element = result;
                });

                observer.next({
                    fieldType: 'input',
                    validations: ['small']
                }); tick(600);

                expect(_.find(element, obj => obj.name === 'validations').value).toEqual(['small']);
            }))
        );

        it('should set options if no optionTable is set',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
                tick(600);
                let element: Field[];
                service.getElement().subscribe(result => {
                    element = result;
                });

                observer.next({
                    fieldType: 'select',
                    options: [{ value: 'a', label: 'b'}]
                }); tick(600);

                expect(_.find(element, obj => obj.name === 'options').value).toEqual([{ value: 'a', label: 'b'}]);
            }))
        );

        it('should not set options if optionTable is set',
            fakeAsync(inject([FormElementService], (service: FormElementService) => {
                tick(600);
                let element: Field[];
                service.getElement().subscribe(result => {
                    element = result;
                });

                observer.next({
                    fieldType: 'select',
                    optionTable: 'fakultaet',
                    options: [{ value: 'a', label: 'b'}]
                }); tick(1200);

                expect(_.find(element, obj => obj.name === 'options').value).toEqual([{ value: 'a', label: 'b'}]);
            }))
        );
    });
});
