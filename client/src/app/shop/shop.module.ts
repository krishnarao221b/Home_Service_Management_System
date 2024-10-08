import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceItemComponent } from './service-item/service-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    ShopComponent,
    CommonModule,
    HttpClientModule,
    ServiceItemComponent,
    SharedModule
  ],
  exports: [ShopComponent, HttpClientModule]
})
export class ShopModule { }
