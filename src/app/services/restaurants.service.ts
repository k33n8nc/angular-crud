import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, merge, scan, Subject, tap } from 'rxjs';
import { IRestaurant } from 'src/app/models/restaurant';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
  private restaurantEndpoint = 'http://localhost:3000/restaurants/';

  restaurants$ = this.http.get<IRestaurant[]>(this.restaurantEndpoint)
    .pipe( tap(val => console.log('From Service after async pipe subscribe: ', val)));

    private restaurantInsertedSubject = new Subject<any>();
    restaurantInsertedAction$ = this.restaurantInsertedSubject.asObservable();
    
    restaurantsWithAdd$ = merge(this.restaurants$, this.restaurantInsertedAction$)
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
          // this.restaurantInsertedSubject.next(res)
        })
      )
    }

  constructor(private http: HttpClient) { }
}
