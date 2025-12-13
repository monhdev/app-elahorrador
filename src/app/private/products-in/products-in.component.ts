import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../models/interfaces';
import { ProductsService } from '../../services/products.service';
import { IonItem, IonButton, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-products-in',
  templateUrl: './products-in.component.html',
  styleUrls: ['./products-in.component.scss'],
  imports: [IonItem, IonInput, IonButton,ReactiveFormsModule],
})
export class ProductsInComponent {

@Output() onSubmit = new EventEmitter<IProduct>();
  @Output() onEdit = new EventEmitter<IProduct>();

  mProduct: IProduct | undefined; // To track the index of the product being edited

  get product(): IProduct | undefined {
    return this.mProduct;
  }

  @Input() set product(product: IProduct | undefined) {
    if (product) {
      this.mProduct = product;
      this.setProductToEdit();
    }
  }

  productForm!: FormGroup; // Define the type of productForm if using Reactive Forms

  constructor(private producsService: ProductsService) {
    this.createProductForm();
  }

  createProductForm(): void {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', Validators.required),
      price: new FormControl(''),
      units: new FormControl('', Validators.required),
    });
  }

  setProductToEdit(): void {
    if (this.mProduct) {
      this.productForm.patchValue({
        id: this.mProduct.id,
        name: this.mProduct.name,
        description: this.mProduct.description,
        price: this.mProduct.price || '',
        units: this.mProduct.units,
      });
    }
  }

  submitProduct(): void {
    if (this.productForm.valid) {
      const newProduct: IProduct = this.productForm.value;
      console.log('New Product al component FormProducts abans d\'emetre:', newProduct);
      this.onSubmit.emit(newProduct);
      this.productForm.reset();
    }
  }

  submitEditProduct() {
    if (this.productForm.valid) {
      const newProduct: IProduct = this.productForm.value;
      this.onEdit.emit(newProduct);
      this.productForm.reset();
    }
  }

}

