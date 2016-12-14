import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../core';

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
        fieldType: 'input',
        name: 'email',
        contentType: 'email',
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
        fieldType: 'input',
        name: 'password',
        contentType: 'password',
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

  login(credentials) {
    this.authentication.login(credentials.email, credentials.password).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
        /** TODO: catch */
    });
  }
}
