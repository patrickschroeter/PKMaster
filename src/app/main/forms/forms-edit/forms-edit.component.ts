import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FormService, FormElementService } from './../../../core';
import { AlertService } from './../../../modules/alert';
import {
    OverlayComponent,
    ModalService
} from './../../../modules/overlay';
import { TranslationService } from './../../../modules/translation';

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

    @ViewChild('overlayAttributes') overlayAttributes: OverlayComponent;

    /** The form to edit */
    private _form;
    get form() { return this._form; }
    set form(form) { this._form = form; }
    /** The form to edit the Form attributes */
    private _editForm;
    get editForm() { return this._editForm; }
    set editForm(form) { this._editForm = form; }
    /** Flag if Add Element View is open */
    private addingElement = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formService: FormService,
        private alert: AlertService,
        private elementService: FormElementService,
        private translationService: TranslationService,
        private modalService: ModalService
    ) { }


    ngOnInit() {

        /** Read Route Param and GET Form with param ID */
        this.activatedRoute.params.forEach((params: Params) => {
            this.alert.setLoading('getFormById', this.translationService.translate('loadingForm'));
            this.formService.getFormById(params['id']).subscribe((form) => {
                this.alert.removeHint('getFormById');
                if (!form) { this.router.navigate(['/forms']); }
                this.form = form;
            }, error => {
                /** TODO: catch */
                this.router.navigate(['/forms']);
                this.alert.removeHint('getFormById');
                this.alert.setErrorHint('no-form-found', this.translationService.translate('errorNoFormWithId', [params['id']]), 2000);
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
        this.formService.editElementOfForm(element);
    }

    /**
     * @description add a new element to the form
     * @return {void}
     */
    addElement(): void {
        this.formService.editElementOfForm();
    }

    addPreset(option?) {
        if (!option) {
            const presets = [
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
            ];

            this.modalService.createListModal({
                title: this.translationService.translate('addElementPreset'),
                list: [],
                click: this.addPreset.bind(this),
                emptyText: this.translationService.translate('noPresetsAvailable')
            });
        } else {
            if (this.formService.addPresetToForm(option.value)) {
                this.alert.setSuccessHint('add-preset', this.translationService.translate('addedPreset', [option.label]));
            } else {
                this.alert.setAlert(
                    this.translationService.translate('headerError'),
                    this.translationService.translate('usedId')
                );
            }
            this.modalService.destroyModal();
        }
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
     * @description edit the form attributes
     * @return {void}
     */
    editFormAttributes(): void {
        this.formService.getEditFormTemplate(this.form.id).subscribe(form => {
            this.editForm = form;
            this.overlayAttributes.toggle(true);
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
                this.overlayAttributes.toggle(false);
                this.alert.setSuccessHint('form_attribute_saved', this.translationService.translate('savedFormAttributes'));
            }
        });
    }

    /**
     * @description push the current form to the api
     * @return {void}
     */
    saveForm(): void {
        this.formService.saveForm().subscribe(form => {
            this.alert.setSuccessHint('saveForm', this.translationService.translate('savedForm'));
            this.router.navigate(['forms']);
        });
    }

}
