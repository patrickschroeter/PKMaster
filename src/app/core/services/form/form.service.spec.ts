/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormService } from './form.service';
import {
    AlertService,
    AlertMock
} from './../alert';

import {
    FormMock,
    FormElementMock,
    FormApiMock
} from './../';

import { FormApi } from './../../../swagger';

describe('Service: Form', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormService,
                { provide: AlertService, useClass: AlertMock },
                { provide: FormApi, useClass: FormApiMock }
            ]
        });
    });

    it('should ...', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));

    /** getAddingElement + setAddingElement */
    it('should provide access to the addingElement Variable', inject([FormService], (service: FormService) => {
        let element;
        service.getAddingElement().subscribe(result => {
            element = result;
        });
        expect(element).toBeFalsy();
        service.setAddingElement(true);
        expect(element).toBeTruthy();
        service.setAddingElement(false);
        expect(element).toBeFalsy();
    }));

    describe('Function: onEditElement', () => {
        /** onEditElement + next */
        it('should return null if the element is not in the form', inject([FormService], (service: FormService) => {
            let element;
            service.onEditElement().subscribe(result => {
                element = result;
            });
            expect(element).toBeUndefined();
            service.editElement(FormElementMock.FORMELEMENT);
            expect(element).toEqual(null);
        }));

        it('should provide the element if it is part of the form');
    });

    /** getFormById */
    it('should retrieve the database to get the requested form by id', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));
    it('should return the requested form if it\'s cached', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));

    /** createNewForm */
    it('should create a new form with the given title and return it', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));

    /** editElementError */
    it('should display an error via alert service', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));

    /** editElement */
    it('should edit the given element if it\'s part of the form', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));
    it('should create a new element if the given one is not part of the form', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));
    it('should create a new element if no element is given', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));

    /** removeElement */
    it('should remove the given element by the saved index', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));
    it('should do nothing if the given element is not in the form', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));
    it('should do nothing if no element is given', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));

    /** addElementToForm */
    it('should append the element to the form', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));
    it('should update the element by index', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));
    it('should show an error if the selected name for the new element is not unique', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));
    it('should show an error if the selected name for the existing element does math a different index', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));

    /** saveForm */
    it('should push the new form to the server', inject([FormService], (service: FormService) => {
        expect(service).toBeTruthy();
    }));
});
