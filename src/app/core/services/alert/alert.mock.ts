import { Injectable } from '@angular/core';

@Injectable()
export class AlertMock {

    constructor() {}

    /**
     * @description Streams the Loading to the Listening component
     * @param {string} id the id of the calling function
     * @param {string} message the message of the loading
     * @return {void}
     */
    setLoading(id: string, message: string): void {}

    /**
     * @description Removes the loading
     * @param {string} id the id of the loading function
     * @return {void}
     */
    removeLoading(id: string): void {}
}
