import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { catchError, map } from 'rxjs/operators';
import { IService } from '../shared/models/service';
import { IServiceProvision } from '../shared/models/serviceProvision';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = 'https://localhost:7015/api/';
  private basketSource = new BehaviorSubject<IBasket>({ id: '', items: [] }); // Default initialization
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>({ extraCharge: 0, subtotal: 0, total: 0 });
  basketTotal$ = this.basketTotalSource.asObservable();
  extraCharge = 0;
  
  constructor(private http: HttpClient) { }

  createPaymentIntent() {
    return this.http.post(this.baseUrl + 'payments/' + this.getCurrentBasketValue().id, {}).pipe(
      map((basket: IBasket | any) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      })
    );
  }



  setExtraCharge(serviceProvision: IServiceProvision) {
    this.extraCharge = serviceProvision.extraCharge;
    const basket = this.getCurrentBasketValue();
    basket.serviceProvisionId = serviceProvision.id;
    basket.extraCharge = serviceProvision.extraCharge;
    this.calculateTotals();
    this.setBasket(basket);
  }

  getBasket(id: string) {

    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id) // Specify expected type here
        .pipe(
        map((basket) => {
          this.basketSource.next(basket);
          this.extraCharge = basket.extraCharge ?? 0;
          this.calculateTotals();
        }),
        catchError((error) => {
          console.error('Error fetching basket:', error);
          // You can choose to return an empty basket or handle this scenario as needed
          this.basketSource.next({ id: '', items: [] });
          return of(null); // Return null or an empty basket object
        })
      );
  }

  setBasket(basket: IBasket) {
    //console.log('Posting basket:', basket);
    //if (!basket.id) {
    //  console.error('Basket ID is empty, cannot post basket.');
    //  return;
    //}
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
      });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IService, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    let basket = this.getCurrentBasketValue();

    if (!basket || !basket.id) {
      basket = this.createBasket();  // Ensure the basket is created properly
    }

/*    console.log('Basket before adding item:', basket);  // Debugging log*/

    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);  // Update the basket
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

deleteLocalBasket(id: string) {
  this.basketSource.next({ id: '', items: [] });
  this.basketTotalSource.next({ extraCharge: 0, subtotal: 0, total: 0 });
    localStorage.removeItem('basket_id');
  }


  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next({ id: '', items: [] });  // Reset to empty basket
      this.basketTotalSource.next({ extraCharge: 0, subtotal: 0, total: 0 });  // Reset to empty totals
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }




  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const extraCharge = this.extraCharge;
    const subtotal = basket.items.reduce((a: number, b: IBasketItem) => (b.price * b.quantity) + a, 0);
    const total = subtotal + extraCharge;
    this.basketTotalSource.next({ extraCharge, total, subtotal });

  }

   private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
/*     console.log(items);*/

     const index = items.findIndex(i => i.id === itemToAdd.id);
     if (index === -1) {
       itemToAdd.quantity = quantity;
       items.push(itemToAdd);
     } else {
       items[index].quantity += quantity;
     }
     return items;

    }


  private createBasket(): IBasket {
    const basket = new Basket();
    //console.log('New Basket Created:', basket);  // Log to ensure basket is created with ID
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }



  private  mapProductItemToBasketItem(item: IService, quantity: number): IBasketItem {
    return {
      id: item.id,
      serviceName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      category: item.serviceCategory,
      type: item.serviceType
    };
    }


}
