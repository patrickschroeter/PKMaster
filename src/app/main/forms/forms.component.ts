import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import { FormService } from './../../core';
import { ModalService } from './../../modules/overlay';
import { AlertService } from './../../modules/alert';
import { TranslationService } from './../../modules/translation';

/** Models */
import { FormDetailDto, FormListDto } from './../../swagger';

@Component({
    selector: 'pk-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public forms: FormListDto[];
    private _newForm: Array<any>;
    get newForm() { return this._newForm; }
    set newForm(form) { this._newForm = form; }

    constructor(
        /** Angular */
        private router: Router,
        /** Modules */
        private modalService: ModalService,
        private translationService: TranslationService,
        /** Services */
        private formService: FormService,
        private alert: AlertService
    ) { }

    ngOnInit() {
        this.formService.getForms().subscribe(result => {
            this.forms = result;
        });

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
    public activateForm(form: FormDetailDto): void {
        this.formService.activateForm(form.id).subscribe((result: FormDetailDto) => {
            const index = _.findIndex(this.forms, obj => obj.id === form.id);
            if (index > -1) {
                this.forms[index] = result;
            }
        });
    }
}
