import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantCardService {
  private restaurantEndpoint = 'http://localhost:1337/api/restaurants';

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
      // tap (res => {
      //   this.restaurants$ = res;
      // })
    );

  constructor(private http: HttpClient) { }




}
