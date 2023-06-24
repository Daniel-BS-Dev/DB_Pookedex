import { forkJoin, Observable } from 'rxjs';
import { PokemonModel } from './../../../models/pokemonsList';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { PokemonService } from "src/app/services/pokemon.service";
import { handleAsync } from 'src/app/utils/handleAsync';
import { PokemonDetailModel } from 'src/app/models/pokemonDetails';

interface PokemonState {
  pokemonList: PokemonDetailModel[]
}

const initialStatePokemonList: PokemonState = {
  pokemonList: [],
}

@Injectable()
export class PokemonsListStore extends ComponentStore<PokemonState>{

  pokemonList$: Observable<PokemonDetailModel[]> = this.select(state => state.pokemonList);

  constructor(private service: PokemonService) {
    super(initialStatePokemonList)
  }

  async getPokemonsList() {
    const [result, _] = await handleAsync(this.service.getPokemonList(0, 20));

    this.getPokemon(result?.results || []);
  }

  private getPokemon(list: PokemonModel[]) {
    const arr: Observable<PokemonDetailModel>[] = [];

    list.map((value: PokemonModel) => {
      arr.push(
        this.service.getPokemonDetail(value.name)
      );
    });

    forkJoin([...arr]).subscribe((pokemons: PokemonDetailModel[]) => {
      this.patchState(state => ({
        ...state,
        pokemonList: pokemons
      }));
    });
  }
}
