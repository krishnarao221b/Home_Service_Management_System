/*import { NgModule} from '@angular/core'*/
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ServiceDetailsComponent } from './shop/service-details/service-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', loadChildren:() => import('./shop/shop.module').then(mod => mod.ShopModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule]
//})

//export class AppRoutes { }
