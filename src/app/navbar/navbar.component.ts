import { Component } from '@angular/core';
import { authGuard } from '../auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navItems = [
    { name: 'Dashboard', icon: '', route: '/'},
    { name: 'Generate a meal', icon: '', route: '/generate-meal' },
    { name: 'Clean my fridge', icon: '', route: '/clean-fridge'},
    { name: 'Weekly Meals Generation', icon: '', route: '/weekly-meals-generation'},
  ];

  constructor() { }
  

}
