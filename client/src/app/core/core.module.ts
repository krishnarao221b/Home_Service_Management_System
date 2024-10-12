import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component'; // Keep this as is
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    
    
  ],
  imports: [
    NavBarComponent,
    SectionHeaderComponent,
    CommonModule,
    HttpClientModule,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    RouterModule,
    SharedModule,
    BsDropdownModule
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent
  ]
})
export class CoreModule { }
