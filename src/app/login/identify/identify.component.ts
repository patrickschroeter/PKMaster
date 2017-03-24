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

import { Component, OnInit } from '@angular/core';

/** Models */
import { FieldDto } from 'app/swagger';

/**
 * IdentifyComponent
 *
 * @export
 * @class IdentifyComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-identify',
    templateUrl: './identify.component.html',
    styleUrls: ['./identify.component.scss']
})
export class IdentifyComponent implements OnInit {

    public identifyForm: FieldDto[];

    /**
     * Creates an instance of IdentifyComponent.
     *
     * @memberOf IdentifyComponent
     */
    constructor() { }

    /**
     * implements OnInit
     *
     * @memberOf IdentifyComponent
     */
    ngOnInit() {

        this.initIdentifyForm();

    }

    /**
     * reset the users password
     *
     * @param {*} event
     *
     * @memberOf IdentifyComponent
     */
    public identify(event: any): void {
        // TODO
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
