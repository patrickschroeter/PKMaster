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

    private fieldDefinitionValues: FieldDefinitionDto[];
    private fieldStyleValues: StyleDto[];
    private fieldValidationValues: ValidationDto[];

    constructor(
        private configurationApi: ConfigurationApi
    ) {
        this.getFieldDefinitions().subscribe((result: FieldDefinitionDto[]) => {
            this.fieldDefinitionValues = result;
        });
        this.getFieldValidations().subscribe((result: ValidationDto[]) => {
            this.fieldValidationValues = result;
        });
        this.getFieldStyles().subscribe((result: StyleDto[]) => {
            this.fieldStyleValues = result;
        });
        this.getStatusValues().subscribe();
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
        if (name === id) { return true; }
        if (!this.fieldDefinitionValues) { return; }
        const index = _.findIndex(this.fieldDefinitionValues, obj => (obj.id === id && obj.name === name));
        return index !== -1;
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
        if (!this.fieldDefinitionValues) { return id; }
        const field: FieldDefinitionDto = _.find(this.fieldDefinitionValues, obj => obj.id === id);
        if (field) {
            return field.name;
        }
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
        if (!this.fieldStyles) {
            this.fieldStyles = this.configurationApi.getFieldStyles()
                .publishReplay(1).refCount();
        }
        return this.fieldStyles;
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
        if (name === id) { return true; }
        if (!this.fieldStyleValues) { return; }
        const index = _.findIndex(this.fieldStyleValues, obj => (obj.id === id && obj.styleString === name));
        return index !== -1;
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
        if (name === id) { return true; }
        if (!this.fieldValidationValues) { return; }
        const index = _.findIndex(this.fieldValidationValues, obj => (obj.id === id && obj.validationString === name));
        return index !== -1;
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
