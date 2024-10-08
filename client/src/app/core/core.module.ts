import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarComponent,
    HttpClientModule,
    RouterModule
  ],
  exports : [NavBarComponent]
})
export class CoreModule { }
