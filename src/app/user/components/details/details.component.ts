import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../classes/user.class";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  userInfo!: User;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this._activatedRoute.snapshot.paramMap.get("id"));

    this._userService.getUserById(id).subscribe((res) => {
      const response = res;
      this.userInfo = response.data;
      this.cdRef.detectChanges();
    });
  }
}
