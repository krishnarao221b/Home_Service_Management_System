import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrdersComponent,
    OrderDetailedComponent,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
