import { Component } from '@angular/core';
import { PokemonsListStore } from './pokemons-list.store';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
  providers: [PokemonsListStore]
})
export class PokemonsListComponent {

  constructor(public pokedexListStore: PokemonsListStore) { }

  ngOnInit(): void {
   this.pokedexListStore.getList();
  }

}
