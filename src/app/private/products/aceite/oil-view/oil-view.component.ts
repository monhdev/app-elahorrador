import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { OilService } from 'src/app/services/oil.service';
import { Router } from '@angular/router';
import { IOil } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonButton } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-oil-view',
  templateUrl: './oil-view.component.html',
  styleUrls: ['./oil-view.component.scss'],
  imports: [ IonButton, AsyncPipe ],

})
export class OilViewComponent  implements OnInit {
  authService: AuthService = inject(AuthService);
  oilService: OilService = inject(OilService);
  router: Router = inject(Router);

  oilList$: Observable<IOil[]>;

  oil: IOil | undefined;

  ngOnInit() {
    this.oilList$ = this.oilService.getOil();
  }

  constructor() {
    this.oilList$ = this.oilService.getOil();
  }

  submitOil(newOil: IOil): void {
    this.oilService.saveOil(newOil);
  }

  deleteOil(oil: IOil): void {
    this.oilService.deleteOil(oil);
  }

  editOil(oil: IOil): void {
    this.oil = oil;
  }

  submitEditOil(newOil: IOil): void {
    this.oilService.updateOil(newOil);
  }
}



