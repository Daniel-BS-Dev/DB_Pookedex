import { PokemonModel } from "./pokemonsList";

export interface PokemonDetailModel {
  id: number;
  order: number;
  name: string;
  height: number;
  abilities: Ability[];
  spices: Species;
  types: Type[];
  weight: number;
  sprites: Sprite;
  stats: Stat[];
}

interface Ability {
  ability: {
    name: string
  };
}

interface Species {
  url: string;
  flavor_text_entries: string;
}

interface Type {
  slot: number;
  type: PokemonModel;
}

interface Sprite {
  front_default: string;
}

interface Stat {
  base_stat: number;
  stat: string;
}
