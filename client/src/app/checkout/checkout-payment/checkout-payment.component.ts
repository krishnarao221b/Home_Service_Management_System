import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';

import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { IOrder } from '../../shared/models/order';
import { IBasket } from '../../shared/models/basket';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() { }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);

    console.log('Order to be created:', orderToCreate);

    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.toastr.success('Order created successfully');
      this.basketService.deleteLocalBasket(basket.id);
      const navigationExtras: NavigationExtras = { state: order };
      this.router.navigate(['checkout/success'], navigationExtras);
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }

  private getOrderToCreate(basket: IBasket) {
    const serviceProvisionValue = this.checkoutForm.get('serviceProvisionForm')?.get('serviceProvision')?.value;
    console.log('Service Provision Value:', serviceProvisionValue); // Check the value here
    console.log('Service Provision Value (raw):', serviceProvisionValue);

    const serviceProvisionMap: { [key: string]: number } = {
      "Same Day": 2,
      "Within 3 Days": 3,
      "Within 7 Days": 4
    };

    const serviceProvisionId = serviceProvisionMap[serviceProvisionValue] || 0; // Default to 0 if not found
    console.log('Mapped Service Provision ID:', serviceProvisionId);

    return {
      basketId: basket.id,
      serviceProvisionId: +serviceProvisionValue,  // Ensure this is not null
      address: this.checkoutForm.get('addressForm')?.value,
    };
  }

}
