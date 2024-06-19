import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  isLogged: boolean = false;
  user:any;


  navItems = [
    { name: 'Dashboard', icon: '', route: '/'},
    { name: 'Generate a meal', icon: '', route: '/generate-meal' },
    { name: 'Clean my fridge', icon: '', route: '/clean-fridge'},
    { name: 'Weekly Meals Generation', icon: '', route: '/weekly-meals-generation'},
  ];


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLogged.subscribe((value) => {
      this.isLogged = value;
    });
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }


  

}
