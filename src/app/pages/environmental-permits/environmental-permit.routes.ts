import { RouterModule, Routes } from '@angular/router';
import { EnvironmentalPermitMainComponent } from './environmental-permit-main/environmental-permit-main.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@helpers/auth.guard';
import { PermissionGuard } from '@guards/permission.guard';
import { SyncGuardHelper } from '@helpers/syncguard.helper';

export const geographical_ROUTES: Routes = [
  { path: '', component: EnvironmentalPermitMainComponent, canActivate: [SyncGuardHelper], data: {permission: 'requests',syncGuards: [AuthGuard, PermissionGuard]} } 
];
@NgModule({
  imports: [
    RouterModule.forChild(geographical_ROUTES),
  ],
  exports: [RouterModule],
})
export class EnvironmentalPermitRoutingModule {}
