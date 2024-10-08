import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarComponent,
    HttpClientModule
  ],
  exports : [NavBarComponent]
})
export class CoreModule { }
