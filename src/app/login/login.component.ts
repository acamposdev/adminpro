import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    init_plugins();
  }

  login() {
    this._router.navigate( [ '/dashboard' ] );
  }
}
