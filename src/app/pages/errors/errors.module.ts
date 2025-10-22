import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsRoutingModule } from './errors.routes';
import { TranslateModule } from '@ngx-translate/core';
import { Error401Component } from './error401/error401.component';



@NgModule({
  declarations: [Error401Component],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    TranslateModule,
  ]
})
export class ErrorsModule { }
