import { Component, OnInit } from '@angular/core';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { Observable } from 'rxjs';
import { BasketService } from './basket.service';
import { CommonModule } from '@angular/common';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
import { BasketSummaryComponent } from '../shared/components/basket-summary/basket-summary.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, OrderTotalsComponent, RouterModule, BasketSummaryComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  basket$!: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  ngOnInit(){
    this.basket$ = this.basketService.basket$;
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }



}
