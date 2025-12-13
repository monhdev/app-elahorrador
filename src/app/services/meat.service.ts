import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IMeat } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MeatService {
 firestore: Firestore = inject(Firestore);

  constructor() { }

  getMeat(): Observable<IMeat[]> {
    const meatsRef = collection(this.firestore, 'meats');
    return collectionData(meatsRef, { idField: 'id'}) as Observable<IMeat[]>;
  }

  getMeatById(id: string): Observable<IMeat> {
    const meatDocRef = doc(this.firestore, `meats/${id}`);
    return docData(meatDocRef, { idField: 'id' }) as Observable<IMeat>;
  }

  saveMeat(meat: IMeat) {
    const meatsRef = collection(this.firestore, 'meats');
    return addDoc(meatsRef, meat);
  }

  deleteMeat(meat: IMeat) {
    const meatDocRef = doc(this.firestore, `meats/${meat.id}`);
    return deleteDoc(meatDocRef);
  }

  updateMeat(meat: IMeat) {
    const meatDocRef = doc(this.firestore, `meats/${meat.id}`);
    return updateDoc(meatDocRef, { ...meat });
  }


}

