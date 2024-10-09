import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // Use CommonModule instead of BrowserModule
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IService } from './shared/models/service';
import { IPagination } from './shared/models/pagination';
import { CoreModule } from './core/core.module'
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { routes } from './app.routes';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';

import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  // Replacing BrowserModule with CommonModule
    RouterOutlet,
    CoreModule,
    HttpClientModule,
    HomeModule,
    SectionHeaderComponent,
    NgxSpinnerModule
  
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
/*  providers: [{provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}]*/
})
export class AppComponent implements OnInit {
  title = 'Home Service';
 
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialized basket');
      }, error => {
        console.log(error)
      });
    }

  }
}
