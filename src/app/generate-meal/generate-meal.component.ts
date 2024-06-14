import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-generate-meal',
  templateUrl: './generate-meal.component.html',
  styleUrl: './generate-meal.component.css'
})
export class GenerateMealComponent implements OnInit{

  public prompt = 'Your response should be under the format : "Name : mealName Ingredients : listIngredients Meal Instructions : mealInstructions Total Price : totalPrice". Generate a random recipe with the following constraints : total price :';
  public maxPrice: any;
  public mealName: any;
  public mealIngredients: any;
  public mealInstructions: any;
  public totalPrice: any;

  constructor(
    public apiService: ApiService,
  ) {}

  ngOnInit(): void {
  }

  public mealGenerated: any;


  public generateMeal(){
    this.prompt = this.prompt + this.maxPrice + " ; currency : " + "euros" + " ;";
    this.apiService.generateText(this.prompt).subscribe((data: any) => {
      this.mealGenerated = data.candidates[0].content.parts[0].text;
      this.mealName = this.mealGenerated.split("Ingredients")[0];
      this.mealIngredients = this.mealGenerated.split("Ingredients")[1].split("Meal Instructions")[0];
      this.mealInstructions = this.mealGenerated.split("Meal Instructions")[1].split("Total Price")[0];
      console.log(this.mealGenerated);
    });
  }

  public saveMeal(){
    this.apiService.saveText(this.mealGenerated)
  }

}
