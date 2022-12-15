import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, BehaviorSubject } from 'rxjs';
import { IRestaurant } from 'src/app/models/restaurant';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})

export class EditRestaurantComponent {
  restaurant: IRestaurant = {title: "This is title", category: "Text here..."}

  @Input() currentRestaurantId = 0;

  constructor(private restaurantsService: RestaurantsService) {}
  
  deleteRestaurant(){
    this.restaurantsService.deleteRestaurant(this.currentRestaurantId)
    .subscribe( (res)=> {
      console.log('Response after deleteRestaurant:', res);
    })
  }
  
  // The service Class can be called from outside. 
  // The service should handle all data interaction


}
