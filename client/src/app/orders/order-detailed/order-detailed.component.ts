import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/order';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detailed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss'
})
export class OrderDetailedComponent implements OnInit {
  order!: IOrder;

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private ordersService: OrdersService
  ) {
    this.breadcrumbService.set('@OrderDetailed', '');
  }

  ngOnInit() {
    const orderId = +this.route.snapshot.paramMap.get('id')!;

    this.ordersService.getOrderDetailed(orderId).subscribe(
      (order: IOrder | any) => {
        this.order = order;
        this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      },
      error => {
        console.log(error);
      }
    );
  }
}

