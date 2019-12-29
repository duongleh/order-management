import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators"; // This is where I import map operator
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("account") !== null) {
      return true;
    } else {
      return this.authService.getAuthStatus().pipe(
        map(
          (res: any) => {
            if (res.success) {
              localStorage.setItem("account", JSON.stringify(res.data));
            } else {
              this.router.navigateByUrl("home");
            }
            return res.success;
          },
          (error: any) => {
            console.log(error);
          }
        )
      );
    }
  }
}
