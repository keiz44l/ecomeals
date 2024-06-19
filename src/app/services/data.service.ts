import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, getDocs, query, updateDoc, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  preferences = {
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
    }
  };

  constructor(public firestore: Firestore) { }

  async pushUser(userId: string) {
    await setDoc(doc(this.firestore, 'users', userId), {
        userId: userId,
        preferences: this.preferences,
        meals: []
    });
  }

  async pushPreferences(userId: string, newPreferences: any) {
    await updateDoc(doc(this.firestore, 'users', userId), {
        preferences: newPreferences
    });
  }

  async getPreferences(userId: string) {
    const querySnapshot = await getDocs(collection(this.firestore, "users"));
    for (const doc of querySnapshot.docs) {
        if (doc.data()["userId"] === userId) {
            return doc.data()["preferences"];
        }
    }
    return null;
  }

  async saveMeal(userId: string, meal: any) {
    await updateDoc(doc(this.firestore, 'users', userId), {
        // add meal to meals array
        meals: meal
    });
  }
}
