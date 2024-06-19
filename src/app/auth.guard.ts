import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const user = auth.currentUser;
  if (user === null) {
    const router = inject(Router);
    router.navigate(['/sign-in']);
    return false;
  }
  return true;
};
