import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from "@angular/core";
import { UserService } from "../../services/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../classes/user.class";
import { MatDialog } from "@angular/material/dialog";
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = ["ID", "Name", "Email", "Action"];
  dataSource!: MatTableDataSource<User>;
  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService: UserService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.getUserList();
  }

  private getUserList() {
    this._userService
      .getUserList(this.paginator.pageIndex + 1)
      .subscribe((res) => {
        const response = res;
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUserList();
      }
    });
  }

  edit(item: User) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: "300px",
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user = item;
      if (result) {
        this.getUserList();
      }
    });
  }

  delete(id: number) {
    this._userService.deleteUser(id).subscribe((result) => {
      if (result) {
        this.getUserList();
      }
    });
  }
}
