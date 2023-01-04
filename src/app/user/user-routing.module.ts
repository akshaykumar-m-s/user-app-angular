import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/user/list' },
  { path: 'list', component: UsersListComponent },
  { path: 'list/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
