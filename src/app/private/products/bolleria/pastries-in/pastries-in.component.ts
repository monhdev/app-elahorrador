import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPastries } from 'src/app/models/interfaces';
import { PastriesService } from 'src/app/services/pastries.service';
import { IonItem, IonButton, IonInput } from "@ionic/angular/standalone";


@Component({
  selector: 'app-pastries-in',
  templateUrl: './pastries-in.component.html',
  styleUrls: ['./pastries-in.component.scss'],
    imports: [ IonButton, IonInput, IonItem, ReactiveFormsModule]
})
export class PastriesInComponent {

  @Output() onSubmit = new EventEmitter<IPastries>();
  @Output() onEdit = new EventEmitter<IPastries>();

  mPastries: IPastries | undefined; // To track the index of the pastries being edited

  get pastries(): IPastries | undefined {
      return this.mPastries;
    }

    @Input() set pastries(pastries: IPastries | undefined) {
      if (pastries) {
        this.mPastries = pastries;
        this.setPastriesToEdit();
      }
    }

    pastriesForm!: FormGroup; // Define the type of pastriesForm if using Reactive Forms

    constructor(private pastriesService: PastriesService) {
      this.createPastriesForm();
    }

    createPastriesForm(): void {
      this.pastriesForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        units: new FormControl(''),
      });
    }

    setPastriesToEdit(): void {
      if (this.mPastries) {
        this.pastriesForm.patchValue({
          id: this.mPastries.id,
          name: this.mPastries.name,
          description: this.mPastries.description,
          price: this.mPastries.price || '',
          units: this.mPastries.units,
        });
      }
    }

    submitPastries(): void {
      if (this.pastriesForm.valid) {
        const newPastries: IPastries = this.pastriesForm.value;
        this.onSubmit.emit(newPastries);
        this.pastriesForm.reset();
      }
    }

    submitEditPastries() {
      if (this.pastriesForm.valid) {
        const newPastries: IPastries = this.pastriesForm.value;
        this.onEdit.emit(newPastries);
        this.pastriesForm.reset();
      }
    }

  }

