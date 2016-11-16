import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationMock {

  constructor() { }

  getUser(): Observable<any> {
    return new Observable(observer => {
        observer.next({
          isAdmin: false,
          isPK: true
        });
    });
  }

  isLoggedIn() {
    return true;
  }

  login(): Observable<any> {
    return new Observable(observer => {
        observer.next({
          isAdmin: false,
          isPK: true
        });
    });
  }

}
