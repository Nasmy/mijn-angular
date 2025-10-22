import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';

export const user_ROUTES: Routes = [
  { path: '', component: UserComponent }, //,canActivate: [SyncGuardHelper], data: { permission: 'contacts',syncGuards: [AuthGuard, PermissionGuard]}  },
];
@NgModule({
  imports: [
    RouterModule.forChild(user_ROUTES),
  ],
  exports: [RouterModule],
})
export class UserRoutingModule {}