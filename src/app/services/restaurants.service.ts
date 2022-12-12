import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
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
    );
  constructor(private http: HttpClient) { }
}
