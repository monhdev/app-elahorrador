import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { DrinkService } from 'src/app/services/drink.service';
import { Router } from '@angular/router';
import { IDrink } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonCard, IonButton } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-drink-view',
  templateUrl: './drink-view.component.html',
  styleUrls: ['./drink-view.component.scss'],
  imports: [IonButton, AsyncPipe]
})
export class DrinkViewComponent implements OnInit {

  authService: AuthService = inject(AuthService);
  drinkService: DrinkService = inject(DrinkService);
  router: Router = inject(Router);

  title: string = 'Home';
  drinkList$: Observable<IDrink[]>;

  drink: IDrink | undefined;

    ngOnInit() {
    this.drinkList$ = this.drinkService.getDrink();
  }

  constructor() {
    this.drinkList$ = this.drinkService.getDrink();
  }



  submitDrink(newDrink: IDrink): void {
      this.drinkService.saveDrink(newDrink);
    }

    deleteDrink(drink: IDrink): void {
      this.drinkService.deleteDrink(drink);
    }

    editDrink(drink: IDrink): void {
      this.drink = drink;
    }

    submitEditDrink(newDrink: IDrink): void {
      this.drinkService.updateDrink(newDrink);
    }
  }



