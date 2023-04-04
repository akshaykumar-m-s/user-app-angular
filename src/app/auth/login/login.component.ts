import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private _authService: AuthService, private _router: Router) {
    if (!!localStorage.getItem("token")) {
      this._router.navigate(["/user/list"]);
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });

    this.loginForm.patchValue({
      username: "eve.holt@reqres.in",
      password: "cityslicka",
    });
  }

  loginTrigger() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value);
    }
  }
}
