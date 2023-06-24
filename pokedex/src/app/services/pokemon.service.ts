
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PokemonDetailModel } from '../models/pokemonDetails';
import { PokemonList } from '../models/pokemonsList';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly urlApi = environment.urlApi;

  constructor(private http: HttpClient) { }

  getPokemonList = (page: number, quantity: number): Observable<PokemonList> => {
    let url = `${this.urlApi}pokemon?offset=${page}&limit=${quantity}`;
    return this.http.get<PokemonList>(url);
  }

  getPokemonDetail = (pokemon: string): Observable<PokemonDetailModel> => {
    let url = `${this.urlApi}pokemon/${pokemon}`
    return this.http.get<PokemonDetailModel>(url);
  }
}
