import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs';
import { IRestaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})
export class EditRestaurantComponent {
  // restaurants$ = this.restaurantsService.restaurants$
  restaurant: IRestaurant = {data: {title: "This is title", description: "Text here..."}}

  constructor(private http: HttpClient) { }
  
  onNewRestaunt(){
    this.http.post('http://localhost:1337/api/restaurants/', this.restaurant)
    .subscribe( (res)=> {
      console.log('Response after subscribe:', res);
    })
  }

}
