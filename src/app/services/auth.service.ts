import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: Observable<boolean>;
  auth = inject(Auth);

  constructor(private router: Router) {
    this.isLogged = new Observable<boolean>(observer => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });
  }

  public signOut() {
    this.auth.signOut();
  }
}
