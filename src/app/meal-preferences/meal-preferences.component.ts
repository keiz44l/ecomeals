import { Component, inject, OnInit } from '@angular/core';
import { Auth } from "@angular/fire/auth";
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-meal-preferences',
  templateUrl: './meal-preferences.component.html',
  styleUrls: ['./meal-preferences.component.css']
})
export class MealPreferencesComponent implements OnInit {
  
  auth = inject(Auth);
  user = this.auth.currentUser;
  userId = this.user?.uid || '';
  mail = this.user?.email || '';
  preferences: any = {};
  languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Punjabi', 'Urdu', 'Turkish', 'Vietnamese', 'Thai', 'Swedish', 'Bulgarian', 'Catalan', 'Czech', 'Danish', 'Finnish', 'Greek', 'Hebrew', 'Hungarian', 'Indonesian', 'Latvian', 'Lithuanian', 'Norwegian', 'Polish', 'Romanian', 'Slovak', 'Slovenian', 'Ukrainian', 'Vietnamese', 'Afrikaans', 'Albanian', 'Amharic', 'Armenian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bosnian', 'Croatian', 'Dutch', 'Estonian', 'Filipino', 'Galician', 'Georgian', 'Gujarati', 'Haitian Creole', 'Hausa', 'Hmong', 'Icelandic', 'Igbo', 'Irish', 'Javanese', 'Kannada', 'Kazakh', 'Khmer', 'Lao', 'Latin', 'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Maori', 'Marathi', 'Mongolian', 'Nepali', 'Pashto', 'Persian', 'Serbian', 'Sinhala', 'Somali', 'Swahili', 'Tamil', 'Telugu', 'Uzbek', 'Welsh', 'Yiddish', 'Yoruba', 'Zulu'];
  language = 'English';

  diets = ['Vegetarian', 'Vegan', 'Paleo', 'High-Fiber', 'High-Protein', 'Low-Carb', 'Low-Fat', 'Low-Sodium', 'Low-Sugar', 'Alcohol-Free', 'Balanced', 'Immunity'];
  allergies = ['Gluten', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts'];

  constructor(private authService: AuthService, private dataService: DataService) {
    this.preferences = {
      caloriesMin: null,
      caloriesMax: null,
      maxIngredients: null,
      diet: {},
      allergies: {},

    };
  }


  ngOnInit(): void {
    this.authService.isLogged.subscribe(async (value) => {
      if (value) {
        this.user = this.auth.currentUser;
        this.userId = this.user?.uid || '';
        this.mail = this.user?.email || '';
        this.preferences = await this.getPreferences();
      }
    });
  }

  private async getPreferences() {
    try {
      const data = await this.dataService.getPreferences(this.userId);
      return data;
    } catch (error) {
      console.error('Error fetching preferences', error);
      return {
        caloriesMin: null,
        caloriesMax: null,
        maxIngredients: null,
        diet: {
          vegetarian: false,
          vegan: false,
          paleo: false,
          highFiber: false,
          highProtein: false,
          lowCarb: false,
          lowFat: false,
          lowSodium: false,
          lowSugar: false,
          alcoholFree: false,
          balanced: false,
          immunity: false
        },
        allergies: {
          gluten: false,
          dairy: false,
          eggs: false,
          soy: false,
          wheat: false,
          fish: false,
          shellfish: false,
          treeNuts: false,
          peanuts: false
        },
        language : 'English'
      };
    }
  }

  public savePreferences() {
    this.dataService.pushPreferences(this.userId, this.preferences);
  }
}
