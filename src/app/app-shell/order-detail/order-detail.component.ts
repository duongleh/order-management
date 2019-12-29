import { Component, OnInit } from "@angular/core";
import { OrderDetailService, IOrderDetail } from "./order-detail.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"]
})
export class OrderDetailComponent implements OnInit {
  isLoading = true;
  isAvailable = false;
  order = {} as IOrderDetail;
  id: number;

  constructor(
    private orderDetailService: OrderDetailService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });

    this.orderDetailService
      .getOrderDetail(this.id, {
        userId: JSON.parse(localStorage.getItem("account")).id
      })
      .subscribe(
        response => {
          this.order = response;
          this.isLoading = false;
          this.isAvailable = true;
        },
        error => {
          this.isLoading = false;
        }
      );
  }
}
