import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { IOil } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { OilService } from 'src/app/services/oil.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { OilInComponent } from "../oil-in/oil-in.component";
import { OilViewComponent } from '../oil-view/oil-view.component';

@Component({
  selector: 'app-oil',
  templateUrl: './oil.component.html',
  styleUrls: ['./oil.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, OilInComponent, OilViewComponent],
})
export class OilComponent implements OnInit {

  oilList$!: Observable<IOil[]>;
  Oil: IOil | undefined;

  constructor(
    private authService: AuthService,
    private oilService: OilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.oilList$ = this.oilService.getOil();
  }

  submitOil(newOil: IOil): void {
    this.oilService.saveOil(newOil);
    this.Oil = undefined; // Limpiar después de guardar
  }

  submitEditOil(newOil: IOil): void {
    this.oilService.updateOil(newOil);
    this.Oil = undefined; // Limpiar después de editar
  }

  setOilToEdit(oil: IOil): void {
    this.Oil = oil; // Recibir el oil desde oil-view y pasarlo a oil-in
  }
}
