import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { IHygiene } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { HygieneService } from 'src/app/services/hygiene.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { HygieneInComponent } from "../hygiene-in/hygiene-in.component";
import { HygieneViewComponent } from '../hygiene-view/hygiene-view.component';

@Component({
  selector: 'app-hygiene',
  templateUrl: './hygiene.component.html',
  styleUrls: ['./hygiene.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, HygieneInComponent, HygieneViewComponent],
})
export class HygieneComponent  implements OnInit {

  hygieneList$!: Observable<IHygiene[]>;
  Hygiene: IHygiene | undefined;

  constructor(
    private authService: AuthService,
    private hygieneService: HygieneService,
    private router: Router
  ) { }

  ngOnInit() {
    this.hygieneList$ = this.hygieneService.getHygiene();
  }

  submitHygiene(newHygiene: IHygiene): void {
    this.hygieneService.saveHygiene(newHygiene);
    this.Hygiene = undefined; // Limpiar después de guardar
  }

  submitEditHygiene(newHygiene: IHygiene): void {
    this.hygieneService.updateHygiene(newHygiene);
    this.Hygiene = undefined; // Limpiar después de editar
  }

  setHygieneToEdit(hygiene: IHygiene): void {
    this.Hygiene = hygiene; // Recibir el hygiene desde hygiene-view y pasarlo a hygiene-in
  }
}

