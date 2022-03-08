import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPokemonsPageRoutingModule } from './lista-pokemons-routing.module';

import { ListaPokemonsPage } from './lista-pokemons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPokemonsPageRoutingModule
  ],
  declarations: [ListaPokemonsPage]
})
export class ListaPokemonsPageModule {}
