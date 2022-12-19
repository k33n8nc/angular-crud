import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IRestaurant } from './restaurant.model';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
  private restaurantsUrl = 'http://localhost:3000/restaurants/';

  // restaurants$ = this.http.get<IRestaurant[]>(this.restaurantsUrl); 
  
  constructor(private http: HttpClient) { }
    
    /** GET restaurants from the server */
    getRestaurants(): Observable<IRestaurant[]> {
      return this.http.get<IRestaurant[]>(this.restaurantsUrl)
    }
    
    /** POST: a new restaurant to the server */
    addRestaurant(restaurant: IRestaurant): Observable<IRestaurant> {
      return this.http.post<IRestaurant>(this.restaurantsUrl, restaurant);
    }
    
    /** DELETE: a specific restaurant from the server */
    // deleteRestaurant(restaurantId: any): Observable<any> {
    //   return this.http.delete<any>(this.restaurantsUrl + restaurantId);
    // }


    /** DELETE: delete a restaurant from the server */
    deleteRestaurant(id: number): Observable<any> {
      const url = `${this.restaurantsUrl}${id}`;
      return this.http.delete<any>(url)
      .pipe(
        tap((res) => console.log(`deleted res id=${id}`))
      );
  }
    

}