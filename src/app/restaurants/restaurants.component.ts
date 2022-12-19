import { Component, Input, OnInit } from '@angular/core';
import { IRestaurant } from './shared/restaurant.model';
import { RestaurantsService } from './shared/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: IRestaurant[] = [];

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(){
    this.restaurantsService.getRestaurants()
    .subscribe(restaurants => this.restaurants = restaurants);
  }

  addRestaurant(restaurant: IRestaurant){
    this.restaurantsService.addRestaurant(restaurant)
    .subscribe((restaurant) => {
      this.restaurants.push(restaurant)
    });
  }

  deleteRestaurant(restaurantId: any){
    this.restaurantsService.deleteRestaurant(restaurantId)
    .subscribe(
      ()=> {
        this.restaurants = this.restaurants.filter(elem => elem.id != restaurantId)
      }
    )
  }

}
