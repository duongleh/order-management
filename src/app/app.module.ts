import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ListModule } from "./app-shell/list/list.module";
import { NavBarComponent } from "./app-shell/nav-bar/nav-bar.component";
import { FooterComponent } from "./app-shell/footer/footer.component";
import { ListOrderModule } from "./app-shell/list-order/list-order.module";
import { OrderDetailModule } from "./app-shell/order-detail/order-detail.module";

@NgModule({
  declarations: [AppComponent, NavBarComponent, FooterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ListOrderModule,
    OrderDetailModule,
    ListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
