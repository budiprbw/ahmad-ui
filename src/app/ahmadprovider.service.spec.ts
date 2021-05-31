import { TestBed } from '@angular/core/testing';

import { AhmadproviderService } from './ahmadprovider.service';

describe('AhmadproviderService', () => {
  let service: AhmadproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AhmadproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
