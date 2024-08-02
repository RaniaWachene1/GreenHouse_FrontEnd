import { TestBed } from '@angular/core/testing';

import { VinServiceService } from './vin-service.service';

describe('VinServiceService', () => {
  let service: VinServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
