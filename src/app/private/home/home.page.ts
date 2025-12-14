import { Component } from '@angular/core';
import { IonMenuButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonMenu, IonButtons, IonMenuToggle } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { ProductsInComponent } from "../products-in/products-in.component";
import { ProductsViewComponent } from '../products-view/products-view.component';
import { OilComponent } from "../oil/oil.component";
import { MainComponent } from "../main/main.component";
import { MeatComponent } from "../products/carne/meat/meat.component";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, IonButtons, IonMenuButton, IonMenu, OilComponent, MainComponent, MeatComponent, IonButton, IonMenuToggle],
})
export class HomePage {
  selectedComponent: string = '';

}
