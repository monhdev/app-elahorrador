import { Injectable, NgZone } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IMisc } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  constructor(
    private firestore: Firestore,
    private ngZone: NgZone
  ) { }

  getMisc(): Observable<IMisc[]> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const miscRef = collection(this.firestore, 'misc');
        collectionData(miscRef, { idField: 'id'}).subscribe({
          next: (data) => observer.next(data as IMisc[]),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  getMiscById(id: string): Observable<IMisc> {
    return new Observable(observer => {
      this.ngZone.run(() => {
        const miscDocRef = doc(this.firestore, `misc/${id}`);
        docData(miscDocRef, { idField: 'id' }).subscribe({
          next: (data) => observer.next(data as IMisc),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }

  saveMisc(misc: IMisc) {
    const miscRef = collection(this.firestore, 'misc');
    return addDoc(miscRef, misc);
  }

  deleteMisc(misc: IMisc) {
    const miscDocRef = doc(this.firestore, `misc/${misc.id}`);
    return deleteDoc(miscDocRef);
  }

  updateMisc(misc: IMisc) {
    const miscDocRef = doc(this.firestore, `misc/${misc.id}`);
    return updateDoc(miscDocRef, { ...misc });
  }
}

