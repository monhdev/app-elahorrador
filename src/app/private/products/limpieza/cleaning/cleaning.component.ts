import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { ICleaning } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { CleaningService } from 'src/app/services/cleaning.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { CleaningInComponent } from "../cleaning-in/cleaning-in.component";
import { CleaningViewComponent } from '../cleaning-view/cleaning-view.component';

@Component({
  selector: 'app-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, CleaningInComponent, CleaningViewComponent],
})
export class CleaningComponent  implements OnInit {

  cleaningList$!: Observable<ICleaning[]>;
    Cleaning: ICleaning | undefined;

    constructor(
      private authService: AuthService,
      private cleaningService: CleaningService,
      private router: Router
    ) { }

  ngOnInit() {
    this.cleaningList$ = this.cleaningService.getCleaning();
  }

  submitCleaning(newCleaning: ICleaning): void {
    this.cleaningService.saveCleaning(newCleaning);
    this.Cleaning = undefined; // Limpiar después de guardar
  }

  submitEditCleaning(newCleaning: ICleaning): void {
    this.cleaningService.updateCleaning(newCleaning);
    this.Cleaning = undefined; // Limpiar después de editar
  }

  setCleaningToEdit(cleaning: ICleaning): void {
    this.Cleaning = cleaning; // Recibir el cleaning desde cleaning-view y pasarlo a cleaning-in
  }
}
