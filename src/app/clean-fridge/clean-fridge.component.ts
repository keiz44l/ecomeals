import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-clean-fridge',
  templateUrl: './clean-fridge.component.html',
  styleUrl: './clean-fridge.component.css'
})
export class CleanFridgeComponent {

    public prompt = 'Your response should be strictly a json format (name, ingredients[name, amount, unit], instructions[instructions]). Generate a random meal with the following ingredients and constraints, respect it fully:';
    public promptMoreIngredients = 'Your response should be strictly a json format (name, ingredients[name, amount, unit, totalPrice(*1.2) if new ingredient], instructions[instructions], totalPrice). Generate a random meal with actual prices in France (not especially french meals), with the following following ingredients and constraints, respect it fully';
    
    public ingredients: any = [];
    public ingredient: any;
    public name: any;
    public amount: any;
    public unit: any;
    public user: any;
    public userId: any;
    public mealGenerated: any;
    public mealName: any;
    public mealIngredients: any;
    public mealInstructions: any;
    public totalPrice: any;
    public buyIngredients: any;
    public numberPeople: any;
    public maxPrice: any;
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

    public addIngredient() {
      this.ingredients.push({name: this.name, amount: this.amount, unit: this.unit});
      console.log(this.ingredients);
    }

    public async cleanFridge() {
      this.inProgress = true;
      if (this.buyIngredients) {
        this.prompt = this.promptMoreIngredients + "Note that you can add more ingredients than the ones indicated;";
      }
      this.prompt = this.prompt + "; ingredients I have : " + JSON.stringify(this.ingredients) + " ;";
      this.prompt = this.prompt + "number of people (they eat good) : " + this.numberPeople + " ; maximum price : " + this.maxPrice + " ; currency : " + "euros" + " ;";
      console.log(this.prompt);
      this.apiService.generateText(this.prompt).subscribe((data: any) => {
        this.mealGenerated = data.candidates[0].content.parts[0].text
        this.mealGenerated = this.mealGenerated.replace('```json', '');
        this.mealGenerated = this.mealGenerated.replace('```', '');

        this.mealGenerated = JSON.parse(this.mealGenerated);
        this.mealName = this.mealGenerated.name;
        this.mealIngredients = this.mealGenerated.ingredients;
        console.log(this.mealIngredients);
        this.mealInstructions = this.mealGenerated.instructions;
        this.totalPrice = this.mealGenerated.totalPrice;
        this.inProgress = false;
      });
    }

    public async cleanFridgeByPreferences() {
      this.inProgress = true;
      if (this.buyIngredients) {
        this.prompt = this.promptMoreIngredients + ". Note that you can add more ingredients than the ones indicated;";
      }
      this.prompt = this.prompt + "constraints : " + "ingredients I have : " + JSON.stringify(this.ingredients) + " ; " + "number of people (they eat good) : " + this.numberPeople + " ; + maximum price : " + this.maxPrice + " ; currency : " + "euros" + " ;";
      console.log(this.prompt);
      this.apiService.generateByPreferences(this.userId, this.prompt).subscribe((data: any) => {
        this.mealGenerated = data.candidates[0].content.parts[0].text
        this.mealGenerated = this.mealGenerated.replace('```json', '');
        this.mealGenerated = this.mealGenerated.replace('```', '');

        this.mealGenerated = JSON.parse(this.mealGenerated);
        this.mealName = this.mealGenerated.name;
        this.mealIngredients = this.mealGenerated.ingredients;
        console.log(this.mealIngredients);
        this.mealInstructions = this.mealGenerated.instructions;
        this.totalPrice = this.mealGenerated.totalPrice;
        this.inProgress = false;
      });
      }

    public saveMeal() {
      this.dataService.saveMeal(this.userId, this.mealGenerated);
    }
  
    public goBack() {
      this.mealGenerated = null;
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
