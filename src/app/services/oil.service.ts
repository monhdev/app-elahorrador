import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IOil } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OilService {
  firestore: Firestore = inject(Firestore);

    constructor() { }

    getOil(): Observable<IOil[]> {
      const oilRef = collection(this.firestore, 'oil');
      return collectionData(oilRef, { idField: 'id'}) as Observable<IOil[]>;
    }

    getOilById(id: string): Observable<IOil> {
      const oilDocRef = doc(this.firestore, `oil/${id}`);
      return docData(oilDocRef, { idField: 'id' }) as Observable<IOil>;
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



