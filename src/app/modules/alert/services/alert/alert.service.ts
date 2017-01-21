import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { Message } from './';

@Injectable()
export class AlertService {

    private defaultMessageTime: number = 1000;

    private alertObservable: Observable<any>;
    private alertObserver: Observer<any>;

    private hintObservable: Observable<any>;
    private hintObserver: Observer<Array<any>>;
    private hints: Array<Message> = [];

    private loadingObservable: Observable<any>;
    private loadingObserver: Observer<any>;

    constructor() { }

    /**
     * @description Streams the Alert to the Listening component
     * @param {string} title the title of the alert
     * @param {string} message the message of the alert
     * @return {void}
     */
    public setAlert(title: string, message: string): void {
        if (this.alertObserver) {
            this.alertObserver.next({
                title: title,
                message: message,
                isOpen: true
            });
        }
    }

    public setTooltip(message: string, time?: number): void {
        this.add('tooltip', 'tooltip', message, time);
    }

    public setErrorHint(id: string, message: string, time?: number): void {
        this.add(id, 'error', message, time);
    }

    public setSuccessHint(id: string, message: string): void {
        this.add(id, 'success', message, 1500);
    }

    public setLoading(id: string, message: string): void {
        this.addMessage(id, 'loading', message);
    }

    private add(id: string, type: string, message: string, time?: number): void {
        let hint: Message = this.addMessage(id, type, message);
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
            let hint = this.hints[i];
            if (hint.id === id) {
                index = i;
            }
        }
        let hint: Message;
        if (index === -1) {
            hint = new Message(id, type, message);
            this.hints.push(hint);
            this.hintObserver.next(this.hints);
        } else {
            hint = this.hints[index];
            hint.message = message;
        }
        return hint;
    }

    public removeHint(id: string): void {
        let index = -1;
        for (let i = 0, length = this.hints.length; i < length; i++) {
            let hint = this.hints[i];
            if (hint.id === id) {
                index = i;
                clearTimeout(hint.timeout);
                break;
            }
        }
        if (index !== -1) {
            this.hints.splice(index, 1);
            this.hintObserver.next(this.hints);
        }
    }

    public getAlert(): Observable<any> {
        if (!this.alertObservable) {
            this.alertObservable = new Observable((observer: Observer<any>) => {
                this.alertObserver = observer;
            });
        }
        return this.alertObservable;
    }

    /**
     * @description Returns the Hint Message Observer
     * @return {Observable}
     */
    public getHintMessages(): Observable<Array<Message>> {
        if (!this.hintObservable) {
            this.hintObservable = new Observable((observer: Observer<any>) => {
                this.hintObserver = observer;
            });
        }
        return this.hintObservable;
    }

    /**
     * @description Returns the Loading Observer
     * @return {Observable}
     */
    public getLoading(): Observable<any> {
        if (!this.loadingObserver) {
            this.loadingObservable = new Observable((observer: Observer<any>) => {
                this.loadingObserver = observer;
            });
        }
        return this.loadingObservable;
    }
}
