import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FormService, AlertService, FormElementService } from './../../../shared';
import { FormElement } from './../../../swagger';

@Component({
    selector: 'pk-forms-edit',
    templateUrl: './forms-edit.component.html',
    styleUrls: ['./forms-edit.component.scss'],
    host: {
        '[class.content--default]': 'true'
    },
    providers: [
        FormElementService
    ]
})
export class FormsEditComponent implements OnInit {

    /** The form to edit */
    private form;
    /** Flag if Add Element View is open */
    private addingElement: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formService: FormService,
        private alert: AlertService,
        private elementService: FormElementService ) { }


    ngOnInit() {

        /** Read Route Param and GET Form with param ID */
        this.activatedRoute.params.forEach((params: Params) => {
            this.formService.getFormById(+params['id']).subscribe((form) => {
                if (!form) this.router.navigate(['/forms']);
                this.form = form;
            });
        });

        /** subscribe to the add element flag */
        this.formService.getAddingElement().subscribe(addingElement => {
            this.addingElement = addingElement;
        });
    }

    /**
     * @description edit the selected form element
     * @param {FormElement} element
     * @return {void}
     */
    editElement(element: FormElement): void {
        this.formService.editElement(element);
    }

    /**
     * @description add a new element to the form
     * @return {void}
     */
    addElement(): void {
        this.formService.editElement();
    }

    /**
     * @description remove the selected element from the form
     * @param {FormElement} element
     * @return {void}
     */
    removeElement(element: FormElement): void {
        this.formService.removeElement(element);
    }

    /**
     * @description push the current form to the api
     * @return {void}
     */
    saveForm(): void {
        this.formService.saveForm();
    }

    /**
     * @description Cancels the Editation of the Form
     * @return {void}
     */
    cancelForm(): void { }

}
