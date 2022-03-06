import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DadosPokemonService } from '../services/dados-pokemon.service';
import { Pokemon } from '../models/Pokemon.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemons: Pokemon[] = [
    {
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
      nome: 'Ditto',
      tipos: ['Normal'],
      numero: 214,
    },
    {
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      nome: 'Charmander',
      tipos: ['Fogo'],
      numero: 5,
    },
  ];

  constructor(
    private route: Router,
    private dadosPokemonService: DadosPokemonService
  ) {}

  exibirPokemon(pokemon) {
    this.dadosPokemonService.guardarDados('pokemon', pokemon);
    this.route.navigateByUrl('pokemon');
  }
}
