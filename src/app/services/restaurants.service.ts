import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { IRestaurant } from 'src/app/models/restaurant';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
  private restaurantEndpoint = 'http://localhost:1337/api/restaurants/';

  // Declare variable restaurants$ and assign Observable to it
  restaurants$ = this.http.get<any>(this.restaurantEndpoint)
    .pipe(
        tap(val => console.log('From Service before map: ', val)),
        map ( restaurants => {
          return restaurants.data.map(
            (restaurants: any) => ({
              ...restaurants
            })
          )
        }),
      tap(val => console.log('From Service after map: ', val)),
    );

    addRestaurant(restaurant: IRestaurant){
      this.http.post(this.restaurantEndpoint, restaurant)
      .subscribe( (res)=> {
        console.log('Response after addRestaurant:', res);
      })
    }

    editRestaurant(restaurantId: string, restaurant: any){
      this.http.put(this.restaurantEndpoint + restaurantId, restaurant)
      .subscribe( (res)=> {
        console.log('Response after editRestaurant:', res);
      })
    }
    
    deleteRestaurant(restaurantId: string){
      this.http.delete(this.restaurantEndpoint + restaurantId)
      .subscribe( (res)=> {
        console.log('Response after deleteRestaurant:', res);
      })
    }

  constructor(private http: HttpClient) { }
}
