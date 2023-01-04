import { Component, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import { UserService } from "../../services/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../interfaces/user.interface";
import { MatDialog } from "@angular/material/dialog";
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ["ID", "Name", "Email", "Action"];
  dataSource!: MatTableDataSource<User>;
  user: any;
  private subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService: UserService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this._userService
      .getUserList(this.paginator.pageIndex + 1)
      .subscribe(async (res) => {
        const response = await res;
        this.dataSource = new MatTableDataSource(response.data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: "300px",
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe((result) => {}));
  }

  edit(item: User) {
    console.log("el", item);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: "300px",
      data: item,
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        this.user = item;
      })
    );
  }

  delete(id: number) {
    this.subscriptions.add(
      this._userService.deleteUser(id).subscribe(async (res) => {
        const response = await res;
        console.log("Deleted", response);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
