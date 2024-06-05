import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  private auth = inject(Auth);
  title = 'ecomeals';
}