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

  getListOrder(): Observable<IListOrder[]> {
    return this.http.get<IListOrder[]>(this.listOrderUrl);
  }

  searchOrder(input: string): Observable<IListOrder[]> {
    return this.http.post<IListOrder[]>(this.listOrderUrl, input);
  }
}

export interface IListOrder {
  id: number;
  date: string;
  productName: string;
  total: number;
  status: string;
}
