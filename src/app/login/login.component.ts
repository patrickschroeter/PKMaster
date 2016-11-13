import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../shared';

@Component({
  selector: 'pk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: Array<Object>;

  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = [
      {
        elementType: 'input',
        name: 'email',
        type: 'email',
        required: true,
        placeholder: 'E-Mail',

        validations: [
          'useExternalEmail',
          'isEmail'
        ],

        styles: [
            'small'
        ]
      },
      {
        elementType: 'input',
        name: 'password',
        type: 'password',
        required: true,
        placeholder: 'Password',

        validations: [
          'minLength',
          'maxLength'
        ],

        styles: [
            'small'
        ]
      }
    ];
  }

  login(evt) {
    console.log(evt);
    this.authentication.login().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  log(evt) {
    console.log(evt);
  }

}
