import { Injectable, NgZone } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IOil } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OilService {
  constructor(
    private firestore: Firestore,
    private ngZone: NgZone
  ) { }

  getOil(): Observable<IOil[]> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const oilRef = collection(this.firestore, 'oil');
        collectionData(oilRef, { idField: 'id'}).subscribe({
          next: (data) => observer.next(data as IOil[]),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  getOilById(id: string): Observable<IOil> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const oilDocRef = doc(this.firestore, `oil/${id}`);
        docData(oilDocRef, { idField: 'id' }).subscribe({
          next: (data) => observer.next(data as IOil),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  saveOil(oil: IOil) {
    const oilRef = collection(this.firestore, 'oil');
    return addDoc(oilRef, oil);
  }

  deleteOil(oil: IOil) {
    const oilDocRef = doc(this.firestore, `oil/${oil.id}`);
    return deleteDoc(oilDocRef);
  }

  updateOil(oil: IOil) {
    const oilDocRef = doc(this.firestore, `oil/${oil.id}`);
    return updateDoc(oilDocRef, { ...oil });
  }
}
