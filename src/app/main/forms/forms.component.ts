import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import { FormService } from './../../core';
import { ModalService } from './../../modules/overlay';
import { TranslationService } from './../../modules/translation';

/** Models */
import { SingleFormDto } from './../../swagger';

@Component({
    selector: 'pk-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public forms: Array<SingleFormDto>;
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
     * @param {Form} form
     */
    public createNewForm(form: SingleFormDto) {
        this.formService.createNewForm(form).subscribe(created => {
            if (created['id']) {
                this.router.navigate([`/forms/`, created['id'], 'edit']);
            }
        });
    }

    /**
     * Delete the form
     * @param {Form} form
     */
    public deleteForm(form: SingleFormDto) {
        this.modalService.createConfirmationModal({
            title: this.translationService.translate('confirmDeleteFormHeader'),
            message: this.translationService.translate('confirmDeleteFormContent'),
            confirm: () => {
                this.formService.removeForm(form.id).subscribe(result => {
                    const index = _.findIndex(this.forms, (obj: SingleFormDto) => obj.id === form.id);
                    if (result && index !== -1) {
                        this.forms.splice(index, 1);
                    }
                    this.modalService.destroyModal();
                });
            }
        });
    }
}
