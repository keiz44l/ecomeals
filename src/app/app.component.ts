import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecomeals';

  constructor() { }


}