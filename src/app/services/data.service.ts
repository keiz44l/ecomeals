import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, getDocs, query, updateDoc, doc, setDoc, deleteDoc } from '@angular/fire/firestore';

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
    await this.getMeals(userId).then(async (meals: any) => {
        if (meals) {
            meals.push(meal);
            await updateDoc(doc(this.firestore, 'users', userId), {
                meals: meals
            });
        } else {
            await setDoc(doc(this.firestore, 'users', userId), {
                meals: [meal]
            });
        }
    });
  }

  async getMeals(userId: string) {
    const querySnapshot = await getDocs(collection(this.firestore, "users"));
    for (const doc of querySnapshot.docs) {
        if (doc.data()["userId"] === userId) {
            return doc.data()["meals"];
        }
    }
    return null;
  }

  async getMeal(userId: string, mealId: string) {
      const querySnapshot = await getDocs(collection(this.firestore, "users"));
      for (const snapshot of querySnapshot.docs) {
          const doc = snapshot.data();
          if (doc["userId"] === userId) {
              return doc["meals"].filter((meal: any) => meal.id === mealId);
          }
      }
      return null;
  }

  async deleteMeal(userId: string, mealName: string) {
    await this.getMeals(userId).then(async (meals: any) => {
        if (meals) {
            const newMeals = meals.filter((meal: any) => meal.name !== mealName);
            await updateDoc(doc(this.firestore, 'users', userId), {
                meals: newMeals
            });
        }
    });
  }

}
