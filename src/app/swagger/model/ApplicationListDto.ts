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

export class ApplicationListDto {


    id: string;

    created: Date;

    lastModified: Date;

    isCurrent: boolean;

    version: number;

    user: models.UserDetailDto;

    conference?: models.ConferenceListDto;

    status: models.StatusDto;

    form: models.FormListDto;

    constructor(obj?: models.ApplicationDetailDto) {
        obj = obj || {};
        this.id = obj.id;
        this.created = obj.created;
        this.lastModified = obj.lastModified;
        this.isCurrent = obj.isCurrent;
        this.version = obj.version;
        this.user = obj.user;
        this.conference = obj.conference;
        this.status = obj.status;
        this.form = obj.form;
    }
}
