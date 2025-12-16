import { Injectable, NgZone } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IHygiene } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HygieneService {
  constructor(
    private firestore: Firestore,
    private ngZone: NgZone
  ) { }

  getHygiene(): Observable<IHygiene[]> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const hygieneRef = collection(this.firestore, 'hygiene');
        collectionData(hygieneRef, { idField: 'id'}).subscribe({
          next: (data) => observer.next(data as IHygiene[]),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  getHygieneById(id: string): Observable<IHygiene> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const hygieneDocRef = doc(this.firestore, `hygiene/${id}`);
        docData(hygieneDocRef, { idField: 'id' }).subscribe({
          next: (data) => observer.next(data as IHygiene),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  saveHygiene(hygiene: IHygiene) {
    const hygieneRef = collection(this.firestore, 'hygiene');
    return addDoc(hygieneRef, hygiene);
  }

  deleteHygiene(hygiene: IHygiene) {
    const hygieneDocRef = doc(this.firestore, `hygiene/${hygiene.id}`);
    return deleteDoc(hygieneDocRef);
  }

  updateHygiene(hygiene: IHygiene) {
    const hygieneDocRef = doc(this.firestore, `hygiene/${hygiene.id}`);
    return updateDoc(hygieneDocRef, { ...hygiene });
  }
}

