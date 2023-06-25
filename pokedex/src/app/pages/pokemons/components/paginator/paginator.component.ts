import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { PokemonsListStore } from "../../pokemons-list/pokemons-list.store";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  options = [
    { value: 6 },
    { value: 12 },
    { value: 18 },
    { value: 24 },
    { value: 30 }
  ];

  // get total(): boolean {
  //   return this.currentTotal >= this.listTotal ? true : false
  // }

  // get quantityPokemonPage() {
  //   return this.quantityPokemon < 12 ? '0' + this.quantityPokemon : this.quantityPokemon;
  // }

  constructor(public store: PokemonsListStore) {
  }

  goPreviousPage = () =>
    this.store.goPreviousPage();

  goNextPage = () =>
    this.store.goNextPage();

  changeTypeImage = () => {
    this.store.changeTypeImage();
  }

  showNumberPerPage = (value: number) =>
    value < 10 ? '0' + value : value;

  addQuantity = (value: number) => {
    this.store.addQuantity(value);
  }
}
