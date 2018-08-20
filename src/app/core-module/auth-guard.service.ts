import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean {
    if (this.auth.isLoggedIn) {
      return true;
    } else {
      // Store the attempted URL for redirecting
      this.auth.redirectURL = url;
      console.log(url);
      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }
  }
}
