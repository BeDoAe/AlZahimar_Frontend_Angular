import { TestBed } from '@angular/core/testing';

import { MemoryCardsGameService } from './memory-cards-game.service';

describe('MemoryCardsGameService', () => {
  let service: MemoryCardsGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryCardsGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
