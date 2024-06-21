import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
    
    public favorites: any = [];
    public user: any;
    public userId: any;
    public inProgress: boolean = false;
    public mealName: any;
    public mealIngredients: any;
    public mealInstructions: any;
    public totalPrice: any;
    public numberPeople: any;
    public maxPrice: any;
    public addedFavorite: boolean = false;
  
    constructor(
      public apiService: ApiService,
      public authService: AuthService,
      public dataService: DataService
    ) {}
  
    ngOnInit(): void {
      this.authService.isLogged.subscribe(async (value) => {
        if (value) {
          this.user = this.authService.auth.currentUser;
          this.userId = this.user?.uid || '';
          this.getFavorites();
        }
      });
    }
  
    public getFavorites() {
      this.inProgress = true;
      this.dataService.getMeals(this.userId).then((data: any) => {
        this.favorites = data;
        this.inProgress = false;
      });
    }
  
    public removeFavorite(name: any) {
      this.inProgress = true;
      this.dataService.deleteMeal(this.userId, name).then(() => {
        this.getFavorites();
      });
    }

}
