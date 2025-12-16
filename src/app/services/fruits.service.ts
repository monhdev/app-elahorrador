import { Injectable, NgZone } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IFruits } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FruitsService {
  constructor(
    private firestore: Firestore,
    private ngZone: NgZone
  ) { }

  getFruits(): Observable<IFruits[]> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const fruitsRef = collection(this.firestore, 'fruits');
        collectionData(fruitsRef, { idField: 'id'}).subscribe({
          next: (data) => observer.next(data as IFruits[]),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  getFruitsById(id: string): Observable<IFruits> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const fruitsDocRef = doc(this.firestore, `fruits/${id}`);
        docData(fruitsDocRef, { idField: 'id' }).subscribe({
          next: (data) => observer.next(data as IFruits),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  saveFruits(fruits: IFruits) {
    const fruitsRef = collection(this.firestore, 'fruits');
    return addDoc(fruitsRef, fruits);
  }

  deleteFruits(fruits: IFruits) {
    const fruitsDocRef = doc(this.firestore, `fruits/${fruits.id}`);
    return deleteDoc(fruitsDocRef);
  }

  updateFruits(fruits: IFruits) {
    const fruitsDocRef = doc(this.firestore, `fruits/${fruits.id}`);
    return updateDoc(fruitsDocRef, { ...fruits });
  }
}



