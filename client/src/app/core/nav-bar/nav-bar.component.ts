import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';
import { TestErrorComponent } from '../test-error/test-error.component';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/basket';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [RouterOutlet,RouterModule, TestErrorComponent, CommonModule] // If you're using routing, include this
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<IBasket>;

  constructor(private basketService: BasketService) { }
  ngOnInit() {
    this.basket$ = this.basketService.basket$;
  }
}
