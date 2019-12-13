import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { AuthComponent } from "../auth/auth.component";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  skipLinkPath: string;
  constructor(private location: Location) {}

  ngOnInit() {
    this.skipLinkPath = `${this.location.path()}#mainContent`;
  }
}
