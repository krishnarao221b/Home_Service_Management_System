import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';
import { TestErrorComponent } from '../test-error/test-error.component';
import { BasketService } from '../../basket/basket.service';
import { Observable, of } from 'rxjs';
import { IBasket } from '../../shared/models/basket';
import { CommonModule } from '@angular/common';
import { IUser } from '../../shared/models/user';
import { AccountService } from '../../account/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [RouterOutlet, RouterModule, TestErrorComponent, CommonModule, BsDropdownModule] // If you're using routing, include this
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<IBasket>;
  currentUser$: Observable<IUser | null> = of(null);

  constructor(private basketService: BasketService, private accountService: AccountService) { }
  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;

    this.currentUser$.subscribe(user => {
      console.log("Current User: ", user);  // This will help us track the user data
    });

    this.logout();
  }
  

  logout() {
    this.accountService.logout();
  }

}
