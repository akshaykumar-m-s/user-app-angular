import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  errorFlag = false;
  loginForm!: FormGroup;
  private subscriptions = new Subscription();

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  loginTrigger() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value);
    }

    console.log(this.loginForm.value);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
