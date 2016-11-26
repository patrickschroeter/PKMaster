import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { Message } from './';

@Injectable()
export class AlertService {

    private alertObservable: Observable<any>;
    private alertObserver: Observer<any>;

    private hintObservable: Observable<any>;
    private hintObserver: Observer<Array<any>>;
    private hints: Array<Message> = [];

    private loadingObservable: Observable<any>;
    private loadingObserver: Observer<any>;

    constructor() {
        this.alertObservable = new Observable(observer => {
            this.alertObserver = observer;
        });
        this.hintObservable = new Observable(observer => {
            this.hintObserver = observer;
        });
        this.loadingObservable = new Observable(observer => {
            this.loadingObserver = observer;
        });
    }

    /**
     * @description Streams the Alert to the Listening component
     * @param {string} title the title of the alert
     * @param {string} message the message of the alert
     * @return {void}
     */
    setAlert(title: string, message: string): void {
        if (this.alertObserver) {
            this.alertObserver.next({
                title: title,
                message: message,
                isOpen: true
            });
        }
    }

    setErrorHint(id: string, message: string, time?: number): void {
        let hint = this.addMessage(id, 'error', message);
        if (hint.timeout) {
            clearTimeout(hint.timeout);
        }
        hint.timeout = setTimeout(() => {
            this.removeHint(id);
        }, time ? time : 1000);
    }

    setSuccessHint(id: string, message: string): void {
        let hint = this.addMessage(id, 'success', message);
        if (hint.timeout) {
            clearTimeout(hint.timeout);
        }
        hint.timeout = setTimeout(() => {
            this.removeHint(id);
        }, 1000);
    }

    setLoading(id: string, message: string): void {
        this.addMessage(id, 'loading', message);
    }

    removeLoading(id: string): void {
        this.removeHint(id);
    }

    private addMessage(id: string, type: string, message: string): Message {
        let index = -1;
        for (let i = 0, length = this.hints.length; i < length; i++) {
            let hint = this.hints[i];
            if (hint.id === id) {
                index = i;
            }
        }
        let hint;
        if (index === -1) {
            hint = new Message(id, type, message);
            this.hints.push(hint);
            this.hintObserver.next(this.hints);
        } else {
            hint = this.hints[index];
        }
        return hint;
    }

    removeHint(id: string): void {
        let index = -1;
        for (let i = 0, length = this.hints.length; i < length; i++) {
            let hint = this.hints[i];
            if (hint.id === id) {
                index = i;
            }
        }
        if (index !== -1) {
            this.hints.splice(index, 1);
            this.hintObserver.next(this.hints);
        }
    }

    getAlert(): Observable<any> {
        return this.alertObservable;
    }

    /**
     * @description Returns the Hint Message Observer
     * @return {Observable}
     */
    getHintMessages(): Observable<Array<Message>> {
        return this.hintObservable;
    }

    /**
     * @description Returns the Loading Observer
     * @return {Observable}
     */
    getLoading(): Observable<any> {
        return this.loadingObservable;
    }
}
