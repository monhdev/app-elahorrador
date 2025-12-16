import { Injectable, NgZone } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IDrink } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  constructor(
    private firestore: Firestore,
    private ngZone: NgZone
  ) { }

  getDrink(): Observable<IDrink[]> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const drinkRef = collection(this.firestore, 'drinks');
        collectionData(drinkRef, { idField: 'id'}).subscribe({
          next: (data) => observer.next(data as IDrink[]),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  getDrinkById(id: string): Observable<IDrink> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const drinkDocRef = doc(this.firestore, `drinks/${id}`);
        docData(drinkDocRef, { idField: 'id' }).subscribe({
          next: (data) => observer.next(data as IDrink),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
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
