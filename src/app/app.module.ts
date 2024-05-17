import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ecomeal-8d6a3","appId":"1:187674353853:web:374d62b4f1f8715fc5d7d4","storageBucket":"ecomeal-8d6a3.appspot.com","apiKey":"AIzaSyAkwJdQhqWJCIq75oyMmO6CU-u2e9ugmIc","authDomain":"ecomeal-8d6a3.firebaseapp.com","messagingSenderId":"187674353853"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
