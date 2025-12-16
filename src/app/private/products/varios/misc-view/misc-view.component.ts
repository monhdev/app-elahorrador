import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { MiscService } from 'src/app/services/misc.service';
import { Router } from '@angular/router';
import { IMisc } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { IonButton, IonSearchbar } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-misc-view',
  templateUrl: './misc-view.component.html',
  styleUrls: ['./misc-view.component.scss'],
  imports: [IonButton, IonSearchbar, AsyncPipe, FormsModule ]
})
export class MiscViewComponent  implements OnInit {

  @Output() onEditMisc = new EventEmitter<IMisc>(); // Nuevo output

  miscList$!: Observable<IMisc[]>;
  filteredMiscList$!: Observable<IMisc[]>;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private miscService: MiscService,
    private router: Router
  ) { }

  ngOnInit() {
    this.miscList$ = this.miscService.getMisc();
    this.filteredMiscList$ = this.miscList$;
  }

  filterMisc(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();

    this.filteredMiscList$ = this.miscList$.pipe(
      map(misc => misc.filter(misc =>
        misc.name.toLowerCase().includes(this.searchTerm) ||
        misc.description.toLowerCase().includes(this.searchTerm)
      ))
    );
  }

  deleteMisc(misc: IMisc): void {
    this.miscService.deleteMisc(misc);
  }

  editMisc(misc: IMisc): void {
    this.onEditMisc.emit(misc); // Emitir el misc al padre
  }
}

