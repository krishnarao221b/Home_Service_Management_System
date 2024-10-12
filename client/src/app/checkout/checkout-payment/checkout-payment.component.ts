import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';

import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { IOrder } from '../../shared/models/order';
import { IBasket } from '../../shared/models/basket';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Ensure animations are enabled


declare var Stripe: any;

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CommonModule, SharedModule,

  ],
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm!: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement!: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement!: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement!: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;


  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.stripe = Stripe('pk_test_51Q92mhCOIXqYX8huuaCpLk21dvM6ndV608dS60t6O6Q3UHu4kBtzBa8dhrRTCTHWIokmuXJUS0MpFF2MNa1sRRZJ00MQDW7e7y');
    const elements = this.stripe.elements();
    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);
    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);
    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }
  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }
  onChange(event) {
    console.log(event);

    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }


  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();

    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket);
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error?.message);
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }


  }

  private async confirmPaymentWithStripe(basket: IBasket) {
     return this.stripe.confirmCardPayment(basket.clientSecret, {
       payment_method: {
         card: this.cardNumber,
         billing_details: {
           name: this.checkoutForm.get('paymentForm')?.get('nameOnCard')?.value
         }
       }
     });
    }
  private async createOrder(basket: IBasket) {

    const orderToCreate = this.getOrderToCreate(basket);
   return this.checkoutService.createOrder(orderToCreate).toPromise();

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
