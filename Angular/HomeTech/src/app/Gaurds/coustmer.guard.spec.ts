import { TestBed } from '@angular/core/testing';

import { CoustmerGuard } from './coustmer.guard';

describe('CoustmerGuard', () => {
  let guard: CoustmerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoustmerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
