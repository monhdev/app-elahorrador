import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { OilService } from 'src/app/services/oil.service';
import { Router } from '@angular/router';
import { IOil } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonButton, IonSearchbar } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-oil-view',
  templateUrl: './oil-view.component.html',
  styleUrls: ['./oil-view.component.scss'],
  imports: [IonButton, IonSearchbar, AsyncPipe, FormsModule ]
})
export class OilViewComponent implements OnInit {

  @Output() onEditOil = new EventEmitter<IOil>(); // Nuevo output

  oilList$!: Observable<IOil[]>;
  filteredOilList$!: Observable<IOil[]>;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private oilService: OilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.oilList$ = this.oilService.getOil();
    this.filteredOilList$ = this.oilList$;
  }

  filterOil(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();

    this.filteredOilList$ = this.oilList$.pipe(
      map(oil => oil.filter(oil =>
        oil.name.toLowerCase().includes(this.searchTerm) ||
        oil.description.toLowerCase().includes(this.searchTerm)
      ))
    );
  }

  deleteOil(oil: IOil): void {
    this.oilService.deleteOil(oil);
  }

  editOil(oil: IOil): void {
    this.onEditOil.emit(oil); // Emitir el oil al padre
  }
}
