import { Component, OnInit, AfterContentChecked } from "@angular/core";
import { Location } from "@angular/common";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit, AfterContentChecked {
  skipLinkPath: string;
  user: any;
  auth = false;
  public signInUrl = environment.endpoint.signin;
  public logOutUrl = environment.endpoint.logout;
  constructor(private location: Location) {}

  ngOnInit() {
    this.skipLinkPath = `${this.location.path()}#mainContent`;
  }

  ngAfterContentChecked(): void {
    this.user = JSON.parse(localStorage.getItem("account"));
    if (this.user && this.user.name) {
      this.auth = true;
    }
  }

  onLogOut() {
    localStorage.removeItem("account");
  }
}
