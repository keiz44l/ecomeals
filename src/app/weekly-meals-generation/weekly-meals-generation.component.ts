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
  
  public prompt = 'Your response should be a json of meals elements in strictly a json format (names, totalIngredients[name, amount, unit](total), calories). Generate random meals week prep with the following ingredients and constraints, respect it fully. Don\'t add the price of the ingredients you already have; Note that if calories is specified, its per person.';
  public promptMoreIngredients = 'Your response should be a json of meals elements in strictly a json format (names, totalIngredients[name, amount, unit], totalPrice, calories). Generate random meals week prep with actual prices in France (not especially french meals), with the following following ingredients and constraints, respect it fully. Don\'t add the price of the ingredients you already have; Note that if calories is specified, its per person.';
  
  public ingredients: any = [];
  public ingredient: any;
  public name: any;
  public amount: any;
  public unit: any;
  public user: any;
  public userId: any;
  public mealsGenerated: any = [];
  public mealName: any;
  public mealIngredients: any;
  public mealInstructions: any;
  public totalPrice: any;
  public buyIngredients: any;
  public numberPeople: any;
  public maxPrice: any;
  public numberMeals: any;
  public mealCalories: any;
  meals: any = [];
  inProgress: boolean = false;
  generated: boolean = false;
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
    this.prompt = this.prompt + "number of people (they eat good) : " + this.numberPeople + " ; maximum price (not per person): " + this.maxPrice + " ; currency : " + "euros" + " ;";
    this.prompt = this.prompt + "number of meals : " + this.numberMeals + " ;";
    this.apiService.generateText(this.prompt).subscribe((data: any) => {
      this.mealsGenerated = data.candidates[0].content.parts[0].text;
      this.mealsGenerated = this.mealsGenerated.replace('```json', '');
      this.mealsGenerated = this.mealsGenerated.replace('```', '');

      try {
        this.mealsGenerated = JSON.parse(this.mealsGenerated);
        this.inProgress = false;
        this.meals = this.mealsGenerated.meals;
      } catch (error) {
        console.log('Error generating meal:', error);
        this.inProgress = false;
        this.generateWeeklyMeals();
      }
    });
  }

  public async generateWeeklyMealsByPreferences() {
    this.inProgress = true;
    this.preferences = await this.dataService.getPreferences(this.userId);
    if (this.buyIngredients) {
      this.prompt = this.promptMoreIngredients + ". Note that you can add more ingredients than the ones indicated;";
    }
    if (this.numberMeals > 2){
      // Generate meals in pairs (avoid too many meals generated at once)
      console.log('Number of meals:', this.numberMeals);
      const iterations = Math.floor(this.numberMeals / 2);
      console.log('Iterations:', iterations);
      for (let i = 0; i < iterations; i++) {
        this.prompt = this.prompt + "constraints : " + "ingredients I have : " + JSON.stringify(this.ingredients) + " ; " + "number of people (they eat good) : " + this.numberPeople + " ; + maximum price (not per person): " + this.maxPrice + " ; currency : " + "euros" + " ;";
        this.prompt = this.prompt + "number of meals : " + 2 + " ;";
        this.prompt = this.prompt + "other constraints : " + this.preferences + " ;";
        this.apiService.generateText(this.prompt).subscribe((data: any) => {
          this.mealsGenerated = data.candidates[0].content.parts[0].text
          console.log(this.mealsGenerated);
          this.mealsGenerated = this.mealsGenerated.replace('```json', '');
          this.mealsGenerated = this.mealsGenerated.replace('```', '');
          try {
            this.inProgress = false;
            this.mealsGenerated = JSON.parse(this.mealsGenerated);
            console.log(this.mealsGenerated);
            this.meals.push(this.mealsGenerated.meals[0]);
            this.meals.push(this.mealsGenerated.meals[1]);
            this.numberMeals = this.numberMeals - 2;
          } catch (error) {
            console.log('Error generating meal:', error);
            this.inProgress = false;
            this.generateWeeklyMealsByPreferences();
          }
        });
      }
    }
    if (this.numberMeals % 2 !== 0) {
      this.prompt = this.prompt + "constraints : " + "ingredients I have : " + JSON.stringify(this.ingredients) + " ; " + "number of people (they eat good) : " + this.numberPeople + " ; + maximum price (not per person): " + this.maxPrice + " ; currency : " + "euros" + " ;";
      this.prompt = this.prompt + "number of meals : " + this.numberMeals + " ;";
      this.prompt = this.prompt + "other constraints : " + this.preferences + " ;";
      this.apiService.generateText(this.prompt).subscribe((data: any) => {
        this.mealsGenerated = data.candidates[0].content.parts[0].text
        this.mealsGenerated = this.mealsGenerated.replace('```json', '');
        this.mealsGenerated = this.mealsGenerated.replace('```', '');

        try {
          this.inProgress = false;
          this.mealsGenerated = JSON.parse(this.mealsGenerated);
          this.meals.push(this.mealsGenerated.meals);
        } catch (error) {
          console.log('Error generating meal:', error);
          this.inProgress = false;
          this.generateWeeklyMealsByPreferences();
        }
      });
    }
    this.generated = true;
  }

  public saveMeal(meal: any) {
    this.dataService.saveMeal(this.userId, meal);
  }

  public goBack() {
    this.inProgress = false;
    this.mealsGenerated = null;
  }

  public deleteIngredient(ingredient: any) {
    this.ingredients = this.ingredients.filter((i: any) => i !== ingredient);
  }
}
