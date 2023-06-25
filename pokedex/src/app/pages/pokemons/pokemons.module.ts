
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PokemonsRoutingModule } from './pokemons-list-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  declarations: [
    PokemonsListComponent,
    HeaderComponent,
    CardComponent,
    PaginatorComponent
  ],
  providers: [
    PokemonService
  ]
})
export class PokemonsModule { }
