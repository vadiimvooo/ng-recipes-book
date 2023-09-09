import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from '../../../models/user.model';
import {DataStorageService} from "../../../services/data-storage.service";
import {AuthErrors} from "../../../const/auth.errors";
import {urls} from "../../../const/urls";
import {IAuthResponse} from "../../../models/auth.model";
import {PopupService} from "../../shared/services/popup.service";

export interface IUserCredentials {
  email: string,
  password: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataStorageService: DataStorageService,
    private popupService: PopupService
  ) {}

  signup(userCredentials: IUserCredentials) {
    return this.http
      .post<IAuthResponse>(
        urls.signUp,
        {
          email: userCredentials.email,
          password: userCredentials.password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData);
        })
      );
  }

  login(userCredentials: IUserCredentials) {
    return this.http
      .post<IAuthResponse>(
        urls.login,
        {
          email: userCredentials.email,
          password: userCredentials.password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData);
        })
      );
  }

  autoLogin() {
    const userData = this.dataStorageService.getUserData();

    if (!userData) {
      return;
    }

    const { id, email, _token, _tokenExpirationDate} = userData;

    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    this.popupService.success("Logout", "Logout success");
    this.dataStorageService.removeUserData();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(resData: IAuthResponse) {
    const { email, localId, idToken, expiresIn} = resData;

    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(+expiresIn * 1000);
    this.dataStorageService.addUserData(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorRes.error.error.message) {
      case AuthErrors.EMAIL_EXISTS:
        errorMessage = 'This email exists already';
        break;

      case AuthErrors.EMAIL_NOT_FOUND:
        errorMessage = 'This email does not exist.';
        break;

      case AuthErrors.INVALID_PASSWORD:
        errorMessage = 'This password is not correct.';
        break;

      case AuthErrors.OPERATION_NOT_ALLOWED:
        errorMessage = 'This operation is not allowed.';
        break;

      case AuthErrors.TOO_MANY_ATTEMPTS_TRY_LATER:
        errorMessage = 'You tried too many times. Please try later.';
        break;

      case AuthErrors.USER_DISABLED:
        errorMessage = 'This user is blocked by the system.';
        break;

      default:
        break;
    }

    return throwError(() => errorMessage);
  }
}
