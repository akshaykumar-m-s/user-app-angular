import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  constructor(private _router: Router) {}
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if (!!localStorage.getItem("token")) {
      return true;
    } else {
      this._router.navigate(["auth/login"]);
      return false;
    }
  }
}
