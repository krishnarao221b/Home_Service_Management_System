import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IOrder, IOrderToCreate } from '../shared/models/order';
import { IServiceProvision } from '../shared/models/serviceProvision';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = 'https://localhost:7015/api/';

  constructor(private http: HttpClient) { }
  createOrder(order: IOrderToCreate): Observable<IOrder> {
    return this.http.post<IOrder>(this.baseUrl + 'orders', order);
  }
  getServiceProvisions() {
    return this.http.get<IServiceProvision[]>(this.baseUrl + 'orders/serviceProvisions').pipe(
      map((dm: IServiceProvision[]) => {
        return dm.sort((a, b) => b.extraCharge - a.extraCharge);
      })
    );
  }
}
