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
    .pipe(
      tap(val => console.log('From Service after async pipe: ', val)),
    );

    private restaurantInsertedSubject = new Subject<any>();
    restaurantInsertedAction$ = this.restaurantInsertedSubject.asObservable();
    
    restaurantsWithAdd$ = merge(this.restaurants$, this.restaurantInsertedAction$)
    .pipe(
      tap((val)=> console.log('restaurantsWithAdd$ merge before', val)),
      scan((acc, curr) => {
        return (curr instanceof Array) ? [...curr] : [...acc, curr]
      }),
      tap((val)=> console.log('restaurantsWithAdd$ merge after', val))
    )

    addRestaurant(restaurant: IRestaurant){
      return this.http.post(this.restaurantEndpoint, restaurant)
      .pipe(
        tap((res)=> {
          console.log('Response after addRestaurant:', res);
          this.restaurantInsertedSubject.next(res)
        })
      )
    }

    editRestaurant(restaurantId: number, restaurant: any){
      this.http.put(this.restaurantEndpoint + restaurantId, restaurant)
      .pipe(
        tap(res => console.log(res))
      )
    }
    
    deleteRestaurant(restaurantId: number){
      return this.http.delete(this.restaurantEndpoint + restaurantId)
      .pipe(
        tap((res)=> {
          console.log('Response after deleteRestaurant:', res);
          // this.restaurantInsertedSubject.next(res)
        })
      )
    }

  constructor(private http: HttpClient) { }
}
