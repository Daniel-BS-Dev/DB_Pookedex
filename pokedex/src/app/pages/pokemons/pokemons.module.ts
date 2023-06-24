
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokemonsRoutingModule } from './pokemons-list-routing.module';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    HttpClientModule
  ],
  declarations: [
    PokemonsListComponent
  ],
  providers: [
    PokemonService
  ]
})
export class PokemonsModule { }
