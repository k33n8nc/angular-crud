import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.scss']
})
export class RestaurantEditComponent implements OnInit {
  
  @Output() delRestaurantEvent = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  delRestaurant(value: any) {
    this.delRestaurantEvent.emit(value);
    console.log('clicked', value)
  }

  // removeRestaurant(value: any) {
  //   this.delRestaurantEvent.emit(value);
  //   console.log('clicked', value)
  // }

}
