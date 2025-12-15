import { Component, OnInit, inject } from '@angular/core';
import {  IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
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
export class OilComponent  implements OnInit {

  authService: AuthService = inject(AuthService);
    OilService: OilService = inject(OilService);
    router: Router = inject(Router);

    title: string = 'Home';
    OilList$: Observable<IOil[]>;

    Oil: IOil | undefined;

    ngOnInit() {
      this.OilList$ = this.OilService.getOil();
    }

    constructor() {
      this.OilList$ = this.OilService.getOil();
    }

    submitOil(newOil: IOil): void {
      console.log('New Oil que rebem del component fill:', newOil);
      this.OilService.saveOil(newOil);
    }

    submitEditOil(newOil: IOil): void {
      this.OilService.updateOil(newOil);
    }
  }
