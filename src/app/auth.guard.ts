import { CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';

export const authGuard: CanActivateFn = (route, state) => {
  const signInComponent = inject(SignInComponent);
  const router = inject(Router);
  if (!signInComponent.isAuthenticated()) {
    router.navigate(['/sign-in']);
    return false;
  }
  return true;
};
