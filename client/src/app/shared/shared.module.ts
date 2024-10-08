import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgxPaginationModule } from 'ngx-pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagingHeaderComponent,
    PagerComponent,
    PaginationModule.forRoot()
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    PaginationModule
  ]
})
export class SharedModule { }
