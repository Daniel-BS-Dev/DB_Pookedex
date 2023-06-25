import { forkJoin, Observable } from 'rxjs';
import { PokemonModel } from './../../../models/pokemonsList';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { PokemonService } from "src/app/services/pokemon.service";
import { handleAsync } from 'src/app/utils/handleAsync';
import { PokemonDetailModel } from 'src/app/models/pokemonDetails';
import { MatSnackBar } from '@angular/material/snack-bar';

interface PokemonState {
  allPokemons: PokemonDetailModel[],
  pokemonListPerPage: PokemonDetailModel[],
  totalPerPage: number;
  search: boolean,
  classicMode: boolean
}

const initialStatePokemonList: PokemonState = {
  allPokemons: [],
  pokemonListPerPage: [],
  totalPerPage: 6,
  search: false,
  classicMode: true
}

@Injectable()
export class PokemonsListStore extends ComponentStore<PokemonState>{

  pokemonList$: Observable<PokemonDetailModel[]> = this.select(state => state.pokemonListPerPage);
  search$: Observable<boolean> = this.select(state => state.search);
  classicMode$: Observable<boolean> = this.select(state => state.classicMode);

  constructor(private service: PokemonService, private pokemonService: PokemonService, private snackBar: MatSnackBar) {
    super(initialStatePokemonList)
  }

  async getList() {
    const [result, _] = await handleAsync(this.service.getPokemonList(0, 20000000));

    this.getPokemon(result?.results || []);
  }

  getListPerPage() {
    this.patchState(state => ({
      ...state,
      pokemonListPerPage: this.get(s => s.allPokemons.slice(0, s.totalPerPage))
    }))
  }

  changeTypeImage() {
    this.patchState(state => ({
      ...state,
      classicMode: this.get(s => !s.classicMode)
    }));
  }

  async onAddSearch(search: string) {
    this.patchState(state => ({
      ...state,
      search: false
    }));

    if (!search.trim()) return;

    const result = this.get(s => s.allPokemons.filter(x =>
      x.name.toLocaleLowerCase().includes(search)));

    this.patchState(state => ({
      ...state,
      pokemonListPerPage: result,
      search: true
    }));
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
        allPokemons: pokemons,
      }));

      this.getListPerPage();
    });
  }
}

