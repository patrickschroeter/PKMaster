import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormService } from './../../shared';

@Component({
    selector: 'pk-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

    private forms: Array<Object>;
    private newForm: Array<any>;

    private isOpenNewForm: boolean = false;

    constructor(private formService: FormService, private router: Router) { }

    ngOnInit() {
        this.forms = [
            {
                title: 'Antrag auf Bachelorarbeit',
                id: 1,
            },
            {
                title: 'Antrag auf Masterarbeit',
                id: 2,
            },
            {
                title: 'Antrag auf Notennachberechnung',
                id: 3,
            },
            {
                title: 'Antrag auf Notenanrechnung',
                id: 4,
            }
        ];

        this.newForm = [
            {
                elementType: 'input',
                name: 'form-name',
                label: 'Form Name:',
                required: true,
                validations: [
                    'minLength'
                ]
            }
        ];
    }

    createNewForm(form) {
        this.formService.createNewForm(form).subscribe((created) => {
            if (created['id']) {
                this.router.navigate([`/forms/`, created['id'], 'edit']);
            }
        });
    }

    toggleCreateNew() {
        this.isOpenNewForm = !this.isOpenNewForm;
    }
}
