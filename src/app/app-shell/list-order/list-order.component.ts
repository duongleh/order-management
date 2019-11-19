import { Component, OnInit } from "@angular/core";
import { ListOrderService, IListOrder } from "./list-order.service";

@Component({
  selector: "app-list-order",
  templateUrl: "./list-order.component.html",
  styleUrls: ["./list-order.component.css"]
})
export class ListOrderComponent implements OnInit {
  public listOrders: IListOrder[] = [];
  public WarningMessageText = "Request to get list items failed:";
  public WarningMessageOpen = false;
  public beginTime;
  public endTime;
  public beginValue;
  public endValue;
  public status;

  public params = {
    sort: "DSC",
    count: 100,
    beginTime: this.beginTime || "",
    endTime: this.endTime || "",
    beginValue: this.beginValue || "",
    endValue: this.endValue || "",
    status: this.status || "",
    product: ""
  };
  constructor(private listOrderService: ListOrderService) {}

  ngOnInit() {
    this.renderList();
  }

  renderList() {
    this.listOrderService.getListOrder(this.params).subscribe(
      response => {
        this.listOrders = response;
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `Request to get list items failed: ${error}`;
      }
    );
  }

  handleSearch(inputText: string) {
    this.params.product = inputText;
    this.renderList();
  }

  onOptionsSelected(value: string) {
    if (value) {
      this.params.status = value;
      this.renderList();
    }
  }
}
