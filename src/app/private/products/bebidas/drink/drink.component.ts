import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { IDrink } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { DrinkService } from 'src/app/services/drink.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { DrinkInComponent } from "../drink-in/drink-in.component";
import { DrinkViewComponent } from '../drink-view/drink-view.component';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, DrinkInComponent, DrinkViewComponent],
})
export class DrinkComponent implements OnInit {

  drinkList$!: Observable<IDrink[]>;
  Drink: IDrink | undefined;

  constructor(
    private authService: AuthService,
    private drinkService: DrinkService,
    private router: Router
  ) { }

  ngOnInit() {
    this.drinkList$ = this.drinkService.getDrink();
  }

  submitDrink(newDrink: IDrink): void {
    this.drinkService.saveDrink(newDrink);
    this.Drink = undefined; // Limpiar después de guardar
  }

  submitEditDrink(newDrink: IDrink): void {
    this.drinkService.updateDrink(newDrink);
    this.Drink = undefined; // Limpiar después de editar
  }

  setDrinkToEdit(drink: IDrink): void {
    this.Drink = drink; // Recibir el drink desde drink-view y pasarlo a drink-in
  }
}
