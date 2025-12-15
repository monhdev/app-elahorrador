import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOil } from '../../../../models/interfaces';
import { OilService } from '../../../../services/oil.service';
import { IonItem, IonButton, IonInput } from "@ionic/angular/standalone";


@Component({
  selector: 'app-oil-in',
  templateUrl: './oil-in.component.html',
  styleUrls: ['./oil-in.component.scss'],
  imports: [IonItem, IonInput, IonButton, ReactiveFormsModule],

})
export class OilInComponent {
  @Output() onSubmit = new EventEmitter<IOil>();
  @Output() onEdit = new EventEmitter<IOil>();

  mOil: IOil | undefined; // To track the index of the oil being edited

  get oil(): IOil | undefined {
    return this.mOil;
  }

  @Input() set oil(oil: IOil | undefined) {
    if (oil) {
      this.mOil = oil;
      this.setOilToEdit();
    }
  }

  oilForm!: FormGroup; // Define the type of oilForm if using Reactive Forms

  constructor(private oilService: OilService) {
    this.createOilForm();
  }

  createOilForm(): void {
    this.oilForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', Validators.required),
      price: new FormControl(''),
      units: new FormControl('', Validators.required),
    });
  }

  setOilToEdit(): void {
    if (this.mOil) {
      this.oilForm.patchValue({
        id: this.mOil.id,
        name: this.mOil.name,
        description: this.mOil.description,
        price: this.mOil.price || '',
        units: this.mOil.units,
      });
    }
  }

  submitOil(): void {
    if (this.oilForm.valid) {
      const newOil: IOil = this.oilForm.value;
      this.onSubmit.emit(newOil);
      this.oilForm.reset();
    }
  }

  submitEditOil() {
    if (this.oilForm.valid) {
      const newOil: IOil = this.oilForm.value;
      this.onEdit.emit(newOil);
      this.oilForm.reset();
    }
  }

}
