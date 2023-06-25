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
  classicMode: boolean,
  nextPage: number,
  previousPage: number,
  totalList: number,
  currentTotal: number,
}

const initialStatePokemonList: PokemonState = {
  allPokemons: [],
  pokemonListPerPage: [],
  totalPerPage: 6,
  search: false,
  classicMode: true,
  nextPage: 6,
  previousPage: 0,
  totalList: 0,
  currentTotal: 6
}

@Injectable()
export class PokemonsListStore extends ComponentStore<PokemonState>{

  pokemonList$: Observable<PokemonDetailModel[]> = this.select(state => state.pokemonListPerPage);

  classicMode$: Observable<boolean> = this.select(state => state.classicMode);

  totalPerPage$: Observable<number> = this.select(state => state.totalPerPage);

  search$: Observable<boolean> = this.select(state => state.search);

  currentTotal$: Observable<number> = this.select(state => state.currentTotal);

  totalList$: Observable<number> = this.select(state => state.totalList);

  constructor(private service: PokemonService, private pokemonService: PokemonService, private snackBar: MatSnackBar) {
    super(initialStatePokemonList)
  }

  async getList() {
    const [result, _] = await handleAsync(this.service.getPokemonList(0, 20000000));

    this.getPokemon(result?.results || []);
  }

  goPreviousPage() {
    const state = this.get(s => s);

    if (state.currentTotal > state.totalPerPage)
      this.patchState(s => ({
        ...s,
        previousPage: state.previousPage - state.totalPerPage,
        nextPage: state.nextPage - state.totalPerPage,
        currentTotal: state.currentTotal - state.totalPerPage
      }));

    this.getListPerPage();
  }

  goNextPage() {
    const state = this.get(s => s);
    const total = state.currentTotal + state.totalPerPage;

    if (state.currentTotal < state.totalList)
      this.patchState(s => ({
        ...s,
        previousPage: state.previousPage + state.totalPerPage,
        nextPage: state.currentTotal + state.totalPerPage,
        currentTotal: total > state.totalList ? state.totalList : total
      }));

    this.getListPerPage();
  }

  addQuantity(quantity: number) {
    const state = this.get(s => s);

    if (state.totalList < quantity) {
      this.snackBar.open('Essa opção é maior que a quantidade de resultados encontrados.', '', {
        verticalPosition: 'top',
        duration: 5000,
      });
      return;
    }

    this.patchState(state => ({
      ...state,
      totalPerPage: quantity,
      nextPage: quantity,
      previousPage: 0,
      currentTotal: quantity
    }));

    this.getListPerPage();
  }

  getListPerPage() {
    const state = this.get(s => s);

    this.patchState(s => ({
      ...s,
      pokemonListPerPage: state.allPokemons.slice(state.previousPage, state.nextPage),
      totalList: state.allPokemons.length
    }));
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
      totalList: result.length,
      allPokemons: result,
      search: true
    }));

    this.getListPerPage();
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
        currentTotal: 6,
        nextPage: 6,
        previousPage: 0
      }));

      this.getListPerPage();
    });
  }
}

