import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { IRestaurant } from './restaurant.model';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
  private restaurantsUrl = 'http://localhost:3000/restaurants/';

  constructor(private http: HttpClient) { }
    
    /** GET restaurants from the server */
    getRestaurants(): Observable<IRestaurant[]> {
      return this.http.get<IRestaurant[]>(this.restaurantsUrl)
      .pipe(
        tap( (res)=> {
          console.log('res here', res)
        } )
      )
    }
    
    /** POST: a new restaurant to the server */
    addRestaurant(restaurant: IRestaurant): Observable<IRestaurant> {
      return this.http.post<IRestaurant>(this.restaurantsUrl, restaurant);
    }

    /** DELETE: delete a restaurant from the server */
    deleteRestaurant(id: number): Observable<any> {
      const url = `${this.restaurantsUrl}${id}`;
      return this.http.delete<any>(url)
    }

    /** PUT: edit a restaurant from the server */
    editRestaurant(restaurant: IRestaurant): Observable<any> {
      const url = `${this.restaurantsUrl}${restaurant.id}`;
      return this.http.put<any>(url, restaurant)
    }

}