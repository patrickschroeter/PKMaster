import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

/** Models */
import { Alert, Message } from './../../../../models';

@Injectable()
export class AlertService {

    private defaultMessageTime = 1000;
    private defaultLoadingTime = 2000;
    private defaultSuccessTime = 1500;

    private hint: EventEmitter<Message[]> = new EventEmitter();
    private alert: EventEmitter<Alert> = new EventEmitter();

    private hints: Array<Message> = [];

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

    public setTooltip(message: string, time?: number): void {
        this.add('tooltip', 'tooltip', message, time);
    }

    public setErrorHint(id: string, message: string, time?: number): void {
        this.add(id, 'error', message, time);
    }

    public setSuccessHint(id: string, message: string): void {
        this.add(id, 'success', message, this.defaultSuccessTime);
    }

    public setLoading(id: string, message: string): void {
        this.add(id, 'loading', message, this.defaultLoadingTime);
    }

    private add(id: string, type: string, message: string, time?: number): void {
        const hint: Message = this.addMessage(id, type, message);
        if (hint.timeout) {
            clearTimeout(hint.timeout);
        }
        hint.timeout = setTimeout(() => {
            this.removeHint(id);
        }, time ? time : this.defaultMessageTime);
    }

    private addMessage(id: string, type: string, message: string): Message {
        let index = -1;
        for (let i = 0, length = this.hints.length; i < length; i++) {
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

    public removeHint(id: string): void {
        let index = -1;
        for (let i = 0, length = this.hints.length; i < length; i++) {
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

    public getAlert(): Observable<Alert> {
        return this.alert;
    }

    /**
     * @description Returns the Hint Message Observer
     * @return {Observable}
     */
    public getHintMessages(): Observable<Message[]> {
        return this.hint;
    }
}
