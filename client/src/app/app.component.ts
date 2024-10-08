import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // Use CommonModule instead of BrowserModule
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IService } from './shared/models/service';
import { IPagination } from './shared/models/pagination';
import { CoreModule } from './core/core.module'
import { ShopModule } from './shop/shop.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  // Replacing BrowserModule with CommonModule
    RouterOutlet,
    CoreModule,
    HttpClientModule,
    ShopModule
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
