import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeComponent,
    SharedModule,
    CarouselModule
  ],
  exports: [HomeComponent, SharedModule]
})
export class HomeModule { }
