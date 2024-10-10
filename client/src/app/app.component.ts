import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IService } from './shared/models/service';
import { IPagination } from './shared/models/pagination';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CoreModule,
    HttpClientModule,
    HomeModule,
    NgxSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Home Service';

  constructor(private basketService: BasketService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(user => {
        if (user) {
          console.log('loaded user', user);
        }
      }, error => {
        console.log(error);
      });
    }
  }

  loadBasket(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialized basket');
      }, error => {
        console.log(error);
      });
    }
  }
}
