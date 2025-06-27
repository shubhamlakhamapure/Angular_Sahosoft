import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { // CANACTIVATE is used to protect the routes from unauthorized access


  constructor(private _authService:AuthService,private _router:Router){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this._authService.isLoggedIn$.pipe(map((_isLoggedIn:boolean)=>{
          if(!_isLoggedIn){
            this._router.navigate(['auth/login']);
            return false;
          }
          return true;
        })
      )
  }
  
}
