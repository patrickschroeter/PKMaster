import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class AlertService {

    private titleObservable: Observable<any>;
    private titleObserver: Observer<string>;

    private messageObservable: Observable<any>;
    private messageObserver: Observer<string>;

    private isOpenObservable: Observable<any>;
    private isOpenObserver: Observer<boolean>;

    private hintObservable: Observable<any>;
    private hintObserver: Observer<string>;

    private loadingObservable: Observable<any>;
    private loadingObserver: Observer<any>;

    private loadingRoutes: Array<{ id, message }> = [];

    constructor() {
        this.titleObservable = new Observable(observer => {
            this.titleObserver = observer;
        });
        this.messageObservable = new Observable(observer => {
            this.messageObserver = observer;
        });
        this.isOpenObservable = new Observable(observer => {
            this.isOpenObserver = observer;
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
        this.titleObserver.next(title);
        this.messageObserver.next(message);
        this.isOpenObserver.next(true);
    }


    /**
     * @description Streams the Hint to the Listening component
     * @param {string} message the message of the hint
     * @return {void}
     */
    setSuccessHint(message: string): void {
        this.hintObserver.next(message);
        setTimeout(() => {
            this.hintObserver.next(null);
        }, 1000);
    }

    /**
     * @description Streams the Loading to the Listening component
     * @param {string} id the id of the calling function
     * @param {string} message the message of the loading
     * @return {void}
     */
    setLoading(id: string, message: string): void {
        let element;
        for (let i = 0, length = this.loadingRoutes.length; i < length; i++) {
            let loading = this.loadingRoutes[i];
            if (loading.id === id) {
                element = loading;
            }
        }

        if (element) {
            element.message = message;
        } else {
            this.loadingRoutes.push({
                id: id,
                message: message
            });
        }
        this.loadingObserver.next(this.loadingRoutes);
    }

    /**
     * @description Removes the loading
     * @param {string} id the id of the loading function
     * @return {void}
     */
    removeLoading(id: string): void {
        let index = -1;
        for (let i = 0, length = this.loadingRoutes.length; i < length; i++) {
            let loading = this.loadingRoutes[i];
            if (loading.id === id) {
                index = i;
            }
        }
        if (index !== -1) {
            this.loadingRoutes.splice(index, 1);
        }
        this.loadingObserver.next(this.loadingRoutes);
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

    /**
     * @description Returns the Loading Observer
     * @return {Observable}
     */
    getLoading(): Observable<any> {
        return this.loadingObservable;
    }
}
