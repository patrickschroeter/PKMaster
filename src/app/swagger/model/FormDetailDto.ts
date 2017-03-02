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

export class FormDetailDto {

    id: string;

    title: string;

    deprecated?: boolean;

    created?: Date;

    restrictedAccess?: boolean;

    previousVersion?: string;

    isPublic?: boolean;

    isActive?: boolean;

    formHasField?: Array<models.FieldDto>;

    // Custom

    requiresValidation?: boolean;

    constructor(obj?: FormDetailDto) {
        obj = obj || ({} as any);
        this.update(obj);

        // this.id = obj.id || null;
        // this.title = obj.title || null;
        // this.deprecated = !!obj.deprecated;
        // this.created = obj.created || null;
        // this.restrictedAccess = !!obj.restrictedAccess;
        // this.previousVersion = obj.previousVersion;
        // this.isPublic = !!obj.isPublic;
        // this.isActive = !!obj.isActive;
        // this.requiresValidation = !!obj.requiresValidation;

        // this.formHasField = obj.formHasField ? obj.formHasField.map((model: models.FieldDto) => new models.FieldDto(model)): [];
    }

    /**
     * copy values into the FormDetailDto
     *
     * @param {FormDetailDto} obj
     *
     * @memberOf FormDetailDto
     */
    public update(obj: FormDetailDto): void {
        this.id = obj.id || null;
        this.title = obj.title || null;
        this.deprecated = !!obj.deprecated;
        this.created = obj.created || null;
        this.restrictedAccess = !!obj.restrictedAccess;
        this.previousVersion = obj.previousVersion;
        this.isPublic = !!obj.isPublic;
        this.isActive = !!obj.isActive;
        this.requiresValidation = !!obj.requiresValidation;

        this.formHasField = obj.formHasField ? obj.formHasField.map((model: models.FieldDto) => new models.FieldDto(model)): [];
    }
}
