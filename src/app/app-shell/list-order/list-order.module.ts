import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";

import { ListOrderRoutingModule } from "./list-order-routing.module";
import { ListOrderComponent } from "./list-order.component";
import { ListSearchComponent } from "./list-search/list-search.component";
import { WarningMessageModule } from "../../shared/warning-message/warning-message.module";
import { DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";

import {
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
} from "@angular/material";

@NgModule({
  declarations: [ListOrderComponent, ListSearchComponent],
  imports: [
    CommonModule,
    ListOrderRoutingModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    WarningMessageModule,
    DateRangePickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ListOrderModule {}
