import { Component, OnInit } from "@angular/core";
import { OrderDetailService, IOrderDetail } from "./order-detail.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"]
})
export class OrderDetailComponent implements OnInit {
  order = {} as IOrderDetail;
  WarningMessageText = "Request to get list items failed:";
  WarningMessageOpen = false;
  id: number;

  constructor(
    private orderDetailService: OrderDetailService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });

    this.orderDetailService.getOrderDetail(this.id).subscribe(
      response => {
        this.order = response;
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `Request to get list items failed: ${error}`;
      }
    );
  }
}
