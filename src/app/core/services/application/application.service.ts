import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { FormService } from './../form';

import { Application } from './../../../swagger';

@Injectable()
export class ApplicationService {

    private application: Application;

    constructor(private formService: FormService) { }

    /**
     * @description returns the observable to get the new created form
     * @param {Form} form
     * @return {Observable}
     */
    createNewApplication(application: Application): Observable<Application> {
        // hack
        this.formService.getFormById(1).subscribe(form => {
            this.application.form.elements = form.elements;
        });
        // hack end
        this.application = {
            id: 17,
            form: {
                title: application['application-form']
            }
        };

        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.application);
                observer.complete();
            }, 200);
        });
    }

}
