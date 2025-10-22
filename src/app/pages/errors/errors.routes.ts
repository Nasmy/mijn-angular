import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Error401Component } from './error401/error401.component';

export const error_ROUTES: Routes = [
  { path: '401',
    component: Error401Component} 
];
@NgModule({
  imports: [
    RouterModule.forChild(error_ROUTES),
  ],
  exports: [RouterModule],
})
export class ErrorsRoutingModule {}
