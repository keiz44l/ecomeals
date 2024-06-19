import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  public auth = inject(Auth);
  public email: string = "";
  public password: string = "";
  public errorMessage = "";
  public isAuth = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  public signIn() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          this.errorMessage = "Please verify your email address before signing in.";
        } else {
          // Signed in
        this.isAuth.next(true);
        this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

    public signInWithGoogle() {
      signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCredential) => {
        // Signed in
        this.isAuth.next(true);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
    }

    get isAuthenticated$(): Observable<boolean> {
      return this.isAuth.asObservable();
    }

  }
