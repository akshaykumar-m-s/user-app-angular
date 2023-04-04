import { Component, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./core/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent {
  title = "users-crud";
  isLoggedIn!: Observable<boolean>;

  constructor(public authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn;
  }
}
