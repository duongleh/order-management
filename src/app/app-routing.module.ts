import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/master-detail", pathMatch: "full" },
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
    path: "list-order",
    loadChildren: () =>
      import("./app-shell/list-order/list-order.module").then(
        mod => mod.ListOrderModule
      )
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
