import { RouterModule, Routes } from '@angular/router';
import { FilemanagmentMainComponent } from './filemanagment-main/filemanagment-main.component';
import { NgModule } from '@angular/core';
import { FilemanagmentAddEditComponent } from './filemanagment-add-edit/filemanagment-add-edit.component';
import { FileEditorModeldocumentComponent } from './file-editor-modeldocument/file-editor-modeldocument.component';
import { SyncGuardHelper } from '@helpers/syncguard.helper';
import { AuthGuard } from '@helpers/auth.guard';
import { PermissionGuard } from '@guards/permission.guard';


export const filemanagement_ROUTES: Routes = [
  { path: '', component: FilemanagmentMainComponent, canActivate: [SyncGuardHelper], data: {permission: 'filemanagment',syncGuards: [AuthGuard, PermissionGuard]}}, //,canActivate: [SyncGuardHelper], data: { permission: 'contacts',syncGuards: [AuthGuard, PermissionGuard]}  },
  { path: ':id', component: FilemanagmentAddEditComponent, canActivate: [SyncGuardHelper], data: {permission: 'filemanagment',syncGuards: [AuthGuard, PermissionGuard]} }, 
  { path: 'add', component: FilemanagmentAddEditComponent , canActivate: [SyncGuardHelper], data: {permission: 'filemanagment',syncGuards: [AuthGuard, PermissionGuard]}}, 
  { path: 'document/editor/filemanagment/:filemanagment_id/category/:category_id/new', component: FileEditorModeldocumentComponent , canActivate: [SyncGuardHelper], data: {permission: 'filemanagment',syncGuards: [AuthGuard, PermissionGuard]}}, 
  { path: 'document/editor/filemanagment/:filemanagment_id/template/:id', component: FileEditorModeldocumentComponent , canActivate: [SyncGuardHelper], data: {permission: 'filemanagment',syncGuards: [AuthGuard, PermissionGuard]}}, 
  { path: 'document/editor/filemanagment/:filemanagment_id/modaldocument/:modal_id/edit', component: FileEditorModeldocumentComponent, canActivate: [SyncGuardHelper], data: {permission: 'filemanagment',syncGuards: [AuthGuard, PermissionGuard]} }, 
  { path: 'document/editor/filemanagment/:filemanagment_id/modaldocument/:modal_id/preview', component: FileEditorModeldocumentComponent, canActivate: [SyncGuardHelper], data: {permission: 'filemanagment',syncGuards: [AuthGuard, PermissionGuard]} }, 
];
@NgModule({
  imports: [
    RouterModule.forChild(filemanagement_ROUTES),
  ],
  exports: [RouterModule],
})
export class FileManagmentRoutingModule {}
