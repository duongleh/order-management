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
  name: string;
  address: string;
  phone: string;
  shippingType: string;
  shippingStatus: string;
  paymentType: string;
  paymentStatus: string;
  product: IProduct[];
  preTotal: number;
  totalDiscount: number;
  shippingFee: number;
  total: number;
}

export interface IProduct {
  productName: string;
  price: number;
  amount: number;
  discount: number;
  subTotal: number;
}
