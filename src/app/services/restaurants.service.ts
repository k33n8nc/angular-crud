import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, merge, scan, Subject, tap } from 'rxjs';
import { IRestaurant } from 'src/app/models/restaurant';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
  private restaurantEndpoint = 'http://localhost:1337/api/restaurants/';

  // Declare variable restaurants$ and assigns a Observable to it returned from http get
  restaurants$ = this.http.get<any>(this.restaurantEndpoint)
    .pipe(
        tap(val => console.log('From Service before map: ', val)),
        map ( restaurants => {
          return restaurants.data.map(
            (restaurants: any) => ({
              ...restaurants,
              // attributes: {description: 'Change description..'}
            })
          )
        }),
      tap(val => console.log('From Service after map: ', val)),
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

    addRestaurantWithAdd (newRestaurant?: any){
      this.restaurantInsertedSubject.next(newRestaurant)
    }

    addRestaurant(restaurant: IRestaurant){
      this.http.post(this.restaurantEndpoint, restaurant)
      .subscribe( (res)=> {
        // this.restaurantInsertedSubject.next(restaurant)
        console.log('Response after addRestaurant:', res); 
      })
      // this.restaurantInsertedSubject.next(restaurant)

      // all subscriptions go in the component!
      // refresh the api after a post req
    }

    editRestaurant(restaurantId: string, restaurant: any){
      this.http.put(this.restaurantEndpoint + restaurantId, restaurant)
      .subscribe( (res)=> {
        console.log('Response after editRestaurant:', res);
      })
    }
    
    deleteRestaurant(restaurantId: string){
      return this.http.delete(this.restaurantEndpoint + restaurantId)
      // .subscribe( (res)=> {
      //   console.log('Response after deleteRestaurant:', res);
      // })
    }

  constructor(private http: HttpClient) { }
}
