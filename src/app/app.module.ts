import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';

// Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { SidebarModule } from 'primeng/sidebar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';


// My components
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { GenerateMealComponent } from './generate-meal/generate-meal.component';
import { CleanFridgeComponent } from './clean-fridge/clean-fridge.component';
import { WeeklyMealsGenerationComponent } from './weekly-meals-generation/weekly-meals-generation.component';
import { MealPreferencesComponent } from './meal-preferences/meal-preferences.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    GenerateMealComponent,
    CleanFridgeComponent,
    WeeklyMealsGenerationComponent,
    MealPreferencesComponent,
    NavbarComponent,
    DashboardComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ecomeal-8d6a3","appId":"1:187674353853:web:374d62b4f1f8715fc5d7d4","storageBucket":"ecomeal-8d6a3.appspot.com","apiKey":"AIzaSyAkwJdQhqWJCIq75oyMmO6CU-u2e9ugmIc","authDomain":"ecomeal-8d6a3.firebaseapp.com","messagingSenderId":"187674353853"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    SidebarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatProgressBarModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
