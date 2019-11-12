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
    path: "master-detail",
    loadChildren: () =>
      import("./app-shell/master-detail/master-detail.module").then(
        mod => mod.MasterDetailModule
      )
  },
  {
    path: "list",
    loadChildren: () =>
      import("./app-shell/list/list.module").then(mod => mod.ListModule)
  },

  {
    path: "grid",
    loadChildren: () =>
      import("./app-shell/grid/grid.module").then(mod => mod.GridModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
