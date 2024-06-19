import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-weekly-meals-generation',
  templateUrl: './weekly-meals-generation.component.html',
  styleUrl: './weekly-meals-generation.component.css'
})
export class WeeklyMealsGenerationComponent {
  
  public prompt = 'Your response should be a json of meals elements in strictly a json format (names, totalIngredients[name, amount, unit](total)). Generate random meals week prep with the following ingredients and constraints, respect it fully. Don\'t add the price of the ingredients you already have;';
  public promptMoreIngredients = 'Your response should be a json of meals elements in strictly a json format (names, totalIngredients[name, amount, unit], totalPrice). Generate random meals week prep with actual prices in France (not especially french meals), with the following following ingredients and constraints, respect it fully. Don\'t add the price of the ingredients you already have;';
  
  public ingredients: any = [];
  public ingredient: any;
  public name: any;
  public amount: any;
  public unit: any;
  public user: any;
  public userId: any;
  public mealsGenerated: any;
  public mealName: any;
  public mealIngredients: any;
  public mealInstructions: any;
  public totalPrice: any;
  public buyIngredients: any;
  public numberPeople: any;
  public maxPrice: any;
  public numberMeals: any;
  meals: any = [];
  inProgress: boolean = false;
  preferences: any;


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

  public addIngredient() {
    this.ingredients.push({name: this.name, amount: this.amount, unit: this.unit});
    console.log(this.ingredients);
  }

  public async generateWeeklyMeals() {
    this.inProgress = true;
    if (this.buyIngredients) {
      this.prompt = this.promptMoreIngredients + "Note that you can add more ingredients than the ones indicated;";
    }
    this.prompt = this.prompt + "; ingredients I have : " + JSON.stringify(this.ingredients) + " ;";
    this.prompt = this.prompt + "number of people (they eat good) : " + this.numberPeople + " ; maximum price : " + this.maxPrice + " ; currency : " + "euros" + " ;";
    this.prompt = this.prompt + "number of meals : " + this.numberMeals + " ;";
    console.log(this.prompt);
    this.apiService.generateText(this.prompt).subscribe((data: any) => {
      this.mealsGenerated = data.candidates[0].content.parts[0].text;
      console.log(this.mealsGenerated);
      this.mealsGenerated = this.mealsGenerated.replace('```json', '');
      this.mealsGenerated = this.mealsGenerated.replace('```', '');

      this.mealsGenerated = JSON.parse(this.mealsGenerated);
      this.meals = this.mealsGenerated.meals;
      console.log(this.meals);
      this.inProgress = false;
    });
  }

  public async generateWeeklyMealsByPreferences() {
    this.inProgress = true;
    this.preferences = await this.dataService.getPreferences(this.userId);
    if (this.buyIngredients) {
      this.prompt = this.promptMoreIngredients + ". Note that you can add more ingredients than the ones indicated;";
    }
    this.prompt = this.prompt + "constraints : " + "ingredients I have : " + JSON.stringify(this.ingredients) + " ; " + "number of people (they eat good) : " + this.numberPeople + " ; + maximum price : " + this.maxPrice + " ; currency : " + "euros" + " ;";
    this.prompt = this.prompt + "number of meals : " + this.numberMeals + " ;";
    this.prompt = this.prompt + "other constraints : " + this.preferences + " ;";
    console.log(this.prompt);
    this.apiService.generateText(this.prompt).subscribe((data: any) => {
      this.mealsGenerated = data.candidates[0].content.parts[0].text
      console.log(this.mealsGenerated);
      this.mealsGenerated = this.mealsGenerated.replace('```json', '');
      this.mealsGenerated = this.mealsGenerated.replace('```', '');
      console.log(this.mealsGenerated);

      this.mealsGenerated = JSON.parse(this.mealsGenerated);
      this.meals = this.mealsGenerated.meals;
      console.log(this.meals);
      this.inProgress = false;
    });
    }

  public saveMeal() {
    this.dataService.saveMeal(this.userId, this.mealsGenerated);
  }

  public goBack() {
    this.mealsGenerated = null;
  }

  public addMoreIngredients() {
    if (this.buyIngredients) {
      this.prompt = this.prompt + "Note that you can add more ingredients than the ones indicated;" + "maximum price : " + this.maxPrice + " ; currency : " + "euros" + " ; number of people (they eat good) : " + this.numberPeople + " ;";
      console.log(this.prompt);
    }
  }

  public deleteIngredient(ingredient: any) {
    this.ingredients = this.ingredients.filter((i: any) => i !== ingredient);
  }
}
