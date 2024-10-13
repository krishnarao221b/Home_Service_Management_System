import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders!: IOrder[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrdersForUser().subscribe(
      (orders: IOrder[] | any) => {
        this.orders = orders;
        this.orders.reverse();
      },
      error => {
        console.log(error);
      }
    );
  }
}

