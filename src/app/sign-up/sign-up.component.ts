import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";

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


  constructor() { }

  public signUp() {
    if (this.password === this.validatePassword) {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        // To finish -> handle error in html
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
    else {
      // To finish -> handle error in html
      const errorCode = "passwords-do-not-match";
    }
  }
}


