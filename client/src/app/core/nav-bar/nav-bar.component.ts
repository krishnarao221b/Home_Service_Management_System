import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from '../test-error/test-error.component';
import { BasketService } from '../../basket/basket.service';
import { Observable, of } from 'rxjs';
import { IBasket } from '../../shared/models/basket';
import { IUser } from '../../shared/models/user';
import { AccountService } from '../../account/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [RouterModule, TestErrorComponent, BsDropdownModule, CommonModule]
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<IBasket>;
  currentUser$: Observable<IUser | null> = of(null);

  constructor(private basketService: BasketService, private accountService: AccountService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;

    this.currentUser$.subscribe(user => {
      console.log("Current User: ", user);
    });
  }

  logout() {
    this.accountService.logout();
  }
}
