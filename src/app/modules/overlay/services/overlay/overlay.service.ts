import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class OverlayService {

    private title: EventEmitter<string> = new EventEmitter();
    private message: EventEmitter<string> = new EventEmitter();
    private type: EventEmitter<string> = new EventEmitter();

    private toggle: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    public getTitle() { return this.title; }
    public getMessage() { return this.message; }
    public getType() { return this.type; }
    public getToggle() { return this.toggle; }

    public set(title: string, message: string, type: string): OverlayService {
        this.title.emit(title);
        this.message.emit(message);
        this.type.emit(type);
        return this;
    }

    public open() {
        this.toggle.emit(true);
    }

}
