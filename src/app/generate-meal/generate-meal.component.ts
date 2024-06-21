import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-generate-meal',
  templateUrl: './generate-meal.component.html',
  styleUrl: './generate-meal.component.css'
})
export class GenerateMealComponent implements OnInit{

  public prompt = 'Your response should be strictly a json format (name, ingredients[name, amount, unit, price], instructions[instructions], totalPrice, calories). Generate a random meal with actual prices in France (not especially french meals), with the following constraints, respect it fully. Note that if calories is specified, its per person. maximum price of the meal(not per person):';
  public maxPrice: any;
  public mealName: any;
  public mealIngredients: any;
  public mealInstructions: any;
  public totalPrice: any;
  public numberPeople: any;
  public mealCalories: any;
  public user: any;
  public userId: any;
  inProgress: boolean = false;
  addedFavorite: boolean = false;

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
      }
    });
  }

  public mealGenerated: any;

  public generateMeal() {
    this.inProgress = true;
    this.prompt = this.prompt + this.maxPrice + " ; currency : " + "euros" + " ; number of people (they eat good) : " + this.numberPeople + " ;";
    this.apiService.generateText(this.prompt).subscribe((data: any) => {
      this.mealGenerated = data.candidates[0].content.parts[0].text;
      this.mealGenerated = this.mealGenerated.replace('```json', '');
      this.mealGenerated = this.mealGenerated.replace('```', '');

      try {
        this.mealGenerated = JSON.parse(this.mealGenerated);
        this.inProgress = false;
        this.mealName = this.mealGenerated.name;
        this.mealIngredients = this.mealGenerated.ingredients;
        this.mealInstructions = this.mealGenerated.instructions;
        this.totalPrice = this.mealGenerated.totalPrice;
        this.mealCalories = this.mealGenerated.calories;
      } catch (error) {
        console.log('Error generating meal:', error);
        this.inProgress = false;
        this.generateMeal();
      }
    });

  }

  public async generateMealByPreferences() {
    this.inProgress = false;
    this.inProgress = true;
    const preferences = await this.dataService.getPreferences(this.userId);
    if (preferences) {
      this.prompt = this.prompt + this.maxPrice + " €" + " ; currency : " + "euros" + " ; number of people (they eat good) : " + this.numberPeople + " ;" + "preferences : " + JSON.stringify(preferences) + " ;";
      console.log(this.prompt);
      this.apiService.generateByPreferences(this.userId, this.prompt).subscribe((data: any) => {
        this.mealGenerated = data.candidates[0].content.parts[0].text
        this.mealGenerated = this.mealGenerated.replace('```json', '');
        this.mealGenerated = this.mealGenerated.replace('```', '');
        try {
          this.inProgress = false;
          this.mealGenerated = JSON.parse(this.mealGenerated);
          this.mealName = this.mealGenerated.name;
          this.mealIngredients = this.mealGenerated.ingredients;
          this.mealInstructions = this.mealGenerated.instructions;
          this.totalPrice = this.mealGenerated.totalPrice;
          this.mealCalories = this.mealGenerated.calories;
        } catch (error) {
          console.log('Error generating meal:', error);
          this.inProgress = false;
          this.generateMealByPreferences();
        }
      });
    } else {
      console.log('No preferences found for user:', this.userId);
    }
  }

  public goBack() {
    this.inProgress = false;
    this.mealGenerated = null;
  }

  public saveMeal() {
    this.dataService.saveMeal(this.userId, this.mealGenerated);
    this.addedFavorite = true;
  }

  public deleteMeal() {
    this.dataService.deleteMeal(this.userId, this.mealGenerated);
    this.addedFavorite = false;
  }
}