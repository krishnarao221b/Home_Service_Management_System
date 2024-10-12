import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IServiceProvision } from '../../shared/models/serviceProvision';
import { CheckoutService } from '../checkout.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;
  constructor(private accountService: AccountService, private toastr: ToastrService) { }
  ngOnInit() {
  }
  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm')?.value)
      .subscribe(() => {
        this.toastr.success('Address saved');
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
  }

}
