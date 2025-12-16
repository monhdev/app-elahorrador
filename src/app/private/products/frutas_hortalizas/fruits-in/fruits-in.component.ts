import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFruits } from 'src/app/models/interfaces';
import { FruitsService } from 'src/app/services/fruits.service';
import { IonItem, IonButton, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-fruits-in',
  templateUrl: './fruits-in.component.html',
  styleUrls: ['./fruits-in.component.scss'],
  imports: [ IonButton, IonInput, IonItem, ReactiveFormsModule]

})
export class FruitsInComponent {

  @Output() onSubmit = new EventEmitter<IFruits>();
  @Output() onEdit = new EventEmitter<IFruits>();

  mFruits: IFruits | undefined; // To track the index of the fruits being edited

  get fruits(): IFruits | undefined {
      return this.mFruits;
    }

    @Input() set fruits(fruits: IFruits | undefined) {
      if (fruits) {
        this.mFruits = fruits;
        this.setFruitsToEdit();
      }
    }

    fruitsForm!: FormGroup; // Define the type of fruitsForm if using Reactive Forms

    constructor(private fruitsService: FruitsService) {
      this.createFruitsForm();
    }

    createFruitsForm(): void {
      this.fruitsForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        units: new FormControl(''),
      });
    }

    setFruitsToEdit(): void {
      if (this.mFruits) {
        this.fruitsForm.patchValue({
          id: this.mFruits.id,
          name: this.mFruits.name,
          description: this.mFruits.description,
          price: this.mFruits.price || '',
          units: this.mFruits.units,
        });
      }
    }

    submitFruits(): void {
      if (this.fruitsForm.valid) {
        const newFruits: IFruits = this.fruitsForm.value;
        this.onSubmit.emit(newFruits);
        this.fruitsForm.reset();
      }
    }

    submitEditFruits() {
      if (this.fruitsForm.valid) {
        const newFruits: IFruits = this.fruitsForm.value;
        this.onEdit.emit(newFruits);
        this.fruitsForm.reset();
      }
    }

  }

