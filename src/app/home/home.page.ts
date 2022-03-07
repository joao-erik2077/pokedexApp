import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosPokemonService } from '../services/dados-pokemon.service';
import { PokemonClient } from 'pokenode-ts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonCliente = new PokemonClient();

  pokemons: any = [];
  pokemonsPage: any = [];
  private readonly offset: number = 20;
  private index: number = 0;

  totalPokemons = 898;

  constructor(
    private route: Router,
    private dadosPokemonService: DadosPokemonService
  ) {
    this.getPokemons();
  }

  async getPokemons() {
    for (let i = this.index+1; i <= this.offset+this.index; i++) {
      console.log(i);
      await this.pokemonCliente
        .getPokemonById(i)
        .then((data) => {
          this.pokemons.push(data);
        })
        .catch((error) => console.error(error));
    }
    this.pokemonsPage = this.pokemons.slice(0, this.offset + this.index);
    this.index += this.offset;
  }

  exibirPokemon(pokemon) {
    this.dadosPokemonService.guardarDados('pokemon', pokemon);
    this.route.navigateByUrl('pokemon');
  }

  loadData(event) {
    this.getPokemons();

    event.target.complete();

    if (this.pokemonsPage.length === this.totalPokemons) {
      event.target.disabled = true;
    }
  }
}
