import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, merge, scan, Subject, tap } from 'rxjs';
import { IRestaurant } from 'src/app/models/restaurant';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
  private restaurantEndpoint = 'http://localhost:3000/restaurants/';

  // Declare variable restaurants$ and assigns a Observable to it returned from http get
  restaurants$ = this.http.get<IRestaurant[]>(this.restaurantEndpoint)
    .pipe(
        tap(val => console.log('From Service plain: ', val)),
    );

    private restaurantInsertedSubject = new Subject<any>();
    restaurantInsertedAction$ = this.restaurantInsertedSubject.asObservable();

    restaurantsWithAdd$ = merge(
      this.restaurants$,
      this.restaurantInsertedAction$
    ).pipe(
      tap((val)=> console.log('restaurantsWithAdd$ merge before', val)),
      scan((acc, val) => {
        return (val instanceof Array) ? [...val] : [...acc, val]
        // console.log('accumu', acc, val)
      }),
      tap((val)=> console.log('restaurantsWithAdd$ merge after', val))
    )

    addRestaurant(restaurant: IRestaurant){
      this.http.post(this.restaurantEndpoint, restaurant)
      .subscribe( (res)=> {
        console.log('Response after addRestaurant:', res);
        this.restaurantInsertedSubject.next(restaurant)
      })
    }

    editRestaurant(restaurantId: number, restaurant: any){
      this.http.put(this.restaurantEndpoint + restaurantId, restaurant)
      .subscribe( (res)=> {
        console.log('Response after editRestaurant:', res);
      })
    }
    
    deleteRestaurant(restaurantId: number){
      return this.http.delete(this.restaurantEndpoint + restaurantId)
      // .subscribe( (res)=> {
      //   console.log('Response after deleteRestaurant:', res);
      // })
    }

  constructor(private http: HttpClient) { }
}
