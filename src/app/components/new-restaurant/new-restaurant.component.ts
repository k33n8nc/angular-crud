import { Component } from '@angular/core';
import { IRestaurant } from 'src/app/models/restaurant';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.scss']
})

export class NewRestaurantComponent {
  restaurant: IRestaurant = {data: {title: "This is title", description: "Text here..."}}

  constructor(private restaurantsService: RestaurantsService) {}

  addRestaunt(){
    this.restaurantsService.addRestaurant(this.restaurant);
  }
 
  // onNewRestaunt(){
  //   this.http.post('http://localhost:1337/api/restaurants/', this.restaurant)
  //   .subscribe( (res)=> {
  //     console.log('Response after subscribe 123:', res);
  //   })
  // }

}
