import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent{
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  public auth = inject(Auth);
  public email: string = "";
  public password: string = "";
  public validatePassword: string = "";
  public errorMessage = "";
  public verificationMessage = "";

  constructor(private router: Router, private ds: DataService) { 
  }

  public signUp() {
    if (this.password === this.validatePassword) {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Send email verification
        this.errorMessage = "";
        const user = userCredential.user;
        sendEmailVerification(user)
        this.verificationMessage = "A verification email has been sent to your email address. Please verify your email address to sign in."
        this.ds.pushUser(user.uid);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
    } else {
      this.errorMessage = "Passwords do not match";
    }
  }
      

  public signInWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      this.ds.pushUser(user.uid);
      this.router.navigate(['/']);
    })
    .catch((error) => {
      this.errorMessage = error.message;
    });
  }
}


