import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../interfaces/user.interface";
import { Subscription } from "rxjs";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, OnDestroy {
  userInfo!: User;
  private subscriptions = new Subscription();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this._activatedRoute.snapshot.paramMap.get("id"));

    this.subscriptions.add(
      this._userService.getUserById(id).subscribe(async (res) => {
        const response = await res;
        this.userInfo = response.data;
        this.cdRef.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
