import { Injectable, NgZone } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICleaning } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CleaningService {
  constructor(
    private firestore: Firestore,
    private ngZone: NgZone
  ) { }

  getCleaning(): Observable<ICleaning[]> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const cleaningRef = collection(this.firestore, 'cleaning');
        collectionData(cleaningRef, { idField: 'id'}).subscribe({
          next: (data) => observer.next(data as ICleaning[]),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  getCleaningById(id: string): Observable<ICleaning> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const cleaningDocRef = doc(this.firestore, `cleaning/${id}`);
        docData(cleaningDocRef, { idField: 'id' }).subscribe({
          next: (data) => observer.next(data as ICleaning),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  saveCleaning(cleaning: ICleaning) {
    const cleaningRef = collection(this.firestore, 'cleaning');
    return addDoc(cleaningRef, cleaning);
  }

  deleteCleaning(cleaning: ICleaning) {
    const cleaningDocRef = doc(this.firestore, `cleaning/${cleaning.id}`);
    return deleteDoc(cleaningDocRef);
  }

  updateCleaning(cleaning: ICleaning) {
    const cleaningDocRef = doc(this.firestore, `cleaning/${cleaning.id}`);
    return updateDoc(cleaningDocRef, { ...cleaning });
  }
}

