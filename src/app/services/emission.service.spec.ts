import { TestBed } from '@angular/core/testing';

import { EmissionService } from './emission.service';

describe('EmissionService', () => {
  let service: EmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
