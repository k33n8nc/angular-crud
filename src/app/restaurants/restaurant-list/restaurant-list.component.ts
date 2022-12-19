import { Component, Input } from '@angular/core';
import { IRestaurant } from '../shared/restaurant.model';
import { RestaurantsService } from '../shared/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent {
  @Input() restaurants: IRestaurant[] = [];
  

}



