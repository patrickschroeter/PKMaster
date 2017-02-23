/**
 * API Schnittstelle für die Prüfungskommision der Hochschule Augsburg
 * Hier sind alle Routen aufgelistet die zur verfügung stehen. Zuvor muss jedoch ein JWT Token überden Authorize Button hinzugefügt werden
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
import * as models from './models';
import { Selectable } from './../../models';

export class FieldDto {

    id?: string;

    name?: string;

    fieldType?: string;

    label?: string;

    required?: boolean;

    multipleSelect?: boolean;

    disabled?: boolean;

    contentType?: string;

    placeholder?: string;

    optionsJson?: string;

    enumOptionsTableId?: string;

    styleIds?: Array<string>;

    validationIds?: Array<string>;

    // Custom

    value?: string | string[];

    // optionTable?: string; -> enumOptionsTableId

    options?: Array<Selectable>;

    [key: string]: any;

    constructor(obj?: FieldDto) {
        obj = obj || {};
        this.id = obj.id;
        this.name = obj.name || null;
        this.fieldType = obj.fieldType || null;
        this.label = obj.label || null;
        this.required = !!obj.required;
        this.multipleSelect = !!obj.multipleSelect;
        this.disabled = !!obj.disabled;
        this.contentType = obj.contentType || null;
        this.placeholder = obj.placeholder || null;
        this.optionsJson = obj.optionsJson || null;
        this.enumOptionsTableId = obj.enumOptionsTableId || null;

        this.value = obj.value || null;

        this.styleIds = obj.styleIds || [];
        this.validationIds = obj.validationIds || [];
    }
}
