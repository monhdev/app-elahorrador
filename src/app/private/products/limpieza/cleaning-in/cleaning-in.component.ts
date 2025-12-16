import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICleaning } from 'src/app/models/interfaces';
import { CleaningService } from 'src/app/services/cleaning.service';
import { IonItem, IonButton, IonInput } from "@ionic/angular/standalone";


@Component({
  selector: 'app-cleaning-in',
  templateUrl: './cleaning-in.component.html',
  styleUrls: ['./cleaning-in.component.scss'],
  imports: [ IonButton, IonInput, IonItem, ReactiveFormsModule]

})
export class CleaningInComponent {

  @Output() onSubmit = new EventEmitter<ICleaning>();
  @Output() onEdit = new EventEmitter<ICleaning>();

  mCleaning: ICleaning | undefined; // To track the index of the cleaning being edited

  get cleaning(): ICleaning | undefined {
      return this.mCleaning;
    }

    @Input() set cleaning(cleaning: ICleaning | undefined) {
      if (cleaning) {
        this.mCleaning = cleaning;
        this.setCleaningToEdit();
      }
    }

    cleaningForm!: FormGroup; // Define the type of cleaningForm if using Reactive Forms

    constructor(private cleaningService: CleaningService) {
      this.createCleaningForm();
    }

    createCleaningForm(): void {
      this.cleaningForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        units: new FormControl(''),
      });
    }

    setCleaningToEdit(): void {
      if (this.mCleaning) {
        this.cleaningForm.patchValue({
          id: this.mCleaning.id,
          name: this.mCleaning.name,
          description: this.mCleaning.description,
          price: this.mCleaning.price || '',
          units: this.mCleaning.units,
        });
      }
    }

    submitCleaning(): void {
      if (this.cleaningForm.valid) {
        const newCleaning: ICleaning = this.cleaningForm.value;
        this.onSubmit.emit(newCleaning);
        this.cleaningForm.reset();
      }
    }

    submitEditCleaning() {
      if (this.cleaningForm.valid) {
        const newCleaning: ICleaning = this.cleaningForm.value;
        this.onEdit.emit(newCleaning);
        this.cleaningForm.reset();
      }
    }

  }

