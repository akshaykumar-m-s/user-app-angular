import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { EditDialogComponent } from "./components/edit-dialog/edit-dialog.component";
import { FormsModule } from "@angular/forms";
import { DetailsComponent } from "./components/details/details.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [UsersListComponent, EditDialogComponent, DetailsComponent],
  imports: [CommonModule, FormsModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
