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

  public prompt = 'Your response should be strictly a json format (name, ingredients[name, amount, unit, totalPrice(*1.2)], instructions[instructions], totalPrice). Generate a random meal with actual prices in France (not especially french meals), with the following constraints, respect it fully: total price :';
  public maxPrice: any;
  public mealName: any;
  public mealIngredients: any;
  public mealInstructions: any;
  public totalPrice: any;
  public numberPeople: any;
  public user: any;
  public userId: any;
  inProgress: boolean = false;

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

      this.mealGenerated = JSON.parse(this.mealGenerated);
      this.mealName = this.mealGenerated.name;
      this.mealIngredients = this.mealGenerated.ingredients;
      console.log(this.mealIngredients);
      this.mealInstructions = this.mealGenerated.instructions;
      this.totalPrice = this.mealGenerated.totalPrice;
    });
    this.inProgress = false;
  }

  public async generateMealByPreferences() {
    this.inProgress = true;
    const preferences = await this.dataService.getPreferences(this.userId);
    if (preferences) {
      this.prompt = this.prompt + this.totalPrice + "constraints : " + JSON.stringify(preferences) + " ;";
      console.log(this.prompt);
      this.apiService.generateByPreferences(this.userId, this.prompt).subscribe((data: any) => {
        this.mealGenerated = data.candidates[0].content.parts[0].text
        this.mealGenerated = this.mealGenerated.replace('```json', '');
        this.mealGenerated = this.mealGenerated.replace('```', '');

        this.mealGenerated = JSON.parse(this.mealGenerated);
        this.mealName = this.mealGenerated.name;
        this.mealIngredients = this.mealGenerated.ingredients;
        this.mealInstructions = this.mealGenerated.instructions;
        this.totalPrice = this.mealGenerated.totalPrice;
        this.inProgress = false;
      });
    } else {
      console.log('No preferences found for user:', this.userId);
    }
  }

  public goBack() {
    this.mealGenerated = null;
  }

  public saveMeal() {
    this.dataService.saveMeal(this.userId, this.mealGenerated);
  }
}