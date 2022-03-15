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
  private typeRelations: any = [
    {
      name: 'bug',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'dark',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'dragon',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'electric',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'fairy',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'fighting',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'fire',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'flying',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'ghost',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'grass',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'ground',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'ice',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'normal',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'poison',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'psychic',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'rock',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'steel',
      valueATK: 1,
      valueDEF: 1,
    },
    {
      name: 'water',
      valueATK: 1,
      valueDEF: 1,
    },
  ];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(private dadosPokemonService: DadosPokemonService) {}

  async ngOnInit() {
    this.id = this.dadosPokemonService.pegarDados('pokemon');
    await this.getPokemon(this.id);
    this.getTypeRelation();
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

  async getTypeRelation() {
    let typeRelation;
    let type1, type2;

    type1 = this.pokemon.types[0].type.name;
    if (this.pokemon.types[1]) type2 = this.pokemon.types[1].type.name;

    await this.pokemonClient
      .getTypeByName(type1)
      .then((data) => {
        typeRelation = data.damage_relations;
      })
      .catch((error) => console.error(error));

    this.typeRelationsSet(typeRelation);

    if (type2) {
      await this.pokemonClient
        .getTypeByName(type2)
        .then((data) => {
          typeRelation = data.damage_relations;
        })
        .catch((error) => console.error(error));
      this.typeRelationsSet(typeRelation);
    }
  }

  typeRelationsSet(typeRelation) {
    for (let i = 0; i < this.typeRelations.length; i++) {
      for (let j = 0; j < typeRelation.double_damage_from.length; j++) {
        if (
          typeRelation.double_damage_from[j].name === this.typeRelations[i].name
        )
          this.typeRelations[i].valueDEF *= 2;
      }
      for (let j = 0; j < typeRelation.double_damage_to.length; j++) {
        if (
          typeRelation.double_damage_to[j].name === this.typeRelations[i].name
        )
          this.typeRelations[i].valueATK *= 2;
      }
      for (let j = 0; j < typeRelation.half_damage_from.length; j++) {
        if (
          typeRelation.half_damage_from[j].name === this.typeRelations[i].name
        )
          this.typeRelations[i].valueDEF *= 0.5;
      }
      for (let j = 0; j < typeRelation.half_damage_to.length; j++) {
        if (typeRelation.half_damage_to[j].name === this.typeRelations[i].name)
          this.typeRelations[i].valueATK *= 0.5;
      }
      for (let j = 0; j < typeRelation.no_damage_from.length; j++) {
        if (typeRelation.no_damage_from[j].name === this.typeRelations[i].name)
          this.typeRelations[i].valueDEF = 0;
      }
      for (let j = 0; j < typeRelation.no_damage_to.length; j++) {
        if (typeRelation.no_damage_to[j].name === this.typeRelations[i].name)
          this.typeRelations[i].valueATK = 0;
      }
    }
  }

  getTypeRelationColorATK(value: number): string {
    if (value === 0) return 'dark';
    if (value === 1) return 'medium';
    if (value <= 0.5) return 'danger';
    if (value >= 2) return 'success';
  }
  getTypeRelationColorDEF(value: number): string {
    if (value === 0) return 'dark';
    if (value === 1) return 'medium';
    if (value <= 0.5) return 'success';
    if (value >= 2) return 'danger';
  }
}
