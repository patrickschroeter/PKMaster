import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class AlertService {

    private titleObserver: Observer<string>;
    private titleObservable: Observable<any>;

    private messageObserver: Observer<string>;
    private messageObservable: Observable<any>;

    private isOpenObserver: Observer<boolean>;
    private isOpenObservable: Observable<any>;

    private hintObserver: Observer<string>;
    private hintObservable: Observable<any>;

    constructor() {
        this.titleObservable = new Observable(observer => {
            this.titleObserver = observer;
        });
        this.messageObservable = new Observable(observer => {
            this.messageObserver = observer;
        });
        this.isOpenObservable = new Observable(observer => {
            this.isOpenObserver = observer;
        })
        this.hintObservable = new Observable(observer => {
            this.hintObserver = observer;
        })
    }

    /**
     * @description Streams the Alert to the Listening component
     * @param {string} title the title of the alert
     * @param {string} message the message of the alert
     * @return {void}
     */
    setAlert(title: string, message: string): void {
        this.titleObserver.next(title);
        this.messageObserver.next(message);
        this.isOpenObserver.next(true);
    }

    setSuccessHint(message: string) {
        this.hintObserver.next(message);
        setTimeout(() => {
            this.hintObserver.next(null);
        }, 1000);
    }

    setHint(message: string) {

    }

    /**
     * @description Returns the Title Observer
     * @return {Observable}
     */
    getTitle(): Observable<string> {
        return this.titleObservable;
    }

    /**
     * @description Returns the Message Observer
     * @return {Observable}
     */
    getMessage(): Observable<string> {
        return this.messageObservable;
    }

    /**
     * @description Returns the isOpen Observer
     * @return {Observable}
     */
    getOpenState(): Observable<boolean> {
        return this.isOpenObservable;
    }

    /**
     * @description Returns the Hint Message Observer
     * @return {Observable}
     */
    getHintMessage(): Observable<string> {
        return this.hintObservable;
    }
}
