import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services.index';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    public _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this._userService.user;
  }

  search(key: string) {
    console.log('buscando... ' , key);
    this.router.navigate(['/search/', key]);
  }
}
