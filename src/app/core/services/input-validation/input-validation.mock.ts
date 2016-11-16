import { Injectable } from '@angular/core';

@Injectable()
export class InputValidationMock {

    constructor() { }

    /**
     * Generates an Array of Validation Functions from the given Array of Keys
     * @param {Array} keyArray all Validation Keys
     * @return {Array} returns an array with all Validatin functions
     */
    generateValidationsFromKeys(keyArray = []) {
        return [];
    }

}
