import { Component } from '@angular/core';
import { IonMenuButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonMenu, IonButtons, IonMenuToggle } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { OilComponent } from "../products/aceite/oil/oil.component";
import { MainComponent } from "../main/main.component";
import { MeatComponent } from "../products/carne/meat/meat.component";
import { DrinkComponent } from "../products/bebidas/drink/drink.component";
import { PastriesComponent } from "../products/bolleria/pastries/pastries.component";
import { FruitsComponent } from "../products/frutas_hortalizas/fruits/fruits.component";
import { HygieneComponent } from "../products/higiene/hygiene/hygiene.component";
import { CleaningComponent } from "../products/limpieza/cleaning/cleaning.component";
import { MiscComponent } from "../products/varios/misc/misc.component";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, IonButtons, IonMenuButton, IonMenu, OilComponent, MainComponent, MeatComponent, IonMenuToggle, DrinkComponent, PastriesComponent, FruitsComponent, HygieneComponent, CleaningComponent, MiscComponent],
})
export class HomePage {
  selectedComponent: string = '';

}
