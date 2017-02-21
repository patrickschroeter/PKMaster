import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

/** ConfigurationApi */
import { ConfigurationApi } from './../../../swagger';

/** Models */
import {
    FieldDefinitionDto,
    ValidationDto,
    StyleDto,
    StatusDto
} from './../../../swagger';

@Injectable()
export class ConfigurationService {

    private fieldDefinitions: Observable<FieldDefinitionDto[]>;
    private fieldStyles: Observable<StyleDto[]>;
    private fieldValidations: Observable<ValidationDto[]>;
    private statusValues: Observable<StatusDto[]>;

    constructor(
        private configurationApi: ConfigurationApi
    ) {
        this.getStatusValues().subscribe(result => {
            console.log(result);
        });
    }

    /**
     * load all field definitions
     *
     * @returns {Observable<FieldDefinitionDto[]>}
     *
     * @memberOf ConfigurationService
     */
    public getFieldDefinitions(): Observable<FieldDefinitionDto[]> {
        if (!this.fieldDefinitions) {
            this.fieldDefinitions = this.configurationApi.getFieldDefinitions()
                .publishReplay(1).refCount();
        }
        return this.fieldDefinitions;
    }

    /**
     * get a field definition by name
     *
     * @param {string} name
     * @returns {Observable<FieldDefinitionDto>}
     *
     * @memberOf ConfigurationService
     */
    public getFieldDefinitionByName(name: string): Observable<FieldDefinitionDto> {
        return this.getFieldDefinitions().map(result => {
            return _.find(result, obj => obj.name === name);
        });
    }

    /**
     * get all field styles
     *
     * @returns {Observable<StyleDto[]>}
     *
     * @memberOf ConfigurationService
     */
    public getFieldStyles(): Observable<StyleDto[]> {
        if (!this.fieldStyles) {
            this.fieldStyles = this.configurationApi.getFieldStyles()
                .publishReplay(1).refCount();
        }
        return this.fieldStyles;
    }

    /**
     * get all field validations
     *
     * @returns {Observable<ValidationDto[]>}
     *
     * @memberOf ConfigurationService
     */
    public getFieldValidations(): Observable<ValidationDto[]> {
        if (!this.fieldValidations) {
            this.fieldValidations = this.configurationApi.getFieldValidations()
                .publishReplay(1).refCount();
        }
        return this.fieldValidations;
    }

    /**
     * get all status values
     *
     * @returns {Observable<StatusDto[]>}
     *
     * @memberOf ConfigurationService
     */
    public getStatusValues(): Observable<StatusDto[]> {
        if (!this.statusValues) {
            this.statusValues = this.configurationApi.getStatusValues()
                .publishReplay(1).refCount();
        }
        return this.statusValues;
    }

    /**
     * get a status value by name
     *
     * @param {string} name
     * @returns {Observable<StatusDto>}
     *
     * @memberOf ConfigurationService
     */
    public getStatusByName(name: string): Observable<StatusDto> {
        return this.getStatusValues().map(result => {
            return _.find(result, obj => obj.name === name);
        });
    }

}
