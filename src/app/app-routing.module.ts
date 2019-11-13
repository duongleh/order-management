import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/list-order", pathMatch: "full" },
  {
    path: "list-order",
    loadChildren: () =>
      import("./app-shell/list-order/list-order.module").then(
        mod => mod.ListOrderModule
      )
  },
  {
    path: "order-detail",
    loadChildren: () =>
      import("./app-shell/order-detail/order-detail.module").then(
        mod => mod.OrderDetailModule
      )
  },
  {
    path: "list",
    loadChildren: () =>
      import("./app-shell/list/list.module").then(mod => mod.ListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
