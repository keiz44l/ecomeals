import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';

// Environment
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent" + "?key=" + environment.GEMINI_API_KEY
  public filter = "";

    constructor(
      private http: HttpClient
    ) { }

    public filterRecipes(diet?:Array<string>, allergies?:Array<string>, caloriesRange?:Array<number>, maxIngredients?:number) : string{
      if (diet){
        this.filter = this.filter + "diet : " + diet + " ; ";
      }
      if (allergies){
        this.filter = this.filter + "allergies : " + allergies + " ; ";
      }
      if (caloriesRange){
        this.filter = this.filter + "calories : " + caloriesRange + " ; ";
      }
      if (maxIngredients){
        this.filter = this.filter + "max ingredients : " + maxIngredients + " ; ";
      }
      return this.filter;
    }
  
    public generateText(prompt: string) : Observable<Recipe> {
      return this.http.post<Recipe>(this.url, {"contents":[
            {"role": "user",
              "parts":[{"text": prompt}]}]});
    } 

    public generateByPrice(prompt: string, price: number) : Observable<Recipe> {
      return this.http.post<Recipe>(this.url, {"contents":[
            {"role": "user",
              "parts":[{"text": prompt + "constraints : " + price + " ; currency : " + "euros" + " ;"}]}]});
    }

    public generateByPreferences(prompt:string,filter:string) : Observable<Recipe> {
      return this.http.post<Recipe>(this.url, {"contents":[
            {"role": "user",
              "parts":[{"text": prompt + "constraints : " + filter + " ;"}]}]});
      
    }

    public generateByIngredients(prompt:string, ingredients:Array<string>, canBuyMore?:boolean) : Observable<Recipe> {
      if (canBuyMore){
        return this.http.post<Recipe>(this.url, {"contents":[
              {"role": "user",
                "parts":[{"text": prompt + "constraints : " + "ingredients : " + ingredients + " ; Note that you can add more ingredients that the ones indicated;"}]}]});
      }
      return this.http.post<Recipe>(this.url, {"contents":[
            {"role": "user",
              "parts":[{"text": prompt + "constraints : " + "ingredients : " + ingredients + " ;"}]}]});
      }

      public generateWeeklyRecipes(prompt:string, diet?:Array<string>, allergies?:Array<string>, caloriesRange?:Array<number>, maxIngredients?:number) : Observable<Recipe> {
        return this.http.post<Recipe>(this.url, {"contents":[
              {"role": "user",
                "parts":[{"text": prompt + "constraints : " + this.filterRecipes(diet, allergies, caloriesRange, maxIngredients) + " ;"}]}]});

      }

      public saveText(text: string) : string{
        // Save text to database
        return "Saved!"
      }

    
}
