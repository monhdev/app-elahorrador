import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { PastriesService } from 'src/app/services/pastries.service';
import { Router } from '@angular/router';
import { IPastries } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonButton, IonSearchbar } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pastries-view',
  templateUrl: './pastries-view.component.html',
  styleUrls: ['./pastries-view.component.scss'],
  imports: [IonButton, IonSearchbar, AsyncPipe, FormsModule ]

})
export class PastriesViewComponent  implements OnInit {

  @Output() onEditPastries = new EventEmitter<IPastries>(); // Nuevo output

  pastriesList$!: Observable<IPastries[]>;
  filteredPastriesList$!: Observable<IPastries[]>;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private pastriesService: PastriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pastriesList$ = this.pastriesService.getPastries();
    this.filteredPastriesList$ = this.pastriesList$;
  }

  filterPastries(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();

    this.filteredPastriesList$ = this.pastriesList$.pipe(
      map(pastries => pastries.filter(pastries =>
        pastries.name.toLowerCase().includes(this.searchTerm) ||
        pastries.description.toLowerCase().includes(this.searchTerm)
      ))
    );
  }

  deletePastries(pastries: IPastries): void {
    this.pastriesService.deletePastries(pastries);
  }

  editPastries(pastries: IPastries): void {
    this.onEditPastries.emit(pastries); // Emitir el pastries al padre
  }
}
