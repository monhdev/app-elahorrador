import { Component, OnInit, inject } from '@angular/core';
import { IonMenuButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonMenu, IonButtons } from '@ionic/angular/standalone';
import { IDrink } from 'src/app/models/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DrinkService } from 'src/app/services/drink.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { DrinkInComponent } from "../drink-in/drink-in.component";
import { DrinkViewComponent } from '../drink-view/drink-view.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, DrinkInComponent, DrinkViewComponent],
})
export class DrinkComponent implements OnInit {

  authService: AuthService = inject(AuthService);
  drinkService: DrinkService = inject(DrinkService);
  router: Router = inject(Router);

  title: string = 'Home';
  drinkList$: Observable<IDrink[]>;
Drink: IDrink|undefined;

  constructor() {
    this.drinkList$ = this.drinkService.getDrink();
  }

  ngOnInit() {
  }

  submitDrink(newDrink: IDrink): void {
    this.drinkService.saveDrink(newDrink);
  }

  submitEditDrink(newDrink: IDrink): void {
    this.drinkService.updateDrink(newDrink);
  }
}
