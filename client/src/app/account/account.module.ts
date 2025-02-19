import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent,
    AccountRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [ReactiveFormsModule]
})
export class AccountModule { }
