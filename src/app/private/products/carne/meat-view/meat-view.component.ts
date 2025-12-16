import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { MeatService } from 'src/app/services/meat.service';
import { Router } from '@angular/router';
import { IMeat } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IonButton, IonSearchbar } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meat-view',
  templateUrl: './meat-view.component.html',
  imports: [ IonButton, IonSearchbar, AsyncPipe, FormsModule],
  styleUrls: ['./meat-view.component.scss'],
})
export class MeatViewComponent implements OnInit {

  @Output() onEditMeat = new EventEmitter<IMeat>();

  meatList$!: Observable<IMeat[]>;
  filteredMeatList$!: Observable<IMeat[]>;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private meatService: MeatService,
    private router: Router
  ) { }

  ngOnInit() {
    this.meatList$ = this.meatService.getMeat();
    this.filteredMeatList$ = this.meatList$;
  }

  filterMeat(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredMeatList$ = this.meatList$.pipe(
      map(meats => meats.filter(meat =>
        meat.name.toLowerCase().includes(this.searchTerm) ||
        meat.description.toLowerCase().includes(this.searchTerm)
      ))
    );
  }

  deleteMeat(meat: IMeat): void {
    this.meatService.deleteMeat(meat);
  }

  editMeat(meat: IMeat): void {
    this.onEditMeat.emit(meat);
  }
}
