import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonCard, IonButton } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  imports: [IonCard, IonButton, AsyncPipe ],
  styleUrls: ['./products-view.component.scss'],
})
export class ProductsViewComponent  implements OnInit {

  authService: AuthService = inject(AuthService);
  productsService: ProductsService = inject(ProductsService);
  router: Router = inject(Router);

  productsList$: Observable<IProduct[]>;

  product: IProduct | undefined;

  ngOnInit() {
    this.productsList$ = this.productsService.getProducts();
  }

  constructor() {
    this.productsList$ = this.productsService.getProducts();
  }

  submitProduct(newProduct: IProduct): void {
    console.log('New product que rebem del component fill:', newProduct);
    this.productsService.saveProduct(newProduct);
  }


  deleteProduct(product: IProduct): void {
    this.productsService.deleteProduct(product);
  }

  editProduct(product: IProduct): void {
    this.product = product;
  }

  submitEditProduct(newProduct: IProduct): void {
    console.log('New Product al component Home:', newProduct);
    this.productsService.updateProduct(newProduct);
  }
}

