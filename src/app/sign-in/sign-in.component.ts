import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";

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

  constructor() { }

  public signIn() {
    
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
}
