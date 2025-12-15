import { Component } from '@angular/core';
import { IonMenuButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonMenu, IonButtons, IonMenuToggle } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { OilComponent } from "../products/aceite/oil/oil.component";
import { MainComponent } from "../main/main.component";
import { MeatComponent } from "../products/carne/meat/meat.component";
import { DrinkComponent } from "../products/bebidas/drink/drink.component";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, IonButtons, IonMenuButton, IonMenu, OilComponent, MainComponent, MeatComponent, IonMenuToggle, DrinkComponent],
})
export class HomePage {
  selectedComponent: string = '';

}
