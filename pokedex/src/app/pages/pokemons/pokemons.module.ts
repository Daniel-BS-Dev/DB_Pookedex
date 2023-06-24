
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokemonsRoutingModule } from './pokemons-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PokemonsRoutingModule
  ],
  declarations: [
    PokemonsListComponent
  ]
})
export class PokemonsModule { }
