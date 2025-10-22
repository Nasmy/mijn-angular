import { RouterModule, Routes } from '@angular/router';
import { GeographicalSearchesTableComponent } from './geographical-searches-table/geographical-searches-table.component';
import { GeographicalSearchesMainComponent } from './geographical-searches-main/geographical-searches-main.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@helpers/auth.guard';
import { PermissionGuard } from '@guards/permission.guard';
import { SyncGuardHelper } from '@helpers/syncguard.helper';

export const geographical_ROUTES: Routes = [
  { path: '', component: GeographicalSearchesMainComponent, canActivate: [SyncGuardHelper], data: {permission: 'requests',syncGuards: [AuthGuard, PermissionGuard]} } //,canActivate: [SyncGuardHelper], data: { permission: 'requests',syncGuards: [AuthGuard, PermissionGuard]}  },
];
@NgModule({
  imports: [
    RouterModule.forChild(geographical_ROUTES),
  ],
  exports: [RouterModule],
})
export class GeographicalSearchesRoutingModule {}
