import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../models/interfaces';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
    firestore: Firestore = inject(Firestore);

  constructor() { }

  getProducts(): Observable<IProduct[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id'}) as Observable<IProduct[]>;
  }

  getProductById(id: string): Observable<IProduct> {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return docData(productDocRef, { idField: 'id' }) as Observable<IProduct>;
  }

  saveProduct(product: IProduct) {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, product);
  }

  deleteProduct(product: IProduct) {
    const productDocRef = doc(this.firestore, `products/${product.id}`);
    return deleteDoc(productDocRef);
  }

  updateProduct(product: IProduct) {
    const productDocRef = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productDocRef, { ...product });
  }


}
