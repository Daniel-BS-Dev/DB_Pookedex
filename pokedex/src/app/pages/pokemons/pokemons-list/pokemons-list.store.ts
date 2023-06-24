import { Observable } from 'rxjs';
import { PokemonList } from './../../../models/pokemonsList';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { PokemonService } from "src/app/services/pokemon.service";

interface PokemonState {
  resultPokemonList: PokemonList
}

const initialStatePokemonList: PokemonState = {
 resultPokemonList: {
  results: [],
  count: 0
 }
}

@Injectable()
export class PokemonsListStore extends ComponentStore<PokemonState>{

  resultPokemonList$: Observable<PokemonList> = this.select(state => state.resultPokemonList);

  constructor(private service: PokemonService) {
    super(initialStatePokemonList)
  }

  getPokemonsList() {
    this.service.getPokemonList(0, 20).subscribe(resp => {
      this.patchState(state => ({
        ...state,
        resultPokemonList: {
          results: resp.results,
          count: resp.count
        }
      }));
    });
  }

}
