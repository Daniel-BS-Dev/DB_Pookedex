
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokemonsRoutingModule } from './pokemons-list-routing.module';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    HttpClientModule
  ],
  declarations: [
    PokemonsListComponent,
    HeaderComponent
  ],
  providers: [
    PokemonService
  ]
})
export class PokemonsModule { }
