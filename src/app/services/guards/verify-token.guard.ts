import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class VerifyTokenGuard implements CanActivate {

  constructor(
    private _userService: UserService,
    private router: Router
  ) {
  }

  canActivate(): Promise<boolean> | boolean {
    const token = this._userService.token;
    const payload = JSON.parse(atob( token.split('.')[1]));
    const expired = this.checkExpires(payload.exp);

    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }

    //

    return this.verifyRenoval(payload.exp);
  }

  verifyRenoval(dateExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(dateExp * 1000);
      const now = new Date(); // Si cogemos la del servidor es mas seguro

      now.setTime( now.getTime() + ( 4 * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this._userService.tokenRenoval().subscribe((result) => {
          resolve(true);
        }, () => {
          reject(false);
        });
      }

      resolve(true);
    });
  }

  checkExpires(dateExp: number) {
    const now = new Date().getTime() / 1000;

    if (dateExp < now) {
      return true;
    } else {
      return false;
    }
  }
}
