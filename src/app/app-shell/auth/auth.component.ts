import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  public status: boolean;
  public user = {};
  public signInUrl = environment.endpoint.signin;
  public logOutUrl = environment.endpoint.logout;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuthStatus().subscribe(
      (response: any) => {
        this.status = response.success;
        if (this.status) {
          this.user = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
