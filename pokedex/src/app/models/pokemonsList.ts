export interface PokemonModel {
  name: string;
  url: string;
}

export interface PokemonList {
  results: PokemonModel[];
  count: number;
}
