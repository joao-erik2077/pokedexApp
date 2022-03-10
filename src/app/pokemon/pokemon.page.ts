import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/Pokemon.model';
import { DadosPokemonService } from '../services/dados-pokemon.service';
import { MoveClient } from 'pokenode-ts';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  pokemon: Pokemon;
  actualSegment: string = 'dados';
  moveClient = new MoveClient();

  constructor(
    private dadosPokemonService: DadosPokemonService,
  ) {}

  ngOnInit() {
    this.pokemon = this.dadosPokemonService.pegarDados('pokemon');
  }

  segmentChange(event) {
    if (event.target.value === 'dados') {
      this.actualSegment = 'dados';
    } else if (event.target.value === 'moves') {
      this.actualSegment = 'moves';
    }
  }

  getColor(tipo): string {
    return `type-${tipo.type.name}`;
  }
}
