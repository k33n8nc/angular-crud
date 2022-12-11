import { TestBed } from '@angular/core/testing';

import { RestaurantCardService } from './restaurant-card.service';

describe('RestaurantCardService', () => {
  let service: RestaurantCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
