import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs'

@Component({
  selector: 'app-pastries',
  templateUrl: './pastries.component.html',
  styleUrls: ['./pastries.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})

export class PastriesComponent {

  searchControl = new FormControl('');
  items = ['Colombia', 'Argentina', 'México', 'Perú', 'Chile', 'Ecuador'];
  filteredItems = this.items;
  constructor() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.filteredItems = this.items.filter(item =>
        item.toLowerCase().includes(value?.toLowerCase() || '')
      )
    })
  }

}

