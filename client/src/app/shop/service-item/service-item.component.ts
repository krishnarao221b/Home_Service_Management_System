import { Component, Input, OnInit } from '@angular/core';
import { IService } from '../../shared/models/service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-service-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-item.component.html',
  styleUrl: './service-item.component.scss'
})
export class ServiceItemComponent implements OnInit {

  @Input()service!: IService;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    //console.log('Service:', this.service); // Check if service input is correctly passed
  }

  addItemToBasket() {
    //console.log('Adding service to basket:', this.service); // Ensure the service exists
    this.basketService.addItemToBasket(this.service);
  }


}
