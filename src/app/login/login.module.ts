/** Module import */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button'; // ng-zorro button
import { NzInputModule } from 'ng-zorro-antd/input';  // ng-zorro input
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeComponent } from 'angularx-qrcode';

/** Components */
import { LoginComponent } from './login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';
import { PasswordResetSuccessComponent } from './password-reset-success/password-reset-success.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ActivateAccountComponent } from './activateaccount/activateaccount.component';
import { LoginWith2FaComponent } from './login-with2-fa/login-with2-fa.component';
import { LoginWithRecoveryCodeComponent } from './login-with-recovery-code/login-with-recovery-code.component';
import { ActivatorsettingsComponent } from './activatorsettings/activatorsettings.component';

/** custom nz-icont from svg */
import { CopyIconDefinition } from '../../assets/img/icons/custom-icons';


// Define the custom icons (array of icons)
const CUSTOM_ICONS = [CopyIconDefinition];

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'password-reset-confirm', component: PasswordResetConfirmComponent },  
  { path: 'password-reset-successful', component: PasswordResetSuccessComponent },
  { path: 'activate/:id', component: ActivateAccountComponent },
  { path: 'changepassword/:id', component: ChangepasswordComponent },
  { path: 'twostepverification', component: LoginWith2FaComponent },
  { path: 'twosteprecovery', component: LoginWithRecoveryCodeComponent },
  { path: 'twostepconfiguration', component: ActivatorsettingsComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetComponent,
    PasswordResetConfirmComponent,
    LoginWith2FaComponent,
    LoginWithRecoveryCodeComponent,
    ActivatorsettingsComponent,
    ChangepasswordComponent,
    ActivateAccountComponent,
    PasswordResetSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    RouterModule.forChild(routes),
    NzAlertModule,
    TranslateModule,
    QRCodeComponent,
    NzIconModule,
    NzToolTipModule,
    NzTabsModule,
    NzAlertModule
  ],
  exports: [NzAlertModule],
  providers: [],

 
})
export class LoginModule {

  constructor(private iconService: NzIconService){
    this.iconService.addIcon(...CUSTOM_ICONS);
   // this.iconService.addIcon(CopyIconDefinition);
  }
}
