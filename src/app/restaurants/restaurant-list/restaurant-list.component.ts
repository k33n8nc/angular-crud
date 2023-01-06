import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRestaurant } from '../shared/restaurant.model';
import { RestaurantsService } from '../shared/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent {
  @Input() restaurants: IRestaurant[] = [];
  @Output() delRestaurantEvent = new EventEmitter<any>();
  @Output() editRestaurantEvent = new EventEmitter<any>();

  constructor(private restaurantsService: RestaurantsService) {}

  deleteRestaurant(value: any) {
    this.delRestaurantEvent.emit(value);
  }

  editRestaurant(value: any) {
    this.editRestaurantEvent.emit(value);
    console.log('From editRestaurant Event emitter', value)
    // this.restaurants.filter( (val)=>{
    //   console.log(val.id != value) 
    // } )
  }

}




