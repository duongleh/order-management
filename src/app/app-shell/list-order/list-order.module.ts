import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";

import { ListOrderRoutingModule } from "./list-order-routing.module";
import { ListOrderComponent } from "./list-order.component";
import { ListSearchComponent } from "./list-search/list-search.component";
import { WarningMessageModule } from "../../shared/warning-message/warning-message.module";
import { DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";

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
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ListOrderModule {}
