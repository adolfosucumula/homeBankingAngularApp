import { TestBed } from '@angular/core/testing';

import { DebitServicesService } from './debit-services.service';

describe('DebitServicesService', () => {
  let service: DebitServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
