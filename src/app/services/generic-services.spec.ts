import { TestBed } from '@angular/core/testing';

import { GenericServices } from './generic-services.service';

describe('GenericServices', () => {
  let service: GenericServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
