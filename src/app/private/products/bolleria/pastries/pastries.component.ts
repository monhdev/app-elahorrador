import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { IPastries } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { PastriesService } from 'src/app/services/pastries.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { PastriesInComponent } from "../pastries-in/pastries-in.component";
import { PastriesViewComponent } from '../pastries-view/pastries-view.component';

@Component({
  selector: 'app-pastries',
  templateUrl: './pastries.component.html',
  styleUrls: ['./pastries.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, PastriesInComponent, PastriesViewComponent],
})

export class PastriesComponent {

  pastriesList$!: Observable<IPastries[]>;
  Pastries: IPastries | undefined;

  constructor(
    private authService: AuthService,
    private pastriesService: PastriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pastriesList$ = this.pastriesService.getPastries();
  }

  submitPastries(newPastries: IPastries): void {
    this.pastriesService.savePastries(newPastries);
    this.Pastries = undefined; // Limpiar después de guardar
  }

  submitEditPastries(newPastries: IPastries): void {
    this.pastriesService.updatePastries(newPastries);
    this.Pastries = undefined; // Limpiar después de editar
  }

  setPastriesToEdit(pastries: IPastries): void {
    this.Pastries = pastries; // Recibir el pastries desde pastries-view y pasarlo a pastries-in
  }
}



