import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { CleaningService } from 'src/app/services/cleaning.service';
import { Router } from '@angular/router';
import { ICleaning } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonButton, IonSearchbar } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cleaning-view',
  templateUrl: './cleaning-view.component.html',
  styleUrls: ['./cleaning-view.component.scss'],
  imports: [IonButton, IonSearchbar, AsyncPipe, FormsModule ]
})
export class CleaningViewComponent  implements OnInit {

  @Output() onEditCleaning = new EventEmitter<ICleaning>(); // Nuevo output

  cleaningList$!: Observable<ICleaning[]>;
  filteredCleaningList$!: Observable<ICleaning[]>;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private cleaningService: CleaningService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cleaningList$ = this.cleaningService.getCleaning();
    this.filteredCleaningList$ = this.cleaningList$;
  }

  filterCleaning(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();

    this.filteredCleaningList$ = this.cleaningList$.pipe(
      map(cleaning => cleaning.filter(cleaning =>
        cleaning.name.toLowerCase().includes(this.searchTerm) ||
        cleaning.description.toLowerCase().includes(this.searchTerm)
      ))
    );
  }

  deleteCleaning(cleaning: ICleaning): void {
    this.cleaningService.deleteCleaning(cleaning);
  }

  editCleaning(cleaning: ICleaning): void {
    this.onEditCleaning.emit(cleaning); // Emitir el cleaning al padre
  }
}
