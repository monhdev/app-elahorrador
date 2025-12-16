import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMisc } from 'src/app/models/interfaces';
import { MiscService } from 'src/app/services/misc.service';
import { IonItem, IonButton, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-misc-in',
  templateUrl: './misc-in.component.html',
  styleUrls: ['./misc-in.component.scss'],
    imports: [ IonButton, IonInput, IonItem, ReactiveFormsModule]

})
export class MiscInComponent {

  @Output() onSubmit = new EventEmitter<IMisc>();
  @Output() onEdit = new EventEmitter<IMisc>();

  mMisc: IMisc | undefined; // To track the index of the misc being edited

  get misc(): IMisc | undefined {
      return this.mMisc;
    }

    @Input() set misc(misc: IMisc | undefined) {
      if (misc) {
        this.mMisc = misc;
        this.setMiscToEdit();
      }
    }

    miscForm!: FormGroup; // Define the type of miscForm if using Reactive Forms

    constructor(private miscService: MiscService) {
      this.createMiscForm();
    }

    createMiscForm(): void {
      this.miscForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        units: new FormControl(''),
      });
    }

    setMiscToEdit(): void {
      if (this.mMisc) {
        this.miscForm.patchValue({
          id: this.mMisc.id,
          name: this.mMisc.name,
          description: this.mMisc.description,
          price: this.mMisc.price || '',
          units: this.mMisc.units,
        });
      }
    }

    submitMisc(): void {
      if (this.miscForm.valid) {
        const newMisc: IMisc = this.miscForm.value;
        this.onSubmit.emit(newMisc);
        this.miscForm.reset();
      }
    }

    submitEditMisc() {
      if (this.miscForm.valid) {
        const newMisc: IMisc = this.miscForm.value;
        this.onEdit.emit(newMisc);
        this.miscForm.reset();
      }
    }

  }

