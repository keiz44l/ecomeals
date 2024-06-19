import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WeeklyMealsGenerationComponent } from './weekly-meals-generation/weekly-meals-generation.component';
import { CleanFridgeComponent } from './clean-fridge/clean-fridge.component';
import { GenerateMealComponent } from './generate-meal/generate-meal.component';
import { MealPreferencesComponent } from './meal-preferences/meal-preferences.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';


const routes: Routes = [
  { path: 'generate-meal', component: GenerateMealComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'weekly-meals-generation', component: WeeklyMealsGenerationComponent},
  { path: 'clean-fridge', component: CleanFridgeComponent},
  { path: 'meal-preferences', component: MealPreferencesComponent, canActivate: [authGuard]},
  { path: '', component: DashboardComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
