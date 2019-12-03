import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ListOrderService {
  private listOrderUrl = environment.endpoint.listorder;

  constructor(private http: HttpClient) {}

  getListOrder(data): Observable<IListOrder[]> {
    return this.http.get<IListOrder[]>(this.listOrderUrl, { params: data });
  }
}

export interface IListOrder {
  id: number;
  deliveryDate: string;
  products: IProduct[];
  status: string;
  value: number;
  productsName: string;
}

export interface IProduct {
  id: number;
  name: string;
}
