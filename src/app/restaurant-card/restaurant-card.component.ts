import { Component, OnInit } from '@angular/core';
import { RestaurantCardService } from './restaurant-card.service'; 
import { catchError, EMPTY, Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent {

  restaurants$ = this.restaurantCardService.restaurants$
  restaurant = {data: {title: "This is title", description: "Text here..."}}

  constructor(private restaurantCardService: RestaurantCardService, private http: HttpClient) { }
  
  onNewRestaunt(){
    this.http.post('http://localhost:1337/api/restaurants/', this.restaurant)
    .subscribe( (res)=> {
      console.log('Response after subscribe:', res);
      this.restaurants$.subscribe( (res)=> {
        console.log('In component after POST', res)
      })
    })
  }

}
