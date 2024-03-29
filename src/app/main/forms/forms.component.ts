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

import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    FormService,
    PermissionService
} from 'app/core';
import { ModalService } from 'app/modules/overlay';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';
import { ListService, List } from 'app/shared';

/** Models */
import { FormDetailDto, FormListDto } from 'app/swagger';
import { OverlayComponent } from 'app/modules/overlay';

import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * FormsComponent
 *
 * @export
 * @class FormsComponent
 * @extends {List<FormListDto>}
 * @implements {OnInit}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss'],
    providers: [
        ListService
    ]
})
export class FormsComponent extends List<FormListDto> implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    @ViewChild(OverlayComponent) overlay: OverlayComponent;

    public forms: FormListDto[];
    private _newForm: Array<any>;
    get newForm() { return this._newForm; }
    set newForm(form) { this._newForm = form; }

    public list: FormListDto[];

    /**
     * Creates an instance of FormsComponent.
     * @param {Router} router
     * @param {ModalService} modalService
     * @param {TranslationService} translationService
     * @param {FormService} formService
     * @param {AlertService} alert
     * @param {PermissionService} permission
     * @param {ListService} listService
     *
     * @memberOf FormsComponent
     */
    constructor(
        /** Angular */
        private router: Router,
        /** Modules */
        private modalService: ModalService,
        private translationService: TranslationService,
        /** Services */
        private formService: FormService,
        public alert: AlertService,
        public permission: PermissionService,
        public listService: ListService
    ) {
        super(listService);
    }

    /**
     * implements OnInit
     *
     * @memberOf FormsComponent
     */
    ngOnInit() {
        this.getForms();
        this.getNewFormTemplate();
    }

    /**
     * get all forms from server
     *
     * @private
     *
     * @memberOf FormsComponent
     */
    @Access('ReadForms')
    private getForms(): void {
        this.formService.getForms().subscribe(result => {
            this.forms = result;

            this.initListDependencies(this.forms);
        });
    }

    /**
     * get the template to create a form
     *
     * @private
     *
     * @memberOf FormsComponent
     */
    @Access('EditForms')
    private getNewFormTemplate(): void {
        this.formService.getEditFormTemplate().subscribe(result => {
            this.newForm = result;
        });
    }

    /**
     * create a new form
     *
     * @param {FormDetailDto} form
     *
     * @memberOf FormsComponent
     */
    @Access('EditForms')
    public createNewForm(form: FormDetailDto): void {
        this.formService.createNewForm(form).subscribe(created => {
            if (created['id']) {
                this.router.navigate([`/forms/`, created['id'], 'edit']);
            }
        });
    }

    /**
     * Clone Form
     *
     * @param {FormListDto} form
     *
     * @memberOf FormsComponent
     */
    @Access('EditForms')
    public cloneForm(form: FormListDto): void {
        this.formService.getFormById(form.id).subscribe((result: FormDetailDto) => {
            result.title = 'Copy of ' + result.title;
            this.createNewForm(result);
        });
    }

    /**
     * Delete the form
     *
     * @param {FormDetailDto} form
     *
     * @memberOf FormsComponent
     */
    @Access('EditForms')
    public deleteForm(form: FormDetailDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeleteFormHeader'),
            message: this.translationService.translate('confirmDeleteFormContent'),
            confirm: () => {
                this.formService.removeForm(form.id).subscribe(result => {
                    const index = _.findIndex(this.forms, (obj: FormDetailDto) => obj.id === form.id);
                    if (result && index !== -1) {
                        this.forms.splice(index, 1);
                    }
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

    /**
     * activate the given form
     *
     * @param {FormDetailDto} form
     *
     * @memberOf FormsComponent
     */
    @Access('EditForms')
    public activateForm(form: FormDetailDto): void {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmActivateFormHeader'),
            message: this.translationService.translate('confirmActivateFormContent'),
            confirm: () => {
                this.formService.activateForm(form.id).subscribe((result: FormDetailDto) => {
                    const index = _.findIndex(this.forms, obj => obj.id === form.id);
                    if (index > -1) {
                        this.forms[index] = result;
                        this.initListDependencies(this.forms);
                    }
                    this.modalService.destroyModal();
                }, error => {
                    this.modalService.destroyModal();
                    this.alert.setAlert(
                        this.translationService.translate('activateFormErrorHeader'),
                        this.translationService.translate('activateFormErrorContent')
                    );
                });
            }
        });
    }
}
