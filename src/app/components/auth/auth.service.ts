import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isLoggedIn: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);

  get currentUser$() {
    return this.currentUser.asObservable();
  }

  get isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }

  constructor(private _router: Router) {}

  authLogin(response: any) {
    localStorage.setItem('userDetails', JSON.stringify(response));
    this._router.navigate(['dashboard']);
    this.currentUser.next(response);
    this.isLoggedIn.next(true);
  }

  logOut() {
    this.currentUser.next(null);
    this.isLoggedIn.next(false);
  }
}
