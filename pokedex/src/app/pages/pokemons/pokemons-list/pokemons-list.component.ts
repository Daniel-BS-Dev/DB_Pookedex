import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonList } from 'src/app/models/pokemonsList';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent {

  pokemons$!: Observable<PokemonList>

  constructor(private service: PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.service.getPokemonList(0, 20);

  }

}
