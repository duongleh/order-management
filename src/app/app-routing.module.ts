import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./app-shell/auth/auth.guard";
import { NegateAuthGuard } from "./app-shell/auth/negate-auth.guard";
import { HomeComponent } from "./app-shell/home/home.component";
const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [NegateAuthGuard] },
  {
    path: "orders/:id",
    loadChildren: () =>
      import("./app-shell/order-detail/order-detail.module").then(
        mod => mod.OrderDetailModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./app-shell/list-order/list-order.module").then(
        mod => mod.ListOrderModule
      ),
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "/orders", pathMatch: "full" },
  { path: "**", redirectTo: "/orders", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
