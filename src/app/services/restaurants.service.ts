import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, merge, scan, Subject, tap } from 'rxjs';
import { IRestaurant } from 'src/app/models/restaurant';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
  private restaurantEndpoint = 'http://localhost:3000/restaurants/';

  restaurants$ = this.http.get<IRestaurant[]>(this.restaurantEndpoint);
  private restaurantInsertedSubject = new Subject<any>();
  private restaurantInsertedAction$ = this.restaurantInsertedSubject.asObservable();
    
    restaurantsMerged$ = merge(this.restaurants$, this.restaurantInsertedAction$)
    .pipe(
      scan((acc, curr) => {
        return (curr instanceof Array) ? [...curr] : [...acc, curr]
      }),
    )

    addRestaurant(restaurant: IRestaurant){
      return this.http.post(this.restaurantEndpoint, restaurant)
      .pipe(
        tap((res)=> {
          this.restaurantInsertedSubject.next(res)
          console.log('Response after addRestaurant:', res);
        })
      )
    }
   
    deleteRestaurant(restaurantId: number){
      return this.http.delete(this.restaurantEndpoint + restaurantId)
      .pipe(
        map((res)=> {
          console.log('Response after deleteRestaurant map:', res, restaurantId );
        })
      )
    }

  constructor(private http: HttpClient) { }
}