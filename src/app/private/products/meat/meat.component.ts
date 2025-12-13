import { Component, OnInit, inject } from '@angular/core';
import { IonMenuButton,IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonMenu, IonButtons } from '@ionic/angular/standalone';
import { IMeat } from 'src/app/models/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MeatService } from 'src/app/services/meat.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { MeatInComponent } from "../meat-in/meat-in.component";
import { MeatViewComponent } from '../meat-view/meat-view.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-meat',
  templateUrl: './meat.component.html',
  styleUrls: ['./meat.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, MeatInComponent, MeatViewComponent],
})
export class MeatComponent  implements OnInit {

  authService: AuthService = inject(AuthService);
  MeatService: MeatService = inject(MeatService);
  router: Router = inject(Router);

  title: string = 'Home';
  MeatList$: Observable<IMeat[]>;

  Meat: IMeat | undefined;

  ngOnInit() {
    this.MeatList$ = this.MeatService.getMeat();
  }

  constructor() {
    this.MeatList$ = this.MeatService.getMeat();
  }

  submitMeat(newMeat: IMeat): void {
    console.log('New Meat que rebem del component fill:', newMeat);
    this.MeatService.saveMeat(newMeat);
  }

  submitEditMeat(newMeat: IMeat): void {
    this.MeatService.updateMeat(newMeat);
  }
}
