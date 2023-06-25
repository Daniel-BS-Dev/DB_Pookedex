import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { PokemonsListStore } from "../../pokemons-list/pokemons-list.store";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Output() nextPage = new EventEmitter();
  @Output() previousPage = new EventEmitter();
  @Output() typeImage = new EventEmitter();
  @Output() morePokemon = new EventEmitter();

  @Input() listTotal!: number;
  @Input() currentTotal!: number;
  @Input() quantityPokemon!: number;
  @Input() pokemonList!: number;
  @Input() classicMode = false;

  options = [
    { value: 6 },
    { value: 12 },
    { value: 18 },
    { value: 24 },
    { value: 30 }
  ];

  get total(): boolean {
    return this.currentTotal >= this.listTotal ? true : false
  }

  get quantityPokemonPage() {
    return this.quantityPokemon < 12 ? '0' + this.quantityPokemon : this.quantityPokemon;
  }

  constructor(public store: PokemonsListStore) {
  }

  goPreviousPage = () =>
    this.previousPage.emit();

  goNextPage = () =>
    this.nextPage.emit();

  changeTypeImage = () => {
    this.store.changeTypeImage();
  }

  addQuantity = (option: number) => {
    this.quantityPokemon = option;
    this.morePokemon.emit(this.quantityPokemon);
  }
}
