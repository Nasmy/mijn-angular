import { RouterModule, Routes } from '@angular/router';
//import { ContactsTableComponent } from './contacts-individual-table/contacts-individual-table.component';
import { ContactsMainComponent } from './contacts-main/contacts-main.component';
import { NgModule } from '@angular/core';
import { ScreeningsSingleComponent } from './screenings-single/screenings-single.component';
import { SyncGuardHelper } from '@helpers/syncguard.helper';
import { AuthGuard } from '@helpers/auth.guard';
import { PermissionGuard } from '@guards/permission.guard';

export const contacts_ROUTES: Routes = [
  { path: '', component: ContactsMainComponent, canActivate: [SyncGuardHelper], data: {permission: 'contacts',syncGuards: [AuthGuard, PermissionGuard]}  }, 
  { path: ':id/submission/:fid', component: ScreeningsSingleComponent, canActivate: [SyncGuardHelper], data: {permission: 'contacts',syncGuards: [AuthGuard, PermissionGuard]}  },
  { path: ':id/submission/:fid/:sid', component: ScreeningsSingleComponent, canActivate: [SyncGuardHelper], data: {permission: 'contacts',syncGuards: [AuthGuard, PermissionGuard]}  },
  { path: ':id/submission/:fid/:sid/filemanagment/:fmid', component: ScreeningsSingleComponent, canActivate: [SyncGuardHelper], data: {permission: 'contacts',syncGuards: [AuthGuard, PermissionGuard]}  }
];
@NgModule({
  imports: [
    RouterModule.forChild(contacts_ROUTES),
  ],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
