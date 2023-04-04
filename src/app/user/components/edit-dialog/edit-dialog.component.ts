import { Component, Inject, OnInit } from "@angular/core";
import { User } from "../../classes/user.class";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"],
})
export class EditDialogComponent implements OnInit {
  constructor(
    private _userService: UserService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      this.data = new User();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser(data: User) {
    this._userService.updateUser(data).subscribe((res) => {
      this.dialogRef.close();
    });
  }

  createUser(data: User) {
    data.username = data.first_name.toLowerCase();
    data.password = data.first_name.toLowerCase();
    this._userService.createUser(data).subscribe((res) => {
      this.dialogRef.close();
    });
  }
}
