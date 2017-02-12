/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable, Observer } from 'rxjs/Rx';
import { AlertService } from './alert.service';

/** Models */
import { Message, Alert } from './../../../../models';

describe('Service: Alert', () => {
    const id = 'id', message = 'message', title = 'title';
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AlertService]
        });
    });

    it('should ...', inject([AlertService], (service: AlertService) => {
        expect(service).toBeTruthy();
    }));

    describe('Function: get<>', () => {
        it('should create and provide', inject([AlertService], (service: AlertService) => {
            expect(service.getAlert()).toEqual(jasmine.any(Observable));
            expect(service.getHintMessages()).toEqual(jasmine.any(Observable));
        }));
    });

    it('should stream the alert to all subscribers', inject([AlertService], (service: AlertService) => {
        let response: Alert;
        service.getAlert().subscribe(result => {
            response = result;
        });
        expect(response).toBeUndefined();

        service.setAlert(title, message);

        expect(response).toBeDefined();
        expect(response.title).toEqual(title);
        expect(response.message).toEqual(message);
    }));

    it('Function: setErrorHint should add an hint and stream the updated hint', inject([AlertService], (service: AlertService) => {
        let response: Message[];
        service.getHintMessages().subscribe(result => { response = result; });
        expect(response).toBeUndefined();

        service.setErrorHint(id, message);

        expect(response).toBeDefined();
        expect(response.length).toBe(1);
        expect(response[0].id).toBe(id);
        expect(response[0].message).toBe(message);
        expect(response[0].type).toBe('error');
    }));

    it('Function: setLoading should add a loading', inject([AlertService], (service: AlertService) => {
        let response: Message[];
        service.getHintMessages().subscribe(result => { response = result; });
        expect(response).toBeUndefined();

        service.setLoading(id, message);

        expect(response).toBeDefined();
        expect(response.length).toBe(1);
        expect(response[0].id).toBe(id);
        expect(response[0].message).toBe(message);
        expect(response[0].type).toBe('loading');
    }));

    it('Function: setSuccessHint should add a success hint', inject([AlertService], (service: AlertService) => {
        let response: Message[];
        service.getHintMessages().subscribe(result => { response = result; });
        expect(response).toBeUndefined();

        service.setSuccessHint(id, message);

        expect(response).toBeDefined();
        expect(response.length).toBe(1);
        expect(response[0].id).toBe(id);
        expect(response[0].message).toBe(message);
        expect(response[0].type).toBe('success');
    }));

    describe('Function: setTooltip', () => {
        it('should add a tooltip', inject([AlertService], (service: AlertService) => {
            let response: Message[];
            service.getHintMessages().subscribe(result => { response = result; });
            expect(response).toBeUndefined();

            service.setTooltip(message);

            expect(response).toBeDefined();
            expect(response.length).toBe(1);
            expect(response[0].id).toBe('tooltip');
            expect(response[0].message).toBe(message);
            expect(response[0].type).toBe('tooltip');
        }));
        it('should replace an existing a tooltip', inject([AlertService], (service: AlertService) => {
            let response: Message[];
            service.getHintMessages().subscribe(result => { response = result; });
            expect(response).toBeUndefined();

            service.setTooltip(message);
            service.setTooltip('message2');

            expect(response).toBeDefined();
            expect(response.length).toBe(1);
            expect(response[0].id).toBe('tooltip');
            expect(response[0].message).toBe('message2');
            expect(response[0].type).toBe('tooltip');
        }));
        it('should disappear after a default time', fakeAsync(inject([AlertService], (service: AlertService) => {
            let response: Message[];
            service.getHintMessages().subscribe(result => { response = result; });
            service.setTooltip(message);

            tick(999);

            expect(response).toBeDefined();
            expect(response.length).toBe(1);

            tick(2);

            expect(response.length).toBe(0);
        })));
        it('should disappear after a given time', fakeAsync(inject([AlertService], (service: AlertService) => {
            let response: Message[];
            service.getHintMessages().subscribe(result => { response = result; });
            service.setTooltip(message, 1500);

            tick(1499);

            expect(response).toBeDefined();
            expect(response.length).toBe(1);

            tick(2);

            expect(response.length).toBe(0);
        })));
        it('should refresh timeout on new call', fakeAsync(inject([AlertService], (service: AlertService) => {
            let response: Message[];
            service.getHintMessages().subscribe(result => { response = result; });
            service.setTooltip(message);

            tick(800);

            expect(response).toBeDefined();
            expect(response.length).toBe(1);

            service.setTooltip(message);

            tick(800);

            expect(response.length).toBe(1);

            tick(800);

            expect(response.length).toBe(0);
        })));
    });

    describe('Function: removeHint', () => {

        it('should do nothing if the given id is invalid', inject([AlertService], (service: AlertService) => {
            let response: Message[];
            service.getHintMessages().subscribe(result => { response = result; });

            service.setErrorHint(id, message);

            service.removeHint('someid');

            expect(response).toBeDefined();
            expect(response.length).toBe(1);
        }));

        it('should remove the hint/loading/error/success with the given id', inject([AlertService], (service: AlertService) => {
            let response: Message[];
            service.getHintMessages().subscribe(result => { response = result; });

            service.setErrorHint(id, message);

            service.removeHint(id);

            expect(response).toBeDefined();
            expect(response.length).toBe(0);
        }));

    });
});
