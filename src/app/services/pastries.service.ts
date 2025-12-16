import { Injectable, NgZone } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPastries } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PastriesService {
  constructor(
    private firestore: Firestore,
    private ngZone: NgZone
  ) { }

  getPastries(): Observable<IPastries[]> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const pastriesRef = collection(this.firestore, 'pastries');
        collectionData(pastriesRef, { idField: 'id'}).subscribe({
          next: (data) => observer.next(data as IPastries[]),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  getPastriesById(id: string): Observable<IPastries> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const pastriesDocRef = doc(this.firestore, `pastries/${id}`);
        docData(pastriesDocRef, { idField: 'id' }).subscribe({
          next: (data) => observer.next(data as IPastries),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  savePastries(pastries: IPastries) {
    const pastriesRef = collection(this.firestore, 'pastries');
    return addDoc(pastriesRef, pastries);
  }

  deletePastries(pastries: IPastries) {
    const pastriesDocRef = doc(this.firestore, `pastries/${pastries.id}`);
    return deleteDoc(pastriesDocRef);
  }

  updatePastries(pastries: IPastries) {
    const pastriesDocRef = doc(this.firestore, `pastries/${pastries.id}`);
    return updateDoc(pastriesDocRef, { ...pastries });
  }
}
