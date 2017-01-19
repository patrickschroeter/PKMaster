// tslint:disable:max-line-length
// tslint:disable:no-unused-variable

import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { Conference } from './../../../swagger';

@Injectable()
export class ConferenceApiMock {

    static CONFERENCE: Conference = { id: '1', description: 'First Conference!', dateOfEvent: new Date(), applications: []};

    private list: Conference[] = [];

    constructor() { }
}
