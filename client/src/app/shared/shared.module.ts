import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgxPaginationModule } from 'ngx-pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselComponent, CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagingHeaderComponent,
    PagerComponent,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    PaginationModule,
    CarouselModule
  ]
})
export class SharedModule { }
