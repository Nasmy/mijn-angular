import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';
import { AlertService } from '@services/alert.service';
import { Alert } from '@models/alert.model';

@Component({
  selector: 'app-login-with-recovery-code',
  templateUrl: './login-with-recovery-code.component.html',
  styleUrls: ['./login-with-recovery-code.component.scss']
})
export class LoginWithRecoveryCodeComponent {
  public submitted:any;
  public form: FormGroup;
  public allertMessage:Alert=<Alert>{};
  returnUrl:string;
  email:string;
  provider:string;
  loading


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AuthService,
    private alertService: AlertService,
    private translateService: TranslateService,
    
    
) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      recoveryCode: ['', Validators.required],      
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  this.email = this.route.snapshot.queryParams['email'] || '';
  this.provider = this.route.snapshot.queryParams['provider'] || '';
  this.alertService.onAlert().subscribe(allertData=>{
        this.allertMessage=allertData;
    })
  }


  get f() { return this.form.controls; }
  
  onSubmit(){
    this.loading=true;
    this.accountService.loginWithRecoveryCode(this.email, this.provider,this.f["recoveryCode"].value)
    .pipe(first())
    .subscribe({
        next: (res: any ) => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
            this.loading = false;
            if (res?.is2StepVerificationRequired!=undefined &&  res.is2StepVerificationRequired){
                this.router.navigate(['/account/twostepverification'],
                { queryParams: { returnUrl: returnUrl, provider: res.provider, email: this.f["email"].value }})
              }else if(res!=undefined && res.access_token!=undefined){                             
                  this.router.navigateByUrl(returnUrl);
              }
            

        },
        error: error => {      
          this.alertService.error(this.translateService.instant('Invalid security code'),this.translateService.instant("Login"));     
            this.loading = false;
        }
    });

  }

  loginWithSecurityCodes(){
    this.router.navigate(['/account/twosteprecovery'],
      { queryParams: { returnUrl: this.returnUrl, provider: this.provider, email: this.email }})
  }
}
