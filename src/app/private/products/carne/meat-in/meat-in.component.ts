import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMeat } from '../../../../models/interfaces';
import { MeatService } from '../../../../services/meat.service';
import { IonItem, IonButton, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-meat-in',
  templateUrl: './meat-in.component.html',
  styleUrls: ['./meat-in.component.scss'],
  imports: [IonItem, IonInput, IonButton, ReactiveFormsModule],

})
export class MeatInComponent {

  @Output() onSubmit = new EventEmitter<IMeat>();
  @Output() onEdit = new EventEmitter<IMeat>();

  mMeat: IMeat | undefined; // To track the index of the meat being edited

  get meat(): IMeat | undefined {
    return this.mMeat;
  }

  @Input() set meat(meat: IMeat | undefined) {
    if (meat) {
      this.mMeat = meat;
      this.setMeatToEdit();
    }
  }

  meatForm!: FormGroup; // Define the type of meatForm if using Reactive Forms

  constructor(private meatService: MeatService) {
    this.createMeatForm();
  }

  createMeatForm(): void {
    this.meatForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      units: new FormControl(''),
    });
  }

  setMeatToEdit(): void {
    if (this.mMeat) {
      this.meatForm.patchValue({
        id: this.mMeat.id,
        name: this.mMeat.name,
        description: this.mMeat.description,
        price: this.mMeat.price || '',
        units: this.mMeat.units,
      });
    }
  }

  submitMeat(): void {
    if (this.meatForm.valid) {
      const newMeat: IMeat = this.meatForm.value;
      this.onSubmit.emit(newMeat);
      this.meatForm.reset();
    }
  }

  submitEditMeat() {
    if (this.meatForm.valid) {
      const newMeat: IMeat = this.meatForm.value;
      this.onEdit.emit(newMeat);
      this.meatForm.reset();
    }
  }

}
