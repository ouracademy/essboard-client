import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'

@Injectable()
export class AuthService{


  redirectURL = 'app';
  login( username, password) : Observable<any>{
    return of(null)
  }

}
