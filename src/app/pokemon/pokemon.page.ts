import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/Pokemon.model';
import { DadosPokemonService } from '../services/dados-pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  pokemon: Pokemon;

  constructor(private dadosPokemonService: DadosPokemonService) { }

  ngOnInit() {
    this.pokemon = this.dadosPokemonService.pegarDados('pokemon');
  }

}
