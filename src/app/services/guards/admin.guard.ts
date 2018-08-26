import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private _userService: UserService
  ) {
  }

  canActivate() {
    // console.log('admin guard -> ' , this._userService.user);
    if (this._userService.user.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por admin guard');
      this._userService.logout();
      return false;
    }
  }
}
