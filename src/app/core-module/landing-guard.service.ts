import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'

@Injectable()
export class LandingGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.check(state.url)
  }

  private check(url: string): boolean {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/me/projects'])
    }
    return !this.auth.isLoggedIn
  }
}
