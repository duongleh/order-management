import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderDetailRoutingModule } from "./order-detail-routing.module";
import { OrderDetailComponent } from "./order-detail.component";
import { WarningMessageModule } from "../../shared/warning-message/warning-message.module";

@NgModule({
  declarations: [OrderDetailComponent],
  imports: [CommonModule, OrderDetailRoutingModule, WarningMessageModule]
})
export class OrderDetailModule {}
