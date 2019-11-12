import { TestBed } from '@angular/core/testing';

import { ListOrderService } from './list-order.service';

describe('ListOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListOrderService = TestBed.get(ListOrderService);
    expect(service).toBeTruthy();
  });
});
