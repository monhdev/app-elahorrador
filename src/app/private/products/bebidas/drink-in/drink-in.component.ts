import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDrink } from 'src/app/models/interfaces';
import { DrinkService } from 'src/app/services/drink.service';
import { IonItem, IonButton, IonInput, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-drink-in',
  templateUrl: './drink-in.component.html',
  styleUrls: ['./drink-in.component.scss'],
  imports: [ IonButton, IonInput, IonItem, ReactiveFormsModule]
})
export class DrinkInComponent {

  @Output() onSubmit = new EventEmitter<IDrink>();
  @Output() onEdit = new EventEmitter<IDrink>();

  mDrink: IDrink | undefined; // To track the index of the drink being edited

  get drink(): IDrink | undefined {
      return this.mDrink;
    }

    @Input() set drink(drink: IDrink | undefined) {
      if (drink) {
        this.mDrink = drink;
        this.setDrinkToEdit();
      }
    }

    drinkForm!: FormGroup; // Define the type of drinkForm if using Reactive Forms

    constructor(private drinkService: DrinkService) {
      this.createDrinkForm();
    }

    createDrinkForm(): void {
      this.drinkForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', Validators.required),
        price: new FormControl(''),
        units: new FormControl('', Validators.required),
      });
    }

    setDrinkToEdit(): void {
      if (this.mDrink) {
        this.drinkForm.patchValue({
          id: this.mDrink.id,
          name: this.mDrink.name,
          description: this.mDrink.description,
          price: this.mDrink.price || '',
          units: this.mDrink.units,
        });
      }
    }

    submitDrink(): void {
      if (this.drinkForm.valid) {
        const newDrink: IDrink = this.drinkForm.value;
        this.onSubmit.emit(newDrink);
        this.drinkForm.reset();
      }
    }

    submitEditDrink() {
      if (this.drinkForm.valid) {
        const newDrink: IDrink = this.drinkForm.value;
        this.onEdit.emit(newDrink);
        this.drinkForm.reset();
      }
    }

  }
