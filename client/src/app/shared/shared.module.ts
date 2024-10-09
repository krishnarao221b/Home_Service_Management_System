import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgxPaginationModule } from 'ngx-pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselComponent, CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagingHeaderComponent,
    PagerComponent,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    OrderTotalsComponent
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    PaginationModule,
    CarouselModule,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
