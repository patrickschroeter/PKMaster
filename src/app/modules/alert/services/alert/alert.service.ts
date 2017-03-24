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

import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

/** Models */
import { Alert, Message } from 'app/models';

/**
 * AlertService
 *
 * @export
 * @class AlertService
 */
@Injectable()
export class AlertService {

    private defaultMessageTime = 1000;
    private defaultLoadingTime = 2000;
    private defaultSuccessTime = 1500;

    private hint: EventEmitter<Message[]> = new EventEmitter();
    private alert: EventEmitter<Alert> = new EventEmitter();

    private hints: Array<Message> = [];

    /**
     * Creates an instance of AlertService.
     *
     * @memberOf AlertService
     */
    constructor() { }

    /**
     * @description Streams the Alert to the Listening component
     * @param {string} title the title of the alert
     * @param {string} message the message of the alert
     * @return {void}
     */
    public setAlert(title: string, message: string): void {
        this.alert.emit({
            title: title,
            message: message,
            isOpen: true
        });
    }

    /**
     * add a tooltip
     *
     * @param {string} message
     * @param {number} [time]
     *
     * @memberOf AlertService
     */
    public setTooltip(message: string, time?: number): void {
        this.add('tooltip', 'tooltip', message, time);
    }

    /**
     * add am error hint
     *
     * @param {string} id
     * @param {string} message
     * @param {number} [time]
     *
     * @memberOf AlertService
     */
    public setErrorHint(id: string, message: string, time?: number): void {
        this.add(id, 'error', message, time);
    }

    /**
     * add a success hint
     *
     * @param {string} id
     * @param {string} message
     *
     * @memberOf AlertService
     */
    public setSuccessHint(id: string, message: string): void {
        this.add(id, 'success', message, this.defaultSuccessTime);
    }

    /**
     * add a loading hint
     *
     * @param {string} id
     * @param {string} message
     *
     * @memberOf AlertService
     */
    public setLoading(id: string, message: string): void {
        this.add(id, 'loading', message, this.defaultLoadingTime);
    }

    /**
     * add a hint with type
     *
     * @private
     * @param {string} id
     * @param {string} type
     * @param {string} message
     * @param {number} [time]
     *
     * @memberOf AlertService
     */
    private add(id: string, type: string, message: string, time?: number): void {
        const hint: Message = this.addMessage(id, type, message);
        if (hint.timeout) {
            clearTimeout(hint.timeout);
        }
        hint.timeout = setTimeout(() => {
            this.removeHint(id);
        }, time ? time : this.defaultMessageTime);
    }

    /**
     * add a message
     *
     * @private
     * @param {string} id
     * @param {string} type
     * @param {string} message
     * @returns {Message}
     *
     * @memberOf AlertService
     */
    private addMessage(id: string, type: string, message: string): Message {
        let index = -1;
        for (let i = 0; i < this.hints.length; i++) {
            const hint = this.hints[i];
            if (hint.id === id) {
                index = i;
            }
        }
        let hint: Message;
        if (index === -1) {
            hint = new Message(id, type, message);
            this.hints.push(hint);
            this.hint.emit(this.hints);
        } else {
            hint = this.hints[index];
            hint.message = message;
        }
        return hint;
    }

    /**
     * remove a hint
     *
     * @param {string} id
     *
     * @memberOf AlertService
     */
    public removeHint(id: string): void {
        let index = -1;
        for (let i = 0; i < this.hints.length; i++) {
            const hint = this.hints[i];
            if (hint.id === id) {
                index = i;
                clearTimeout(hint.timeout);
                break;
            }
        }
        if (index !== -1) {
            this.hints.splice(index, 1);
            this.hint.emit(this.hints);
        }
    }

    /**
     * getter for alert observable
     *
     * @returns {Observable<Alert>}
     *
     * @memberOf AlertService
     */
    public getAlert(): Observable<Alert> {
        return this.alert;
    }

    /**
     * @description Returns the Hint Message Observer
     *
     * @returns {Observable<Message[]>}
     *
     * @memberOf AlertService
     */
    public getHintMessages(): Observable<Message[]> {
        return this.hint;
    }
}
