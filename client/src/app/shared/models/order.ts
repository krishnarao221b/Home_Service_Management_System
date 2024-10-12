import { IAddress } from './address';
export interface IOrderToCreate {
  basketId: string;
  serviceProvisionId: number;
  address: IAddress;
}
export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: string;
  serviceAddress: IAddress;
  serviceProvision: string;
  extraCharge: number;
  orderItems: IOrderItem[];
  subtotal: number;
  total: number;
  status: string;
}
export interface IOrderItem {
  serviceId: number;
  serviceName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
