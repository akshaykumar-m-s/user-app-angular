import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WordCasePipe } from "./pipes/word-case.pipe";
import { HighlightOnHoverDirective } from "./directives/highlight-on-hover.directive";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { EncapComponent } from "./component/encap/encap.component";

const MaterialModules = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
];
@NgModule({
  declarations: [WordCasePipe, HighlightOnHoverDirective, EncapComponent],
  imports: [CommonModule, MaterialModules],
  exports: [
    EncapComponent,
    WordCasePipe,
    HighlightOnHoverDirective,
    MaterialModules,
  ],
})
export class SharedModule {}
