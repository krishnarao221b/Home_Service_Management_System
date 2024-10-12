import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { OrdersComponent } from './orders/orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxSpinnerModule,
    NavBarComponent,
    SectionHeaderComponent,
    OrdersComponent,


    // Only necessary imports should be here
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //providers: [
  //  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  //]
})
export class AppComponent implements OnInit {
  title = 'Home Service';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) { }

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
        this.toastr.error('Failed to load user.');
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
        this.toastr.error('Failed to load basket.');
      });
    }
  }
}
