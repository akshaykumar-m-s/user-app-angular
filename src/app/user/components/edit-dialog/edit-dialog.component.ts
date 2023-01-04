import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { User, UserData } from "../../interfaces/user.interface";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"],
})
export class EditDialogComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private _userService: UserService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    console.log("Dialog", this.data);
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = new UserData();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser(data: User) {
    this._userService.updateUser(data).subscribe(async (res) => {
      const response = await res;
      this.dialogRef.close();
    });
  }

  createUser(data: User) {
    data.username = data.first_name.toLowerCase();
    data.password = data.first_name.toLowerCase();
    this._userService.createUser(data).subscribe(async (res) => {
      const response = await res;
      this.dialogRef.close();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
