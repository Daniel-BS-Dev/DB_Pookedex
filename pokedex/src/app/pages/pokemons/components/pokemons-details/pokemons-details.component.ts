import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { PokemonDetailModel } from 'src/app/models/pokemonDetails';

@Component({
  selector: 'app-pokemons-details',
  templateUrl: './pokemons-details.component.html',
  styleUrls: ['./pokemons-details.component.scss']
})
export class PokemonsDetailsComponent {

  pokemon: PokemonDetailModel;
  classicMode: boolean;
  tabsName = ['informações', 'sobre'];
  activeTab = this.tabsName[0];

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.pokemon = data.pokemon;
    this.classicMode = data.classicMode;
  }

  ngOnInit(): void {
  }

  getAbilities(): string {
    return this.pokemon.abilities.map(x => x.ability.name).join(', ');
  }

  getPrincipalType = (list: any[]) =>
    list.filter(x => x.slot === 1)[0]?.type.name;
}
