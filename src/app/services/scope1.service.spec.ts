import { TestBed } from '@angular/core/testing';

import { Scope1Service } from './scope1.service';

describe('Scope1Service', () => {
  let service: Scope1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Scope1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
