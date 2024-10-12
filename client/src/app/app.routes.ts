/*import { NgModule} from '@angular/core'*/
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ServiceDetailsComponent } from './shop/service-details/service-details.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: { breadcrumb: 'Home' }
},
  { path: 'test-error', component: TestErrorComponent },
  {
    path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule),
    data: { breadcrumb: 'Services' }
  },
  {
    path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule),
    data: { breadcrumb: 'Basket' }
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule),
    data: { breadcrumb: 'Checkout' }
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule),
    data: { breadcrumb: 'Orders' }
  },
  {
    path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
    data: { breadcrumb: {skip:true} }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


