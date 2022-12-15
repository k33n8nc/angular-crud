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

  getTheDate(){
    return Date.now();
  }

  addRestaunt(){
    this.restaurantsService.addRestaurant(this.restaurant).subscribe(
      res => console.log('addRestaurant() after subscribe \n • new-restaurant.component', res)
    );
  }
 
  // onNewRestaunt(){
  //   this.http.post('http://localhost:1337/api/restaurants/', this.restaurant)
  //   .subscribe( (res)=> {
  //     console.log('Response after subscribe 123:', res);
  //   })
  // }

}
