import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/orders", pathMatch: "full" },
  {
    path: "orders/:id",
    loadChildren: () =>
      import("./app-shell/order-detail/order-detail.module").then(
        mod => mod.OrderDetailModule
      )
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./app-shell/list-order/list-order.module").then(
        mod => mod.ListOrderModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
