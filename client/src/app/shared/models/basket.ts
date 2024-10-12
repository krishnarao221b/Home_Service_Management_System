import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string;
  items: IBasketItem[];
}

export interface IBasketItem {
  id: number;
  serviceName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  category: string;
  type: string;
}

export class Basket implements IBasket {
  id = this.generateBasketId();  // Generate a fallback ID
  items: IBasketItem[] = [];

  private generateBasketId(): string {
    // Combine random string and timestamp for uniqueness
    return 'basketfasdfas_' + Math.random().toString(36).substring(2, 9) + '_' + new Date().getTime();
  }

}

export interface IBasketTotals {
  extraCharge: number;
  subtotal: number;
  total: number;
}

