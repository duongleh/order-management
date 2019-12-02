import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class OrderDetailService {
  private orderDetailUrl = environment.endpoint.orderdetail;

  constructor(private http: HttpClient) {}

  getOrderDetail(id: number): Observable<IOrderDetail> {
    return this.http.get<IOrderDetail>(`${this.orderDetailUrl}/${id}`);
  }
}

export interface IOrderDetail {
  id: number;
  user: IUser;
  products: IProduct[];
  delivery: IDelivery;
  payment: IPayment;
  warranty: string;
  status: string;
  value: IValue;
}

export interface IUser {
  id: number;
  name: string;
  address: number;
  phone: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
}

export interface IDelivery {
  date: string;
  status: string;
}

export interface IPayment {
  type: string;
  status: string;
}

export interface IValue {
  subTotal: number;
  discount: number;
  tax: number;
  shipping: number;
  totalValue: number;
}
