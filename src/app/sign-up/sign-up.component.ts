import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  public signUp() {
    if (this.password === this.validatePassword) {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
    }
    else {
      this.errorMessage = "passwords-do-not-match";
    }
  }
}


