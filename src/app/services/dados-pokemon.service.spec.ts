import { TestBed } from '@angular/core/testing';

import { DadosPokemonService } from './dados-pokemon.service';

describe('DadosPokemonService', () => {
  let service: DadosPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
