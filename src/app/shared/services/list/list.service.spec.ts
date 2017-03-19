import { TestBed, inject } from '@angular/core/testing';

import { ListService } from './pagination.service';

describe('PaginationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListService]
    });
  });

  it('should ...', inject([ListService], (service: ListService) => {
    expect(service).toBeTruthy();
  }));
});
