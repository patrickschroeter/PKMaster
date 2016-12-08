import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FormService, AlertService, FormElementService } from './../../../core';
import { Field } from './../../../swagger';

@Component({
    selector: 'pk-forms-edit',
    templateUrl: './forms-edit.component.html',
    styleUrls: ['./forms-edit.component.scss'],
    providers: [
        FormElementService
    ]
})
export class FormsEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    /** The form to edit */
    private form;
    /** The form to edit the Form attributes */
    private editForm;
    /** Flag if Add Element View is open */
    private addingElement: boolean = false;
    /** Flag if edit Form attributes overlay is open */
    private isEditingForm: boolean = false;

    private isPresetOverlay: boolean = false;
    private presets: { value: string, label: string }[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formService: FormService,
        private alert: AlertService,
        private elementService: FormElementService) { }


    ngOnInit() {

        /** Read Route Param and GET Form with param ID */
        this.activatedRoute.params.forEach((params: Params) => {
            this.alert.setLoading('getFormById', 'Loading Form...');
            this.formService.getFormById(params['id']).subscribe((form) => {
                this.alert.removeHint('getFormById');
                if (!form) { this.router.navigate(['/forms']); }
                this.form = form;
            }, error => {
                /** TODO: catch */
                this.router.navigate(['/forms']);
                this.alert.removeHint('getFormById');
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
    editElement(element: Field): void {
        this.formService.editElement(element);
    }

    /**
     * @description add a new element to the form
     * @return {void}
     */
    addElement(): void {
        this.formService.editElement();
    }

    addPreset(option?) {
        if (!option) {
            this.isPresetOverlay = true;
            this.presets = [
                {
                    value: 'devider',
                    label: 'Devider',
                },
                {
                    value: 'email-extern',
                    label: 'E-Mail (extern)',
                },
                {
                    value: 'matnr',
                    label: 'Matrikelnummer',
                }
            ]
        } else {
            if (this.formService.addPresetToForm(option.value)) {
                this.alert.setSuccessHint('add-preset', `Preset ${option.label} added.`);
            } else {
                this.alert.setAlert('Error', 'The given name (ID) is already in use. Please choose a new unique one.');
            }
            this.isPresetOverlay = false;
        }
    }

    togglePresetOverlay() {
        this.isPresetOverlay = !this.isPresetOverlay;
    }

    /**
     * @description remove the selected element from the form
     * @param {FormElement} element
     * @return {void}
     */
    removeElement(element: Field, index: number): void {
        this.formService.removeElement(element, index);
    }

    /**
     * @description toggle the edit form attribute overlay
     * @return {void}
     */
    toggleFormEditing(): void {
        this.isEditingForm = !this.isEditingForm;
    }
    /**
     * @description edit the form attributes
     * @return {void}
     */
    editFormAttributes(): void {
        this.formService.getEditFormTemplate(this.form.id).subscribe(form => {
            this.editForm = form;
            this.isEditingForm = true;
        });
    }

    /**
     * @description save the form attributes
     * @param {Form} form
     * @return {void}
     */
    saveFormAttributes(form): void {
        this.formService.saveFormAttributes(form).subscribe(success => {
            if (success) {
                this.isEditingForm = false;
                this.alert.setSuccessHint('form_attribute_saved', 'Form attributes saved.');
            }
        });
    }

    /**
     * @description push the current form to the api
     * @return {void}
     */
    saveForm(): void {
        this.formService.saveForm().subscribe(form => {
            this.alert.setSuccessHint('saveForm', 'Form Saved!');
        });
    }

    /**
     * @description Cancels the Editation of the Form
     * @return {void}
     */
    cancelForm(): void { }

}
