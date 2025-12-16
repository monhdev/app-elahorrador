import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { DrinkService } from 'src/app/services/drink.service';
import { Router } from '@angular/router';
import { IDrink } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IonButton, IonSearchbar } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drink-view',
  templateUrl: './drink-view.component.html',
  styleUrls: ['./drink-view.component.scss'],
  imports: [IonButton, AsyncPipe, IonSearchbar, FormsModule],
})
export class DrinkViewComponent implements OnInit {

  @Output() onEditDrink = new EventEmitter<IDrink>(); // Nuevo output

  drinkList$!: Observable<IDrink[]>;
  filteredDrinkList$!: Observable<IDrink[]>;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private drinkService: DrinkService,
    private router: Router
  ) { }

  ngOnInit() {
    this.drinkList$ = this.drinkService.getDrink();
    this.filteredDrinkList$ = this.drinkList$;
  }

  filterDrink(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredDrinkList$ = this.drinkList$.pipe(
      map(drinks => drinks.filter(drink => drink.name.toLowerCase().includes(this.searchTerm) || drink.description.toLowerCase().includes(this.searchTerm)))
    );
  }

  deleteDrink(drink: IDrink): void {
    this.drinkService.deleteDrink(drink);
  }

  editDrink(drink: IDrink): void {
    this.onEditDrink.emit(drink); // Emitir el drink al padre
  }
}
