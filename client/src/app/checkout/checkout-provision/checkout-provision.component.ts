import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IServiceProvision } from '../../shared/models/serviceProvision';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-provision',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout-provision.component.html',
  styleUrl: './checkout-provision.component.scss'
})
export class CheckoutProvisionComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;
  serviceProvisions!: IServiceProvision[];
  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }
  ngOnInit() {
    console.log('Checkout Form:', this.checkoutForm); 
    this.checkoutService.getServiceProvisions().subscribe((sp: IServiceProvision[]) => {
      this.serviceProvisions = sp;
    }, error => {
      console.log(error);
    });
  }
  setExtraCharge(serviceProvision: IServiceProvision) {
    this.basketService.setExtraCharge(serviceProvision);
  }
}
