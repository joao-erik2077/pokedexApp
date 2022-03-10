import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DadosPokemonService } from '../services/dados-pokemon.service';
import { PokemonClient } from 'pokenode-ts';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lista-pokemons',
  templateUrl: './lista-pokemons.page.html',
  styleUrls: ['./lista-pokemons.page.scss'],
})
export class ListaPokemonsPage {
  pokemonCliente = new PokemonClient();

  pesquisa: string;
  pokemons: any = [];
  pokemonSprite: any = [];
  pokemonsPage: any = [];
  private readonly offset: number = 20;
  private index: number = 0;
  loading: boolean;

  totalPokemons = 898;

  constructor(
    private route: Router,
    private dadosPokemonService: DadosPokemonService,
    public toastController: ToastController
  ) {
    this.getPokemons();
  }

  async getPokemons() {
    this.loading = true;
    for (let i = this.index + 1; i <= this.offset + this.index; i++) {
      if (i > this.totalPokemons) break;
      console.log(i);
      await this.pokemonCliente
        .getPokemonById(i)
        .then((data) => {
          this.pokemons.push(data);
          this.setSprite(data, false);
        })
        .catch((error) => console.error(error));
    }
    this.pokemonsPage = this.pokemons.slice(0, this.offset + this.index);
    this.index += this.offset;
    this.loading = false;
  }

  exibirPokemon(id: number) {
    this.dadosPokemonService.guardarDados('pokemon', id);
    this.route.navigateByUrl('pokemon');
  }

  async loadData(event) {
    if (!this.loading) await this.getPokemons();

    event.target.complete();

    if (this.pokemonsPage.length === this.totalPokemons) {
      event.target.disabled = true;
    }
  }

  async buscarPokemon(event) {
    if (this.pesquisa && this.pesquisa.trim() !== '') {
      await this.pokemonCliente
        .getPokemonByName(this.pesquisa.toLowerCase())
        .then((data) => {
          this.exibirPokemon(data.id);
        })
        .catch((error) => this.pokemonToast());
    }
  }

  async pokemonToast() {
    const toast = await this.toastController.create({
      message: 'Pokemon nao encontrado',
      color: 'danger',
      duration: 2000,
    });
    toast.present();
  }

  getColor(tipo): string {
    return `type-${tipo.type.name}`;
  }

  getIdFormatado(id: number): string {
    const tamanhoTotal = 3;
    let idString = String(id);

    for (let i = idString.length; i < tamanhoTotal; i++) {
      idString = `0${idString}`;
    }

    return idString;
  }

  transformarShiny(pokemon) {
    if (this.pokemonSprite[pokemon.id] === pokemon.sprites.front_default)
      this.setSprite(pokemon, true);
    else this.setSprite(pokemon, false);
  }
  setSprite(pokemon, shiny: boolean) {
    if (shiny) this.pokemonSprite[pokemon.id] = pokemon.sprites.front_shiny;
    else this.pokemonSprite[pokemon.id] = pokemon.sprites.front_default;
  }
}
