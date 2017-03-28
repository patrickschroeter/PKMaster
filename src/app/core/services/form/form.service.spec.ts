/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { Observable, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';

import { FormService } from './form.service';
import { AlertService, AlertMock } from 'app/modules/alert';

import {
    FormMock,
    FormElementMock,
    FormApiMock
} from './../';

import { Fields } from 'app/models';

import { FormApi, FormDetailDto, FieldDto, FormCreateDto } from 'app/swagger';

import { TranslationProviderMock } from 'app/modules/translation/translation.module';

describe('Service: Form', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormService,
                { provide: AlertService, useClass: AlertMock },
                { provide: FormApi, useClass: FormApiMock },
                ...TranslationProviderMock
            ]
        });
    });

    it('should ...', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));

    describe('getAddingElement', () => {
        /** getAddingElement + setAddingElement */
        it('should provide the isAddingElement flag using setAddingElement', inject([FormService], (service: FormService) => {
            let element: boolean;
            service.getAddingElement().subscribe((result: boolean) => {
                element = result;
            });
            expect(element).toBeUndefined();
            service.setAddingElement(true);
            expect(element).toBe(true);
            service.setAddingElement(false);
            expect(element).toBe(false);
        }));
    });

    describe('getFormById', () => {
        let service: FormService;
        let api: FormApi;

        beforeEach(inject([FormService, FormApi], (formService: FormService, formApi: FormApi) => {
            service = formService;
            api = formApi;
        }));

        it('should request the form with the given id', () => {
            spyOn(api, 'getFormById').and.returnValue(new Observable((obs: Observer<any>) => { obs.next('value'); }));
            service.getFormById('someId').subscribe(() => {
                expect(api.getFormById).toHaveBeenCalledWith('someId');
            });
        });
    });

    describe('getForms', () => {
        let service: FormService;
        let api: FormApi;

        beforeEach(inject([FormService, FormApi], (formService: FormService, formApi: FormApi) => {
            service = formService;
            api = formApi;
        }));

        it('should request all forms', () => {
            spyOn(api, 'getForms').and.returnValue(new Observable((obs: Observer<any>) => { obs.next('value'); }));
            service.getForms().subscribe(() => {
                expect(api.getForms).toHaveBeenCalled();
            });
        });
    });

    describe('createNewForm', () => {
        let service: FormService;
        let api: FormApi;

        beforeEach(inject([FormService, FormApi], (formService: FormService, formApi: FormApi) => {
            service = formService;
            api = formApi;
        }));

        it('should send the new form', () => {
            spyOn(api, 'addForm').and.returnValue(new Observable((obs: Observer<any>) => { obs.next('value'); }));
            service.createNewForm({} as any).subscribe(() => {
                expect(api.addForm).toHaveBeenCalled();
            });
        });

        it('should prepare the new form (title restrictedAccess, isPublic, formHasField)', () => {
            spyOn(api, 'addForm').and.returnValue(new Observable((obs: Observer<any>) => { obs.next('value'); }));
            const submit: FormDetailDto = {
                title: 'titel des tests',
                restrictedAccess: true
            } as any;
            service.createNewForm(submit).subscribe(() => {
                expect(api.addForm).toHaveBeenCalledWith(new FormCreateDto({
                    title: submit.title,
                    restrictedAccess: submit.restrictedAccess,
                } as any));
            });
        });
    });

    describe('editElementError', () => {
        let service: FormService;
        let alert: AlertService;

        beforeEach(inject([FormService, AlertService], (formService: FormService, alertService: AlertService) => {
            service = formService;
            alert = alertService;
        }));

        it('should reset isAdding', () => {
           let isAdding: boolean;
           service.getAddingElement().subscribe((result: boolean) => {
               isAdding = result;
           });

           expect(isAdding).toBeUndefined();

           service.editElementError('some');

           expect(isAdding).toBe(false);
        });

        it('should trigger an alert', () => {
            spyOn(alert, 'setAlert');

            service.editElementError('some');

            expect(alert.setAlert).toHaveBeenCalled();
        });
    });

    describe('editElementOfForm', () => {
        let service: FormService;

        beforeEach(inject([FormService], (formService: FormService) => {
            service = formService;
        }));

        it('should emit null if no form is cached', () => {
            let element: FieldDto;
            service.onEditElement().subscribe((result: FieldDto) => {
                element = result;
            });
            expect(element).toBeUndefined();

            service.editElementOfForm(new Fields.Email);

            expect(element).toBeNull();
        });

        it('should emit the element if it is in the cached form', () => {
            let element: FieldDto;
            service.onEditElement().subscribe((result: FieldDto) => {
                element = result;
            });

            service.getFormById('id').subscribe(result => {
                const field: FieldDto = {
                    name: 'firstname'
                } as any;
                service.editElementOfForm(field);
                expect(element).toEqual(field);
            });
        });

        it('should emit null if the element is not in the cached form', () => {
            let element: FieldDto;
            service.onEditElement().subscribe((result: FieldDto) => {
                element = result;
            });

            service.getFormById('id').subscribe(result => {
                service.editElementOfForm({
                    name: 'header02'
                } as any);
                expect(element).toBeNull();
            });
        });

        it('should set isAdding', () => {
            let isAdding: boolean;
            service.getAddingElement().subscribe((result: boolean) => {
                isAdding = result;
            });

            expect(isAdding).toBeUndefined();

            service.getFormById('id').subscribe(result => {
                service.editElementOfForm(null);

                expect(isAdding).toBe(true);
            });
        });

        it('should emit null if the cached form has no fields', () => {
            let element: FieldDto;
            service.onEditElement().subscribe((result: FieldDto) => {
                element = result;
            });
            expect(element).toBeUndefined();

            service.getFormById('id').subscribe(result => {
                result.formHasField = null;
                service.editElementOfForm(new Fields.Email);
                expect(element).toBeNull();
            });
        });
    });

    describe('removeElementOfForm', () => {

        describe('when no element is edited', () => {
            let service: FormService;

            beforeEach(inject([FormService], (formService: FormService) => {
                service = formService;
            }));

            it('should return false if the element is in the form but no index is given (by value)', () => {
                service.getFormById('id').subscribe(result => {
                    expect(service.removeElement({ value: 'firstname' } as any)).toBe(false);
                });
            });

            it('should return false if the element is in the form but no index is given (by name)', () => {
                service.getFormById('id').subscribe(result => {
                    expect(service.removeElement({ name: 'firstname' } as any)).toBe(false);
                });
            });

            it('should return false if the element is in the form and a wrong index is given', () => {
                service.getFormById('id').subscribe(result => {
                    expect(service.removeElement({ name: 'firstname' } as any, 2)).toBe(false);
                });
            });

            it('should return true if the element is in the form and a right index is given', () => {
                service.getFormById('id').subscribe(result => {
                    expect(service.removeElement({ name: 'firstname' } as any, 1)).toBe(true);
                });
            });

        });

        describe('when an element is beeing edited', () => {
            let service: FormService;

            beforeEach(inject([FormService], (formService: FormService) => {
                service = formService;
            }));

            it('should return true if the element is in the form but no index is given (by value)', () => {
                service.getFormById('id').subscribe(result => {
                    service.editElementOfForm({ name: 'firstname'} as any);
                    expect(service.removeElement({ value: 'firstname' } as any)).toBe(true);
                });
            });

            it('should return false if the element is in the form but no index is given (by name)', () => {
                service.getFormById('id').subscribe(result => {
                    service.editElementOfForm({ name: 'firstname'} as any);
                    expect(service.removeElement({ name: 'firstname' } as any)).toBe(false);
                });
            });

            it('should return false if the element is in the form and a wrong index is given', () => {
                service.getFormById('id').subscribe(result => {
                    service.editElementOfForm({ name: 'firstname'} as any);
                    expect(service.removeElement({ name: 'firstname' } as any, 2)).toBe(false);
                });
            });

            it('should return true if the element is in the form and a right index is given', () => {
                service.getFormById('id').subscribe(result => {
                    service.editElementOfForm({ name: 'firstname'} as any);
                    expect(service.removeElement({ name: 'firstname' } as any, 1)).toBe(true);
                });
            });

        });
    });

    describe('addElementToForm', () => {

        /**
         * editingIndex: null
         * name: unique
         */
        describe('when name is unique and it\'s a new element', () => {
            let service: FormService;

            beforeEach(inject([FormService], (formService: FormService) => {
                service = formService;
            }));

            it('should return true', () => {
                service.getFormById('id').subscribe(form => {
                    expect(service.addElementToForm({
                        name: 'unique_name'
                    } as any)).toBe(true);
                });
            });

            it('should add the new element at the end of the form', () => {
                service.getFormById('id').subscribe(form => {
                    const elements = form.formHasField.length;
                    service.addElementToForm({
                        name: 'unique_name'
                    } as any);
                    expect(form.formHasField.length).toEqual(elements + 1);
                });
            });
        });

        /**
         * editingIndex: null
         * name: not unique
         */
        describe('when name is not unique and it\'s a new element', () => {
            let service: FormService;

            beforeEach(inject([FormService], (formService: FormService) => {
                service = formService;
            }));

            it('should return false', () => {
                service.getFormById('id').subscribe(form => {
                    expect(service.addElementToForm({
                        name: 'firstname'
                    } as any)).toBe(false);
                });
            });
        });

        /**
         * editingIndex: index
         * name: unique
         */
        describe('when name is unique and it\'s an existing element', () => {
            let service: FormService;

            beforeEach(inject([FormService], (formService: FormService) => {
                service = formService;
            }));

            it('should return true', () => {
                service.getFormById('id').subscribe(form => {
                    service.editElementOfForm({
                        name: 'firstname'
                    } as any);
                    expect(service.addElementToForm({
                        name: 'unique_name'
                    } as any)).toBe(true);
                });
            });

            it('should update the element at the given index', () => {
                service.getFormById('id').subscribe(form => {
                    const index = _.findIndex(form.formHasField, obj => obj.name === 'firstname');
                    service.editElementOfForm({
                        name: 'firstname'
                    } as any);
                    expect(form.formHasField[index].name).toEqual('firstname');
                    service.addElementToForm({
                        name: 'unique_name'
                    } as any);
                    expect(form.formHasField[index].name).toEqual('unique_name');
                });
            });
        });

        /**
         * editingIndex: index
         * name: element
         */
        describe('when it\'s an existing element with same name', () => {
            let service: FormService;

            beforeEach(inject([FormService], (formService: FormService) => {
                service = formService;
            }));

            it('should return true', () => {
                service.getFormById('id').subscribe(form => {
                    service.editElementOfForm({
                        name: 'firstname'
                    } as any);
                    expect(service.addElementToForm({
                        name: 'firstname'
                    } as any)).toBe(true);
                });
            });

            it('should update the element at the given index', () => {
                service.getFormById('id').subscribe(form => {
                    const index = _.findIndex(form.formHasField, obj => obj.name === 'firstname');
                    service.editElementOfForm({
                        name: 'firstname'
                    } as any);
                    expect(form.formHasField[index].fieldType).toEqual('input');
                    service.addElementToForm({
                        name: 'firstname',
                        fieldType: 'h4'
                    });
                    expect(form.formHasField[index].fieldType).toEqual('h4');
                });
            });
        });

        /**
         * editingIndex: index
         * name: not unique
         */
        describe('when it\'s an existing element with different not unique name', () => {
            let service: FormService;

            beforeEach(inject([FormService], (formService: FormService) => {
                service = formService;
            }));

            it('should return false', () => {
                service.getFormById('id').subscribe(form => {
                    service.editElementOfForm({
                        name: 'firstname'
                    } as any);
                    expect(service.addElementToForm({
                        name: 'lastname'
                    } as any)).toBe(false);
                });
            });
        });

        /**
         * mode
         */
        describe('when no mode is given', () => {
            let service: FormService;

            beforeEach(inject([FormService], (formService: FormService) => {
                service = formService;
            }));

            it('should reset edit mode', () => {
                let isAdding: boolean;
                service.getAddingElement().subscribe((result: boolean) => {
                    isAdding = result;
                });
                service.getFormById('id').subscribe(form => {
                    service.addElementToForm({
                        name: 'unique_name'
                    } as any);
                    expect(isAdding).toBe(false);
                });
            });
        });
    });

    describe('addPresetToForm', () => {

        let service: FormService;

        beforeEach(inject([FormService], (formService: FormService) => {
            service = formService;
        }));

        it('should not fail', () => {
            // TODO: when implemented
            service.getFormById('id').subscribe(form => {
                expect(service.addPresetToForm('preset')).toBe(true);
            });
        });
    });

    describe('getEditFormTemplate', () => {

        let service: FormService;

        beforeEach(inject([FormService], (formService: FormService) => {
            service = formService;
        }));

        it('should return the Field Config for the create Form Overlay if no id is given', () => {
            service.getEditFormTemplate().subscribe(fields => {
                expect(fields[0].value).toEqual('');
            });
        });

        it('should return the Field Config for the create Form Overlay if no form is available', () => {
            service.getEditFormTemplate('id').subscribe(fields => {
                expect(fields[0].value).toEqual('');
            });
        });

        it('should return the Field Config for the Edit Form Overlay if an id is given', () => {
            service.getFormById('id').subscribe(form => {
                service.getEditFormTemplate('id').subscribe(fields => {
                    expect(fields[0].value).toEqual('Notennachberechnung');
                });
            });
        });
    });

    describe('saveFormAttributes', () => {

        let service: FormService;
        let api: FormApi;

        beforeEach(inject([FormService, FormApi], (formService: FormService, formApi: FormApi) => {
            service = formService;
            api = formApi;
        }));

        it('should save the attributes but keep required old ones', () => {
            service.getFormById('id').subscribe(form => {
                const created = form.created;
                service.saveFormAttributes({
                    title: 'New Title'
                } as any).subscribe(result => {
                    expect(created).toBe(result.created);
                    expect(result.title).toEqual('New Title');
                });
            });
        });
    });

    describe('saveForm', () => {

        let service: FormService;
        let api: FormApi;

        beforeEach(inject([FormService, FormApi], (formService: FormService, formApi: FormApi) => {
            service = formService;
            api = formApi;
        }));

        it('should call api.updateFormById', () => {
            spyOn(api, 'updateFormById').and.callThrough();
            service.getFormById('id').subscribe(form => {
                const param = new FormDetailDto(form);
                service.saveForm().subscribe(result => {
                    expect(api.updateFormById).toHaveBeenCalled();
                });
            });
        });
    });
});
