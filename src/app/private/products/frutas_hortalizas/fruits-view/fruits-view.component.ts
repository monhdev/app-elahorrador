import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { FruitsService } from 'src/app/services/fruits.service';
import { Router } from '@angular/router';
import { IFruits } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonButton, IonSearchbar } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-fruits-view',
  templateUrl: './fruits-view.component.html',
  styleUrls: ['./fruits-view.component.scss'],
    imports: [IonButton, IonSearchbar, AsyncPipe, FormsModule ]

})
export class FruitsViewComponent  implements OnInit {

  @Output() onEditFruits = new EventEmitter<IFruits>(); // Nuevo output

  fruitsList$!: Observable<IFruits[]>;
  filteredFruitsList$!: Observable<IFruits[]>;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private fruitsService: FruitsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fruitsList$ = this.fruitsService.getFruits();
    this.filteredFruitsList$ = this.fruitsList$;
  }

  filterFruits(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();

    this.filteredFruitsList$ = this.fruitsList$.pipe(
      map(fruits => fruits.filter(fruits =>
        fruits.name.toLowerCase().includes(this.searchTerm) ||
        fruits.description.toLowerCase().includes(this.searchTerm)
      ))
    );
  }

  deleteFruits(fruits: IFruits): void {
    this.fruitsService.deleteFruits(fruits);
  }

  editFruits(fruits: IFruits): void {
    this.onEditFruits.emit(fruits); // Emitir el fruits al padre
  }
}

