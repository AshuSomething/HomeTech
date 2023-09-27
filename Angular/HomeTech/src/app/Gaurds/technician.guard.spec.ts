import { TestBed } from '@angular/core/testing';

import { TechnicianGaurd } from './technician.guard';

describe('GuardNameGuard', () => {
  let guard: TechnicianGaurd;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TechnicianGaurd);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
