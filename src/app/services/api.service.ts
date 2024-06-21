import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe';
import { DataService } from './data.service';

// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent" + "?key=" + environment.GEMINI_API_KEY
  public filter = "";

    constructor(
      private http: HttpClient,
      private DataService: DataService,
    ) { }

    public filterRecipes(diet?:Array<string>, allergies?:Array<string>, caloriesRange?:Array<number>, maxIngredients?:number) : string {
      this.filter = " ";
      if (diet){
        this.filter += "diet : " + diet + " ; ";
      }
      if (allergies){
        this.filter += "allergies : " + allergies + " ; ";
      }
      if (caloriesRange){
        this.filter += "calories : " + caloriesRange + " ; ";
      }
      if (maxIngredients){
        this.filter += "maxIngredients : " + maxIngredients + " ; ";
      }
      return this.filter;
    }

    public getPreferences(userId: string) {
      return this.DataService.getPreferences(userId);
    }
  
    public generateText(prompt: string) : Observable<Recipe> {
      return this.http.post<Recipe>(this.url, {"contents":[
            {"role": "user",
              "parts":[{"text": prompt}]}],
              generation_config: {
                temperature: 0.7,
                top_p: 1,
                top_k: 32,
                max_output_tokens: 100,
              }});
    } 

    public generateByPrice(prompt: string, price: number) : Observable<Recipe> {
      return this.http.post<Recipe>(this.url, {"contents":[
            {"role": "user",
              "parts":[{"text": prompt + "constraints : " + price + " ; currency : " + "euros" + " ;"}]}]});
    }

    public generateByPreferences(userId:string, prompt:string) : Observable<Recipe> {
      const filter = this.getPreferences(userId);
      return this.http.post<Recipe>(this.url, {"contents":[
            {"role": "user",
              "parts":[{"text": prompt + "constraints : " + filter + " ;"
              }]}],
              generation_config: {
                temperature: 0.85
            }});
    }

    public generateByIngredients(prompt:string, ingredients:Array<string>, canBuyMore?:boolean, price?:number) : Observable<Recipe> {
      if (canBuyMore && price){
        return this.http.post<Recipe>(this.url, {"contents":[
              {"role": "user",
                "parts":[{"text": prompt + "constraints : " + "ingredients : " + ingredients + " ; Note that you can add more ingredients that the ones indicated;, maximum price : " + price + " ; currency : " + "euros" + " ;"}]}]});
      }
      if (canBuyMore){
        return this.http.post<Recipe>(this.url, {"contents":[
              {"role": "user",
                "parts":[{"text": prompt + "constraints : " + "ingredients : " + ingredients + " ; Note that you can add more ingredients that the ones indicated;"}]}]});
      }
      return this.http.post<Recipe>(this.url, {"contents":[
            {"role": "user",
              "parts":[{"text": prompt + "constraints : " + "ingredients : " + ingredients + " ;"}]}]});
      }
}
