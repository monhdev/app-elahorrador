import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IDrink } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
 firestore: Firestore = inject(Firestore);

  constructor() { }

  getDrink(): Observable<IDrink[]> {
    const drinkRef = collection(this.firestore, 'drinks');
    return collectionData(drinkRef, { idField: 'id'}) as Observable<IDrink[]>;
  }

  getDrinkById(id: string): Observable<IDrink> {
    const drinkDocRef = doc(this.firestore, `drinks/${id}`);
    return docData(drinkDocRef, { idField: 'id' }) as Observable<IDrink>;
  }

  saveDrink(drink: IDrink) {
    const drinkRef = collection(this.firestore, 'drinks');
    return addDoc(drinkRef, drink);
  }

  deleteDrink(drink: IDrink) {
    const drinkDocRef = doc(this.firestore, `drinks/${drink.id}`);
    return deleteDoc(drinkDocRef);
  }

  updateDrink(drink: IDrink) {
    const drinkDocRef = doc(this.firestore, `drinks/${drink.id}`);
    return updateDoc(drinkDocRef, { ...drink });
  }


}

