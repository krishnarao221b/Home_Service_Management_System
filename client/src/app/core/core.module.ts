import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';


import { SectionHeaderComponent } from './section-header/section-header.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarComponent,
    HttpClientModule,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    RouterModule,
    SectionHeaderComponent
  ],
  exports : [NavBarComponent, SectionHeaderComponent]
})
export class CoreModule { }
