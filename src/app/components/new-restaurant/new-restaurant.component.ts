import { Component } from '@angular/core';
import { IRestaurant } from 'src/app/models/restaurant';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.scss']
})

export class NewRestaurantComponent {
  restaurant: IRestaurant = {title: "Restaurant", category: "Italian"}
  
  constructor(private restaurantsService: RestaurantsService) {}

  addRestaunt(){
    this.restaurantsService.addRestaurant(this.restaurant).subscribe();
  }

}
