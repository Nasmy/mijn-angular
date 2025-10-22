import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services/auth.service';
import { AlertService } from '@services/alert.service';
//import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Alert } from '@models/alert.model';

@Component({
  selector: 'app-login-with2-fa',
  templateUrl: './login-with2-fa.component.html',
  styleUrls: ['./login-with2-fa.component.scss']
})
export class LoginWith2FaComponent implements OnInit{
  public submitted:any;
  form: FormGroup;
  returnUrl:string;
  email:string;
  provider:string;
  loading
  public allertMessage:Alert;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AuthService,
    private alertService: AlertService,
    //private toastService: ToastrService,
    private translateService: TranslateService,
    
    
) { }
  ngOnInit(): void {
    this.allertMessage=<Alert>{};
    this.form = this.formBuilder.group({
      //twoFactorCode: ['', Validators.required],      
      code1: ['', Validators.required],      
      code2: ['', Validators.required],      
      code3: ['', Validators.required],      
      code4: ['', Validators.required],      
      code5: ['', Validators.required],      
      code6: ['', Validators.required],      
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  this.email = this.route.snapshot.queryParams['email'] || '';
  this.provider = this.route.snapshot.queryParams['provider'] || '';
  this.alertService.onAlert().subscribe(allertData=>{
      this.allertMessage=allertData;
  })


  //this.alertService.error(this.translateService.instant('Invalid code'),this.translateService.instant("Login"));  

  }


  get f() { return this.form.controls; }
  
  onSubmit(){
    this.alertService.clear();
    this.loading=true;

    const TwofA_1:string = this.f["code1"].value;
    const TwofA_2:string = this.f["code2"].value;
    const TwofA_3:string = this.f["code3"].value;
    const TwofA_4:string = this.f["code4"].value;
    const TwofA_5:string = this.f["code5"].value;
    const TwofA_6:string = this.f["code6"].value;

    const TwoFA = TwofA_1 + TwofA_2 + TwofA_3 + TwofA_4 + TwofA_5 + TwofA_6;

    //this.accountService.twostepVerification(this.email, this.provider,this.f["twoFactorCode"].value)
    this.accountService.twostepVerification(this.email, this.provider,TwoFA)
    .pipe(first())
    .subscribe({
        next: (res: any ) => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
            this.loading = false;
            if (res?.is2StepVerificationRequired!=undefined &&  res.is2StepVerificationRequired){
                this.router.navigate(['/login/twostepverification'],
                { queryParams: { returnUrl: returnUrl, provider: res.provider, email: this.f["email"].value }})
              }else if(res!=undefined && res.access_token!=undefined){                             
                  this.router.navigateByUrl(returnUrl);
              }           

        },
        error: error => {      
          this.alertService.error(this.translateService.instant('Invalid code'),this.translateService.instant("Login"));     
            this.loading = false;
         }
    });

  }

  loginWithSecurityCodes(){
    this.router.navigate(['/account/twosteprecovery'],
      { queryParams: { returnUrl: this.returnUrl, provider: this.provider, email: this.email }})
  }

  onKeyUp(event,id){
    event.preventDefault();
    let key = event.which || event.keyCode || event.charCode;
  
    if(key != 8){
      let el=document.getElementById(id);
      //el.dispatchEvent(event2);
      el.focus();
    }
    //const event2 = new KeyboardEvent("keypress", {
    //  "key": "Tab"
    //});
  
   }




}
