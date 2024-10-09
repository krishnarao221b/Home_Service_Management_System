import { Component, OnInit } from '@angular/core';
import { IService } from '../../shared/models/service';
import { ShopService } from '../shop.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent implements OnInit {
  service!: IService;
  quantity = 1;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService, private basketService: BasketService
  ) {
    this.bcService.set('@serviceDetails','');
  }

  ngOnInit() {
    this.loadService();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.service, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }



  loadService() {
    // Subscribe to paramMap to get the route parameter 'id'
    this.activateRoute.paramMap.subscribe(params => {
      const id = params.get('id'); // Get 'id' from route
      if (id) {
        // Call getService with the parsed id
        this.shopService.getService(+id).subscribe(service => {
          this.service = service;
          this.bcService.set('@serviceDetails', service.name);
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
