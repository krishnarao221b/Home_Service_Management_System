import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { StepperComponent } from '../shared/components/stepper/stepper.component';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutProvisionComponent } from './checkout-provision/checkout-provision.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [StepperComponent, OrderTotalsComponent, CdkStepperModule, CheckoutComponent, CheckoutAddressComponent, CheckoutProvisionComponent, CheckoutReviewComponent, CheckoutPaymentComponent, CheckoutSuccessComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.createCheckoutForm();
    this.getAddressFormValues();
    console.log(this.checkoutForm);  // Check if the form is created correctly
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, Validators.required],
      }),
      serviceProvisionForm: this.fb.group({
        serviceProvision: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });

    console.log('Checkout Form created:', this.checkoutForm); 
  }
  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe(address => {
      if (address) {
        this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    }, error => {
      console.log(error);
    });
  }


}
