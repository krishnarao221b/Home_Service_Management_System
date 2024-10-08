import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceItemComponent } from './service-item/service-item.component';
import { SharedModule } from '../shared/shared.module';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
  declarations: [],
  imports: [
    ShopComponent,
    CommonModule,
    HttpClientModule,
    ServiceItemComponent,
    SharedModule,
    ServiceDetailsComponent,
    ShopRoutingModule
  ],
  exports: [HttpClientModule]
})
export class ShopModule { }
