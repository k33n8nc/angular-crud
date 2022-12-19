import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IRestaurant } from '../shared/restaurant.model';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.scss']
})
export class RestaurantAddComponent {
  @Output() newRestaurantEvent = new EventEmitter<any>();

  restaurant: IRestaurant = {title: "Restaurant", category: "Italian"}
  constructor() { }

  newRestaurant(value: IRestaurant) {
    this.newRestaurantEvent.emit(value);
    console.log('newRestaurant Event emitted ',value)
  }

}
