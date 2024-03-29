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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

/** ConfigurationApi */
import { ConfigurationApi } from 'app/swagger';

/** Models */
import {
    FieldDefinitionDto,
    ValidationDto,
    StyleDto,
    StatusDto
} from 'app/swagger';

@Injectable()
export class ConfigurationMock {

    constructor() { }

    /**
     * load all field definitions
     *
     * @returns {Observable<FieldDefinitionDto[]>}
     *
     * @memberOf ConfigurationService
     */
    public getFieldDefinitions(): Observable<FieldDefinitionDto[]> {
        return new Observable(observer => {
            setTimeout(() => {
            // tslint:disable-next-line:max-line-length
            observer.next([{ 'id': '0b874353-d12d-4d2d-b437-b83e5287009f', 'description': 'Headline h2', 'name': 'h2', 'configs': ['{"name":"value","label":"Value","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false,"require":true}'], 'styles': [], 'validations': [] }, { 'id': '0cdee70e-2bd5-4fdf-85f0-0346b86ac8ed', 'description': 'Headline h1', 'name': 'h1', 'configs': ['{"name":"value","label":"Value","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false,"require":true}'], 'styles': [], 'validations': [] }, { 'id': '123d74d8-d38a-476c-9a84-54ef52faea93', 'description': 'Infotext', 'name': 'info', 'configs': ['{"name":"value","label":"Value","fieldType":"textarea","required":false,"multipleSelect":false,"value":null,"styles":["small"],"disabled":false,"require":true}'], 'styles': [], 'validations': [] }, { 'id': '3bd87eea-6b12-45c1-b3ec-0cb89f2f7115', 'description': 'Textarea', 'name': 'textarea', 'configs': ['{ "name": "required", "label": "Required Field", "fieldType": "checkbox", "required": false, "multipleSelect": false, "value": null, "styles": [ "small", "aligned" ], "disabled": false }', '{"name":"label","label":"Label of the Input","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false}', '{"name":"placeholder","label":"Placeholder","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false}'], 'styles': ['alligned', 'small'], 'validations': ['max-lenght-20', 'min-length-8'] }, { 'id': '45567897-7fd2-4ce1-bee0-9ab4f8813ea6', 'description': 'Headline h4', 'name': 'h4', 'configs': ['{"name":"value","label":"Value","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false,"require":true}'], 'styles': [], 'validations': [] }, { 'id': '5c3914e9-a1ea-4c21-914a-39c2b5faa90c', 'description': 'Input', 'name': 'input', 'configs': ['{ "name": "required", "label": "Required Field", "fieldType": "checkbox", "required": false, "multipleSelect": false, "value": null, "styles": [ "small", "aligned" ], "disabled": false }', '{"name":"label","label":"Label of the Input","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false}', '{"name":"contentType","label":"Type of Content","fieldType":"select","required":true,"multipleSelect":false,"value":"text","options":[{"value":"text","label":"Text"},{"value":"password","label":"Password"},{"value":"date","label":"Date"},{"value":"email","label":"E-Mail"},{"value":"number","label":"Number"}],"styles":["small"],"disabled":false        }', '{"name":"placeholder","label":"Placeholder","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false}'], 'styles': ['alligned', 'small'], 'validations': ['max-lenght-20', 'min-length-8'] }, { 'id': '77c630ab-8298-4847-a1f0-7cccc4172ea4', 'description': 'Checkbox', 'name': 'checkbox', 'configs': ['{ "name": "required", "label": "Required Field", "fieldType": "checkbox", "required": false, "multipleSelect": false, "value": null, "styles": [ "small", "aligned" ], "disabled": false }', '{"name":"label","label":"Label of the Input","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false}'], 'styles': ['small'], 'validations': ['min-length-8'] }, { 'id': '7b13ce45-6bbc-4b65-ae9e-0b82a30e7e7f', 'description': 'Select', 'name': 'select', 'configs': ['{ "name": "required", "label": "Required Field", "fieldType": "checkbox", "required": false, "multipleSelect": false, "value": null, "styles": [ "small", "aligned" ], "disabled": false }', '{"name":"label","label":"Label of the Input","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false}', '{"name":"placeholder","label":"Placeholder","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false}', '{"name":"multipleSelect","label":"Multiselect","fieldType":"checkbox","required":false,"multipleSelect":false,"styles":["small"],"disabled":false}', '{"fieldType":"devider","required":false,"multipleSelect":false,"disabled":false}', '{"fieldType":"h4","required":false,"multipleSelect":false,"value":"Create a custom List or use an existing one.","styles":[],"disabled":false}', '{"name":"optionTable","label":"Table of Options","fieldType":"select","required":false,"multipleSelect":false,"value":null,"options":[{"value":"fakultaet","label":"Fakultaeten"},{"value":"user","label":"Users"},{"value":"language","label":"Languages"}],"styles":["small"],"disabled":false}', '{"name":"options","label":"Options","fieldType":"datalist","required":true,"multipleSelect":false,"styles":["small"],"disabled":false}'], 'styles': [], 'validations': [] }, { 'id': '89023389-84bd-4208-9bbc-b3de4b1a8e58', 'description': 'Hidden Devider', 'name': 'hiddenDevider', 'configs': [], 'styles': [], 'validations': [] }, { 'id': '8abb2070-3abb-47b7-b50d-54b0d9b3db5d', 'description': 'Radio', 'name': 'radio', 'configs': ['{ "name": "required", "label": "Required Field", "fieldType": "checkbox", "required": false, "multipleSelect": false, "value": null, "styles": [ "small", "aligned" ], "disabled": false }', '{"name":"label","label":"Label of the Input","fieldType":"input","required":true,"multipleSelect":false,"value":null,"styles":["small"],"disabled":false}', '{"fieldType":"devider","required":false,"multipleSelect":false,"disabled":false}', '{"fieldType":"h4","required":false,"multipleSelect":false,"value":"Create a custom List or use an existing one.","styles":[],"disabled":false}', '{"name":"optionTable","label":"Table of Options","fieldType":"select","required":false,"multipleSelect":false,"value":null,"options":[{"value":"fakultaet","label":"Fakultaeten"},{"value":"user","label":"Users"},{"value":"language","label":"Languages"}],"styles":["small"],"disabled":false}', '{"name":"options","label":"Options","fieldType":"datalist","required":true,"multipleSelect":false,"styles":["small"],"disabled":false}'], 'styles': ['alligned'], 'validations': ['max-lenght-20'] }, { 'id': '9a6c4eee-8037-4f88-b34e-8e7e50629aad', 'description': 'Devider', 'name': 'devider', 'configs': [], 'styles': [], 'validations': [] }, { 'id': 'd7b3b984-e3b4-41d3-a132-9afc9ecec402', 'description': 'Headline h3', 'name': 'h3', 'configs': ['{"name":"value","label":"Value","fieldType":"input","required":false,"multipleSelect":false,"styles":["small"],"disabled":false,"require":true}'], 'styles': [], 'validations': [] }]);
            }, 100);
        });
    }

