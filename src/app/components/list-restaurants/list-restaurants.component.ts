import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service'; 
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs';
import { IRestaurant } from 'src/app/models/restaurant';


@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})
export class ListRestaurantsComponent {
  restaurants$ = this.restaurantsService.restaurants$
  restaurant: IRestaurant = {data: {title: "This is title", description: "Text here..."}}

  constructor(private restaurantsService: RestaurantsService) { }

}