import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {AuthService, IUserCredentials} from '../../services/auth.service';
import {IAuthResponse} from "../../../../models/auth.model";
import {PopupService} from "../../../shared/services/popup.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  userCredentials!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private popupService: PopupService
  ) {
    this.userCredentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.userCredentials.invalid) {
      return;
    }

    const userCredentials: IUserCredentials = {
      ...this.userCredentials.getRawValue()
    }

    let authObs: Observable<IAuthResponse>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(userCredentials);
    } else {
      authObs = this.authService.signup(userCredentials);
    }

    authObs.subscribe({
      next: ()=> {
        this.isLoading = false;
        this.popupService.success("Auth success", "You were logged in.");
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage: string) => {
        this.popupService.error("Auth error", errorMessage);
        this.isLoading = false;
      }
    });

    this.userCredentials.reset();
  }
}
