import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    FormService,
    FormElementService,
    PermissionService
} from 'app/core';
import { AlertService } from 'app/modules/alert';
import {
    OverlayComponent,
    ModalService
} from 'app/modules/overlay';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { FieldDto, FormDetailDto } from 'app/swagger';
import { Selectable } from './../../../models';

import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * A service taking care of adding/removing elements to a form
 *
 * @export
 * @class FormsEditComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-forms-edit',
    templateUrl: './forms-edit.component.html',
    styleUrls: ['./forms-edit.component.scss'],
    providers: [
        FormElementService
    ]
})
export class FormsEditComponent implements OnInit, OnAccess {

    /**
     * Default Content Class for Styling
     *
     * @memberOf FormsEditComponent
     */
    @HostBinding('class') classes = 'content--default';

    /**
     * Attribute Overlay Component
     *
     * @type {OverlayComponent}
     * @memberOf FormsEditComponent
     */
    @ViewChild('overlayAttributes') overlayAttributes: OverlayComponent;

    /**
     * The form to edit
     *
     * @private
     * @type {Form}
     * @memberOf FormsEditComponent
     */
    private _form: FormDetailDto;

    /**
     * getter method for _form
     *
     * @memberOf FormsEditComponent
     */
    get form() { return this._form; }

    /**
     * setter method for _form
     *
     * @memberOf FormsEditComponent
     */
    set form(form: FormDetailDto) { this._form = form; }

    /**
     * The form to edit the Form attributes
     *
     * @private
     * @type {Field[]}
     * @memberOf FormsEditComponent
     */
    private _editForm: FieldDto[];

    /**
     * getter method for _editForm
     *
     * @memberOf FormsEditComponent
     */
    get editForm() { return this._editForm; }

    /**
     * setter method for _editForm
     *
     *
     * @memberOf FormsEditComponent
     */
    set editForm(form: FieldDto[]) { this._editForm = form; }

    /**
     * Flag if Add Element View is open
     *
     * @private
     * @type {Boolean}
     * @memberOf FormsEditComponent
     */
    public addingElement: Boolean = false;

    /**
     * Creates an instance of FormsEditComponent.
     *
     * @param {Router} router
     * @param {ActivatedRoute} activatedRoute
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     * @param {ModalService} modalService
     * @param {FormService} formService
     * @param {FormElementService} elementService
     *
     * @memberOf FormsEditComponent
     */
    constructor(
        /** Angular */
        private router: Router,
        private activatedRoute: ActivatedRoute,
        /** Modules */
        public alert: AlertService,
        private translationService: TranslationService,
        private modalService: ModalService,
        /** Services */
        private formService: FormService,
        private elementService: FormElementService,
        public permission: PermissionService
    ) { }

    /**
     * implement OnInit Interface
     *
     * @memberOf FormsEditComponent
     */
    ngOnInit() {

        /** Read Route Param and GET Form with param ID */
        this.getForm();

        /** subscribe to the add element flag */
        this.formService.getAddingElement().subscribe((addingElement: boolean) => {
            this.addingElement = addingElement;
        });
    }

    /**
     * Read Route Param and GET Form with param ID
     *
     * @private
     *
     * @memberOf FormsEditComponent
     */
    @Access('ReadForms')
    private getForm(): void {
        this.activatedRoute.params.forEach((params: Params) => {
            this.formService.getFormById(params['id']).subscribe((form) => {
                if (!form) { this.router.navigate(['/forms']); }
                this.form = form;
            }, error => {
                /** TODO: catch */
                this.router.navigate(['/forms']);
                this.alert.setErrorHint('no-form-found', this.translationService.translate('errorNoFormWithId', [params['id']]), 2000);
            });
        });
    }

    /**
     *
     * edit the selected form element
     *
     * @param {Field} element
     *
     * @memberOf FormsEditComponent
     */
    @Access('EditForms')
    public editElement(element: FieldDto): void {
        this.formService.editElementOfForm(element);
    }

    /**
     * add a new element to the form
     *
     * @memberOf FormsEditComponent
     */
    @Access('EditForms')
    public addElement(): void {
        this.formService.editElementOfForm();
    }

    /**
     * add a preset element to the form
     *
     * @param {Selectable} [option]
     *
     * @memberOf FormsEditComponent
     */
    @Access('EditForms')
    public addPreset(option?: Selectable): void {
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
                list: presets,
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
     * remove the selected element from the form
     *
     * @param {Field} element
     * @param {Number} index
     *
     * @memberOf FormsEditComponent
     */
    @Access('EditForms')
    public removeElement(element: FieldDto, index: number): void {
        this.formService.removeElement(element, index);
    }

    /**
     * edit the form attributes
     *
     *
     * @memberOf FormsEditComponent
     */
    @Access('EditForms')
    public editFormAttributes(): void {
        this.formService.getEditFormTemplate(this.form.id).subscribe(form => {
            this.editForm = form;
            this.overlayAttributes.toggle(true);
        });
    }

    /**
     * save the form attributes
     *
     * @param {Form} form
     *
     * @memberOf FormsEditComponent
     */
    @Access('EditForms')
    public saveFormAttributes(form: FormDetailDto): void {
        const param: FormDetailDto = new FormDetailDto(this.form);
        param.requiresValidation = form.requiresValidation;
        param.title = form.title;
        param.restrictedAccess = form.restrictedAccess;

        this.formService.saveFormAttributes(param).subscribe(success => {
            this.alert.setSuccessHint('form_attribute_saved', this.translationService.translate('savedFormAttributes'));
            this.overlayAttributes.toggle(false);
            this.router.navigate(['/', 'forms', success.id, 'edit']);
        });
    }

    /**
     * push the current form to the api
     *
     * @memberOf FormsEditComponent
     */
    @Access('EditForms')
    public saveForm(): void {
        this.formService.saveForm().subscribe(form => {
            console.log(JSON.stringify(form));
            this.alert.setSuccessHint('saveForm', this.translationService.translate('savedForm'));
            this.router.navigate(['forms']);
        });
    }

    /**
     * Delete the form
     *
     * @memberOf FormsEditComponent
     */
    @Access('EditForms')
    public deleteForm(): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeleteFormHeader'),
            message: this.translationService.translate('confirmDeleteFormContent'),
            /**
             * callback on confirmation
             */
            confirm: () => {
                this.formService.removeForm(this.form.id).subscribe(result => {
                    this.router.navigate(['forms']);
                    this.modalService.destroyModal();
                }, error => {
                    this.modalService.destroyModal();
                    this.alert.setAlert(
                        this.translationService.translate('deleteFormErrorHeader'),
                        this.translationService.translate('deleteFormErrorContent')
                    );
                });
            }
        });
    }

}
