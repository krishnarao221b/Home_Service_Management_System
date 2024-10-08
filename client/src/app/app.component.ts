import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // Use CommonModule instead of BrowserModule
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IService } from './shared/models/service';
import { IPagination } from './shared/models/pagination';
import { CoreModule } from './core/core.module'
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  // Replacing BrowserModule with CommonModule
    RouterOutlet,
    CoreModule,
    HttpClientModule,
    HomeModule,
  
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Home Service';
 
  constructor() { }

  ngOnInit(): void {


  }
}
