import { Component, OnInit } from '@angular/core';

/** Models */
import { FieldDto } from 'app/swagger';

@Component({
    selector: 'pk-identify',
    templateUrl: './identify.component.html',
    styleUrls: ['./identify.component.scss']
})
export class IdentifyComponent implements OnInit {

    public identifyForm: FieldDto[];

    constructor() { }

    ngOnInit() {

        this.initIdentifyForm();

    }

    public identify(event: any): void {
        console.log(event);
    }

    /**
     * initialize the IdentifyForm
     *
     * @private
     *
     * @memberOf IdentifyComponent
     */
    private initIdentifyForm(): void {
        this.identifyForm = [
            {
                fieldType: 'input',
                name: 'email',
                contentType: 'email',
                required: true,
                placeholder: 'E-Mail',

                validationIds: [
                    'isEmail'
                ]
            }
        ];
    }
}
