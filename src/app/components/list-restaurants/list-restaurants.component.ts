import { Component } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service'; 


@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})
export class ListRestaurantsComponent {
  restaurantsMerged$ = this.restaurantsService.restaurantsMerged$
  constructor(private restaurantsService: RestaurantsService) { }
}
