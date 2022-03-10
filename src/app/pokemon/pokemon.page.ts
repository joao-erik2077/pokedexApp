import { Component, OnInit } from '@angular/core';
import { DadosPokemonService } from '../services/dados-pokemon.service';
import { MoveClient, PokemonClient } from 'pokenode-ts';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  id: number;
  pokemon: any;
  actualSegment: string = 'dados';
  pokemonClient = new PokemonClient();
  moveClient = new MoveClient();

  private moves: any = [];
  private loading: boolean;
  private movesPage: any = [];
  private readonly offset: number = 10;
  private index: number = 0;
  private totalMoves: number;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(private dadosPokemonService: DadosPokemonService) {}

  async ngOnInit() {
    this.id = this.dadosPokemonService.pegarDados('pokemon');
    await this.getPokemon(this.id);
    this.totalMoves = this.pokemon.moves.length;
    this.getMoves();
  }

  async getPokemon(id) {
    await this.pokemonClient
      .getPokemonById(this.id)
      .then((data) => {
        this.pokemon = data;
      })
      .catch((error) => console.error(error));
  }

  segmentChange(event) {
    if (event.target.value === 'dados') {
      this.actualSegment = 'dados';
    } else if (event.target.value === 'moves') {
      this.actualSegment = 'moves';
    } else if (event.target.value === 'stats') {
      this.actualSegment = 'stats';
    }
  }

  getColor(tipo): string {
    return `type-${tipo.type.name}`;
  }

  getMoveColor(tipo): string {
    return `type-${tipo}`;
  }

  async getMoves() {
    this.loading = true;
    for (let i = this.index + 1; i <= this.offset + this.index; i++) {
      if (i > this.totalMoves) break;
      console.log(i);
      await this.moveClient
        .getMoveByName(this.pokemon.moves[i - 1].move.name)
        .then((data) => {
          this.moves.push(data);
        })
        .catch((error) => console.error(error));
    }

    this.movesPage = this.moves.slice(0, this.offset + this.index);
    this.index += this.offset;
    this.loading = false;
  }

  async loadData(event) {
    if (!this.loading) await this.getMoves();

    event.target.complete();

    if (this.movesPage.length === this.totalMoves) {
      event.target.disabled = true;
    }
  }

  getStatNameFormatted(stat: string): string {
    let statFormatted: string;
    switch (stat) {
      case 'hp':
        statFormatted = 'HP';
        break;
      case 'attack':
        statFormatted = 'ATK';
        break;
      case 'defense':
        statFormatted = 'DEF';
        break;
      case 'special-attack':
        statFormatted = 'S.ATK';
        break;
      case 'special-defense':
        statFormatted = 'S.DEF';
        break;
      case 'speed':
        statFormatted = 'SPE';
        break;
    }
    return statFormatted;
  }
}
