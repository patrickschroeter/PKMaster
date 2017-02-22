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

export class ApplicationDetailDto {

    id?: string;

    created?: Date;

    lastModified?: Date;

    filledForm?: string;

    version?: number;

    isCurrent?: boolean;

    previousVersion?: string;

    user?: models.UserDetailDto;

    conference?: models.ConferenceListDto;

    status?: models.StatusDto;

    form?: models.FormDetailDto;

    assignments?: Array<models.UserDetailDto>;

    comments?: Array<models.CommentDetailDto>;

    // Custom

    confirmed?: boolean;

    // Client Only

    attributes?: Array<models.FieldDto>;

    constructor(obj?: ApplicationDetailDto) {
        obj = obj || {};

        this.id = obj.id;
        this.created = obj.created;
        this.lastModified = obj.lastModified;
        this.filledForm = obj.filledForm;
        this.version = obj.version;
        this.isCurrent = !!obj.isCurrent;
        this.previousVersion = obj.previousVersion;
        this.confirmed = !!obj.confirmed;

        this.user = obj.user ? new models.UserDetailDto(obj.user): undefined;
        this.conference = obj.conference ? new models.ConferenceListDto(obj.conference): undefined;
        this.status = obj.status ? new models.StatusDto(obj.status): undefined;
        this.form = obj.form ? new models.FormDetailDto(obj.form): undefined;

        this.assignments = obj.assignments ? obj.assignments.map((model: models.UserDetailDto) => new models.UserDetailDto(model)): [];
        this.comments = obj.comments ? obj.comments.map((model: models.CommentDetailDto) => new models.CommentDetailDto(model)): [];
        this.attributes = obj.attributes ? obj.attributes.map((model: models.FieldDto) => new models.FieldDto(model)): [];
    }
}
