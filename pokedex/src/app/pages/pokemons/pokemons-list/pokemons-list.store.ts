import { Observable } from 'rxjs';
import { PokemonList } from './../../../models/pokemonsList';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { PokemonService } from "src/app/services/pokemon.service";
import { handleAsync } from 'src/app/utils/handleAsync';

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

  async getPokemonsList() {
    const [result, _] = await handleAsync(this.service.getPokemonList(0, 20));

    if(result)
    this.patchState(state => ({
      ...state,
      resultPokemonList: {
        results: result.results,
        count: result.count
      }
    }));
  }

}
