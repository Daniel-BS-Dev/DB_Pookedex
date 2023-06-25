import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() store: any;

  search: FormControl = new FormControl('');

  unsubscribe$ = new Subject();

  constructor() {
  }

  ngOnInit(): void {
    this.onSearchPokemon();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  onClearField = () => {
    this.search.reset();
    this.store.getListPerPage();
  }

  onSearchPokemon(): void {
    this.search.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.unsubscribe$)
    ).subscribe((value: string) => {
      const searching = value?.trim();

      if (searching === '') {
        this.onClearField();
        return;
      }

      this.store.onAddSearch(searching ? searching.toLocaleLowerCase() : '');
    });
  }
}
