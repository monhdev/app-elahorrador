import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { IMisc } from 'src/app/models/interfaces';
import { Observable } from 'rxjs';
import { MiscService } from 'src/app/services/misc.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { MiscInComponent } from "../misc-in/misc-in.component";
import { MiscViewComponent } from '../misc-view/misc-view.component';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, MiscInComponent, MiscViewComponent],
})
export class MiscComponent  implements OnInit {

    miscList$!: Observable<IMisc[]>;
    Misc: IMisc | undefined;

  constructor(
    private authService: AuthService,
    private miscService: MiscService,
    private router: Router
  ) { }

  ngOnInit() {
    this.miscList$ = this.miscService.getMisc();
  }

  submitMisc(newMisc: IMisc): void {
    this.miscService.saveMisc(newMisc);
    this.Misc = undefined; // Limpiar después de guardar
  }

  submitEditMisc(newMisc: IMisc): void {
    this.miscService.updateMisc(newMisc);
    this.Misc = undefined; // Limpiar después de editar
  }

  setMiscToEdit(misc: IMisc): void {
    this.Misc = misc; // Recibir el misc desde misc-view y pasarlo a misc-in
  }
}

