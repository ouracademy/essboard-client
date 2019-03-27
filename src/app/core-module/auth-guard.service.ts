import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url)
  }

  private checkLogin(url: string): Promise<boolean> {
    return this.auth
      .login()
      .then(() => true)
      .catch(() => {
        // Store the attempted URL for redirecting
        this.auth.redirectURL = url
        // Navigate to the login page with extras
        this.router.navigate(['/login'])
        return false
      })
  }
}
