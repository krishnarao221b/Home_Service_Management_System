import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgxPaginationModule } from 'ngx-pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselComponent, CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagingHeaderComponent,
    PagerComponent,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    OrderTotalsComponent,
    ReactiveFormsModule,
    TextInputComponent
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    PaginationModule,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent
  ]
})
export class SharedModule { }
