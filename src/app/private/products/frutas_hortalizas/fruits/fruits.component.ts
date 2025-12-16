import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { IFruits } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { FruitsService } from 'src/app/services/fruits.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { FruitsInComponent } from "../fruits-in/fruits-in.component";
import { FruitsViewComponent } from '../fruits-view/fruits-view.component';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, FruitsInComponent, FruitsViewComponent],
})
export class FruitsComponent  implements OnInit {

  fruitsList$!: Observable<IFruits[]>;
  Fruits: IFruits | undefined;

  constructor(
    private authService: AuthService,
    private fruitsService: FruitsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fruitsList$ = this.fruitsService.getFruits();
  }

  submitFruits(newFruits: IFruits): void {
    this.fruitsService.saveFruits(newFruits);
    this.Fruits = undefined; // Limpiar después de guardar
  }

  submitEditFruits(newFruits: IFruits): void {
    this.fruitsService.updateFruits(newFruits);
    this.Fruits = undefined; // Limpiar después de editar
  }

  setFruitsToEdit(fruits: IFruits): void {
    this.Fruits = fruits; // Recibir el fruits desde fruits-view y pasarlo a fruits-in
  }
}

