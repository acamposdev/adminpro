import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(
    public _userService: UserService,
    public _router: Router
  ) {}
  canActivate() {
    if (this._userService.idLogged()) {
      console.log('Pasa por el guard...');
      return true;
    } else {
      console.log('BLOQIEADO POR EL GUARD');
      this._router.navigate(['./login']);
      return false;
    }
  }
}
