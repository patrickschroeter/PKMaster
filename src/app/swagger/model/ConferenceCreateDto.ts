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

export class ConferenceCreateDto {


    description: string;

    dateOfEvent: Date;

    startOfEvent: string;

    endOfEvent: string;

    roomOfEvent: string;

    numberOfConference: number;

    configJson?: string;

    constructor(obj: models.ConferenceDetailDto = new models.ConferenceDetailDto()) {
        this.description = obj.description;
        this.dateOfEvent = obj.dateOfEvent;
        this.startOfEvent = obj.startOfEvent;
        this.endOfEvent = obj.endOfEvent;
        this.roomOfEvent = obj.roomOfEvent;
        this.numberOfConference = obj.numberOfConference;

        this.configJson = obj.config ? JSON.stringify(obj.config) : '';
    }
}
