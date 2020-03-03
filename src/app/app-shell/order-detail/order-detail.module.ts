import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderDetailRoutingModule } from "./order-detail-routing.module";
import { OrderDetailComponent } from "./order-detail.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
@NgModule({
  declarations: [OrderDetailComponent],
  imports: [CommonModule, OrderDetailRoutingModule, MatProgressSpinnerModule]
})
export class OrderDetailModule {}
