import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { MeatService } from 'src/app/services/meat.service';
import { Router } from '@angular/router';
import { IMeat } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonCard, IonButton } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-meat-view',
  templateUrl: './meat-view.component.html',
  imports: [IonCard, IonButton, AsyncPipe ],
  styleUrls: ['./meat-view.component.scss'],
})
export class MeatViewComponent  implements OnInit {

  authService: AuthService = inject(AuthService);
  meatsService: MeatService = inject(MeatService);
  router: Router = inject(Router);

  meatsList$: Observable<IMeat[]>;

  meat: IMeat | undefined;

  ngOnInit() {
    this.meatsList$ = this.meatsService.getMeat();
  }

  constructor() {
    this.meatsList$ = this.meatsService.getMeat();
  }

  submitMeat(newMeat: IMeat): void {
    console.log('New meat que rebem del component fill:', newMeat);
    this.meatsService.saveMeat(newMeat);
  }

  deleteMeat(meat: IMeat): void {
    this.meatsService.deleteMeat(meat);
  }

  editMeat(meat: IMeat): void {
    this.meat = meat;
  }

  submitEditMeat(newMeat: IMeat): void {
    console.log('New Meat al component Home:', newMeat);
    this.meatsService.updateMeat(newMeat);
  }
}


