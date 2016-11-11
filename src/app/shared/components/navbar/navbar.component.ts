import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private isOpen: boolean;

  constructor() { }

  ngOnInit() {
    this.isOpen = false;
  }

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

}


@Component({
  selector: 'pk-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarAdminComponent extends NavbarComponent {}
