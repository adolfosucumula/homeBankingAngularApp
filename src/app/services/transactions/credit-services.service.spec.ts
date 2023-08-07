import { TestBed } from '@angular/core/testing';

import { CreditServicesService } from './credit-services.service';

describe('CreditServicesService', () => {
  let service: CreditServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
