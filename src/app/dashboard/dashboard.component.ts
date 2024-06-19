import { Component, inject } from '@angular/core';
import { Auth } from "@angular/fire/auth";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public auth = inject(Auth);
  public user = this.auth.currentUser;
  public name = this.user?.displayName;

  constructor(private authService: AuthService) { }


  NgOnInit(): void {
    this.authService.isLogged.subscribe((value) => {
      if (value) {
        this.user = this.auth.currentUser;
        this.name = this.user?.displayName;
      }
    });
  }

}