    /**
     * get a field definition by name
     *
     * @param {string} name
     * @returns {Observable<FieldDefinitionDto>}
     *
     * @memberOf ConfigurationService
     */
    public getFieldDefinitionById(id: string): Observable<FieldDefinitionDto> {
        return this.getFieldDefinitions().map(result => {
            return _.find(result, obj => obj.id === id);
        });
    }

    /**
     * Check if the given name matches the Field Definition with the id
     * return true if name and id are the same strings
     *
     * @param {String} name
     * @param {String} id
     * @returns {Boolean}
     *
     * @memberOf ConfigurationService
     */
    public isFieldDefinition(name: string, id: string): boolean {
        return true;
    }

    /**
     * Get the name of the FieldDefinitionDto with the id
     *
     * @param {String} id
     * @returns {String}
     *
     * @memberOf ConfigurationService
     */
    public getFieldDefinitionName(id: string): string {
        return id;
    }

    /**
     * get all field styles
     *
     * @returns {Observable<StyleDto[]>}
     *
     * @memberOf ConfigurationService
     */
    public getFieldStyles(): Observable<StyleDto[]> {
        return new Observable(observer => {
            // tslint:disable-next-line:max-line-length
            observer.next([{ 'id': '2674979f-3f39-40bf-a301-6a548f7bde15', 'description': 'Small', 'styleString': 'small' }, { 'id': '78540ab7-51e0-4d67-82bc-8efb1d679d03', 'description': 'Alligned', 'styleString': 'alligned' }]);
        });
    }

    /**
     * Check if the name matches the StyleDto with the id
     * return true if name and id are the same strings
     *
     * @param {String} name
     * @param {String} id
     * @returns {Boolean}
     *
     * @memberOf ConfigurationService
     */
    public isStyle(name: string, id: string): boolean {
        return name === id;
    }

    /**
     * get all field validations
     *
     * @returns {Observable<ValidationDto[]>}
     *
     * @memberOf ConfigurationService
     */
    public getFieldValidations(): Observable<ValidationDto[]> {
        return new Observable(observer => {
            // tslint:disable-next-line:max-line-length
            observer.next([{ 'id': '55f37c8b-56aa-4b4f-8f14-b500854e11a9', 'description': 'Email Validation', 'validationString': 'max-lenght-20' }, { 'id': '640dae4d-8cfe-4aec-a98c-9ec23dc842d6', 'description': 'External Email Validation', 'validationString': 'min-length-8' }, { 'id': '5655ef15-f9f8-4ada-8ccb-4cc363e0deab', 'description': 'min Length of 8', 'validationString': 'minLength' }, { 'id': 'c38e9b47-7a60-4ddc-8367-d33f17e39e78', 'description': 'max Length of 15', 'validationString': 'maxLength' }, { 'id': 'ee4e7f9a-9d38-484a-97e9-91ac8e40bd94', 'description': 'Required', 'validationString': 'toBeTrue' }]);
        });
    }

    /**
     * Check if the name matches the ValidationDto with the id
     * return true if name and id are the same strings
     *
     * @param {string} name
     * @param {string} id
     * @returns {boolean}
     *
     * @memberOf ConfigurationService
     */
    public isValidation(name: string, id: string): boolean {
        return name === id;
    }

}
