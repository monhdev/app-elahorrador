import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IHygiene } from 'src/app/models/interfaces';
import { HygieneService } from 'src/app/services/hygiene.service';
import { IonItem, IonButton, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-hygiene-in',
  templateUrl: './hygiene-in.component.html',
  styleUrls: ['./hygiene-in.component.scss'],
  imports: [ IonButton, IonInput, IonItem, ReactiveFormsModule]

})
export class HygieneInComponent {

  @Output() onSubmit = new EventEmitter<IHygiene>();
  @Output() onEdit = new EventEmitter<IHygiene>();

  mHygiene: IHygiene | undefined; // To track the index of the hygiene being edited

  get hygiene(): IHygiene | undefined {
      return this.mHygiene;
    }

    @Input() set hygiene(hygiene: IHygiene | undefined) {
      if (hygiene) {
        this.mHygiene = hygiene;
        this.setHygieneToEdit();
      }
    }

    hygieneForm!: FormGroup; // Define the type of hygieneForm if using Reactive Forms

    constructor(private hygieneService: HygieneService) {
      this.createHygieneForm();
    }

    createHygieneForm(): void {
      this.hygieneForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        units: new FormControl(''),
      });
    }

    setHygieneToEdit(): void {
      if (this.mHygiene) {
        this.hygieneForm.patchValue({
          id: this.mHygiene.id,
          name: this.mHygiene.name,
          description: this.mHygiene.description,
          price: this.mHygiene.price || '',
          units: this.mHygiene.units,
        });
      }
    }

    submitHygiene(): void {
      if (this.hygieneForm.valid) {
        const newHygiene: IHygiene = this.hygieneForm.value;
        this.onSubmit.emit(newHygiene);
        this.hygieneForm.reset();
      }
    }

    submitEditHygiene() {
      if (this.hygieneForm.valid) {
        const newHygiene: IHygiene = this.hygieneForm.value;
        this.onEdit.emit(newHygiene);
        this.hygieneForm.reset();
      }
    }

  }

