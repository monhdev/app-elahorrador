import { Component, OnInit, inject } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { IProduct } from 'src/app/models/interfaces';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { ProductsInComponent } from "../products-in/products-in.component";
import { ProductsViewComponent } from '../products-view/products-view.component';
@Component({
  selector: 'app-oil',
  templateUrl: './oil.component.html',
  styleUrls: ['./oil.component.scss'],
  imports: [IonCardHeader, IonCardTitle, IonCard, ReactiveFormsModule, ProductsInComponent, ProductsViewComponent],

})
export class OilComponent  implements OnInit {

  authService: AuthService = inject(AuthService);
  productsService: ProductsService = inject(ProductsService);
  router: Router = inject(Router);

  title: string = 'Home';
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

  submitEditProduct(newProduct: IProduct): void {
    this.productsService.updateProduct(newProduct);
  }
}
