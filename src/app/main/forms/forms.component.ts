import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { FormService } from './../../core';

@Component({
    selector: 'pk-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private forms: Array<Object>;
    private newForm: Array<any>;

    private isOpenNewForm: boolean = false;

    constructor(private formService: FormService, private router: Router) { }

    ngOnInit() {
        this.formService.getForms().subscribe(result => {
            this.forms = result;
        });

        this.formService.getEditFormTemplate().subscribe(result => {
            this.newForm = result;
        });
    }

    sortBy(sortValue: string) {
        this.formService.getForms(sortValue);
    }

    createNewForm(form) {
        this.formService.createNewForm(form).subscribe(created => {
            console.log(created)
            if (created['id']) {
                this.router.navigate([`/forms/`, created['id'], 'edit']);
            }
        });
    }

    toggleCreateNew() {
        this.isOpenNewForm = !this.isOpenNewForm;
    }
}
