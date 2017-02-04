import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

/** Forms */
import { FormService } from './../../core';

/** Models */
import { Form } from './../../swagger';

@Component({
    selector: 'pk-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private forms: Array<Object>;
    private _newForm: Array<any>;
    get newForm() { return this._newForm; }
    set newForm(form) { this._newForm = form; }

    constructor(private formService: FormService, private router: Router) { }

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
     */
    public createNewForm(form: Form) {
        this.formService.createNewForm(form).subscribe(created => {
            if (created['id']) {
                this.router.navigate([`/forms/`, created['id'], 'edit']);
            }
        });
    }

    /**
     * Delete the form
     */
     public deleteForm(form: Form) {
         console.error('TODO: deleteForm');
     }
}
