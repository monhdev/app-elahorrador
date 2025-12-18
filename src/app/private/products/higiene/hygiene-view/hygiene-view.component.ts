import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { HygieneService } from 'src/app/services/hygiene.service';
import { Router } from '@angular/router';
import { IHygiene } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonButton, IonSearchbar } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hygiene-view',
  templateUrl: './hygiene-view.component.html',
  styleUrls: ['./hygiene-view.component.scss'],
  imports: [IonButton, IonSearchbar, AsyncPipe, FormsModule ]
})
export class HygieneViewComponent  implements OnInit {

  @Output() onEditHygiene = new EventEmitter<IHygiene>();

  hygieneList$!: Observable<IHygiene[]>;
  filteredHygieneList$!: Observable<IHygiene[]>;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private hygieneService: HygieneService,
    private router: Router
  ) { }

  ngOnInit() {
    this.hygieneList$ = this.hygieneService.getHygiene();
    this.filteredHygieneList$ = this.hygieneList$;
  }

  filterHygiene(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();

    this.filteredHygieneList$ = this.hygieneList$.pipe(
      map(hygiene => hygiene.filter(hygiene =>
        hygiene.name.toLowerCase().includes(this.searchTerm) ||
        hygiene.description.toLowerCase().includes(this.searchTerm)
      ))
    );
  }

  deleteHygiene(hygiene: IHygiene): void {
    this.hygieneService.deleteHygiene(hygiene);
  }

  editHygiene(hygiene: IHygiene): void {
    this.onEditHygiene.emit(hygiene);
  }
}

