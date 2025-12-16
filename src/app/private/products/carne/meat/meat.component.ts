import { Component, OnInit, inject } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { IMeat } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { MeatService } from 'src/app/services/meat.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { MeatInComponent } from "../meat-in/meat-in.component";
import { MeatViewComponent } from '../meat-view/meat-view.component';

@Component({
  selector: 'app-meat',
  templateUrl: './meat.component.html',
  styleUrls: ['./meat.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, MeatInComponent, MeatViewComponent],
})
export class MeatComponent  implements OnInit {

  MeatList$!: Observable<IMeat[]>;
  Meat: IMeat | undefined;

  constructor(
    private authService: AuthService,
    private MeatService: MeatService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.MeatList$ = this.MeatService.getMeat();
  }



  submitMeat(newMeat: IMeat): void {
    this.MeatService.saveMeat(newMeat);
    this.Meat = undefined;

  }

  submitEditMeat(newMeat: IMeat): void {
    this.MeatService.updateMeat(newMeat);
    this.Meat = undefined;
  }

  setMeatToEdit(meat: IMeat): void {
    this.Meat = meat;
  }
}
