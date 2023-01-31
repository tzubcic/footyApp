import { TestBed } from '@angular/core/testing';

import { LeagueTableService } from './league-table.service';

describe('LeagueTableService', () => {
  let service: LeagueTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeagueTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
