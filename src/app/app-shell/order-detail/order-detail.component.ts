import { Component, OnInit } from "@angular/core";
import { OrderDetailService, IOrderDetail } from "./order-detail.service";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"]
})
export class OrderDetailComponent implements OnInit {
  orderDetail = {} as IOrderDetail;
  WarningMessageText = "Request to get list items failed:";
  WarningMessageOpen = false;

  id = 3124982;
  constructor(private orderDetailService: OrderDetailService) {}

  ngOnInit() {
    this.orderDetailService.getOrderDetail(this.id).subscribe(
      response => {
        this.orderDetail = response;
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `Request to get list items failed: ${error}`;
      }
    );
    this.orderDetail = {
      name: "NGUYỄN VĂN ABC",
      address: "Ba Đình, Hà Nội",
      phone: "0123456789",
      shippingType: "Giao hàng nhanh",
      shippingStatus: "Giao vào Thứ sáu, 01/03",
      paymentType: "Master Card",
      paymentStatus: "Giao dịch thành công",
      product: [
        {
          productName: "Tay Cầm Xbox One S - White Sport",
          price: 1300000,
          amount: 1,
          discount: 50000,
          subTotal: 1250000
        },
        {
          productName: "Tay Cầm Xbox One S - White Sport",
          price: 1300000,
          amount: 1,
          discount: 50000,
          subTotal: 1250000
        },
        {
          productName: "Tay Cầm Xbox One S - White Sport",
          price: 1300000,
          amount: 1,
          discount: 50000,
          subTotal: 1250000
        }
      ],
      preTotal: 1300000,
      totalDiscount: 50000,
      shippingFee: 0,
      total: 1250000
    };
  }
}
